import { cy, it as itCypress } from 'local-cypress';

import type {
  Assertions,
  AssertionsNot,
  Driver,
  Interactions,
  Step,
} from '../../driver';

// eslint-disable-next-line no-undef
type ElementResolver = () => Cypress.Chainable;

function makeAssertions(elementResolver: ElementResolver): Assertions {
  return {
    shouldBeVisible: () => () => {
      elementResolver().should('be.visible');
    },
    shouldHaveAttribute: (attribute, value) => () => {
      elementResolver().should('have.attr', attribute).and('match', value);
    },
  };
}

function makeAssertionsNot(elementResolver: ElementResolver): AssertionsNot {
  return {
    shouldNotBeVisible: () => () => {
      elementResolver().should('not.be.visible');
    },
    shouldNotExist: () => () => {
      elementResolver().should('not.exist');
    },
  };
}

function makeInteractions(elementResolver: ElementResolver): Interactions {
  return {
    check: () => () => {
      elementResolver().check();
    },
    click: () => () => {
      elementResolver().click();
    },
    type: (text) => () => {
      elementResolver().clear();
      elementResolver().type(`${text}`);
    },
  };
}

function makeActions(
  elementResolver: ElementResolver,
): Assertions & Interactions {
  return {
    ...makeAssertions(elementResolver),
    ...makeInteractions(elementResolver),
  };
}

const makeDriver = (): Driver => ({
  goTo(path) {
    return () => {
      cy.visit(path);
    };
  },
  findByLabelText(text) {
    return makeActions(() => cy.findByLabelText(text));
  },
  findByRole(role, { name }) {
    return makeActions(() => cy.findByRole(role, { name }));
  },
  findByText(text, { withinTestId = null } = {}) {
    return makeAssertions(() => {
      const cyLocal = withinTestId ? cy.findByTestId(withinTestId) : cy;
      return cyLocal.findByText(text);
    });
  },
  findAllByText(text, { withinTestId = null } = {}) {
    return makeAssertions(() => {
      const cyLocal = withinTestId ? cy.findByTestId(withinTestId) : cy;
      return cyLocal.findAllByText(text);
    });
  },
  mockEndpoint(endpoint, { body, method = 'get', status = 200 }) {
    cy.intercept(
      `${endpoint}*`,
      {
        method: method.toUpperCase(),
      },
      (req) => {
        req.reply({
          statusCode: status,
          body,
        });
      },
    );
  },
  queryByText(text, { withinTestId = null } = {}) {
    return makeAssertionsNot(() => {
      const cyLocal = withinTestId ? cy.findByTestId(withinTestId) : cy;
      return cyLocal.findByText(text);
    });
  },
});

type ItCallback = ({
  driver,
  context,
}: {
  driver: Driver;
  context: { localStorage: Storage };
}) => Step[];

function runSteps({
  context,
  driver,
  steps,
}: {
  context: { localStorage: Storage };
  driver: Driver;
  steps: Step[];
}) {
  // eslint-disable-next-line no-restricted-syntax
  for (const step of steps) {
    const nestedCallback = step({ context, driver });
    // Step definitions return another callback.
    if (typeof nestedCallback === 'function') nestedCallback();
    if (Array.isArray(nestedCallback))
      runSteps({ context, driver, steps: nestedCallback });
  }
}

function wrapItCallback(func: ItCallback) {
  return () => {
    const context = { localStorage };
    const driver = makeDriver();
    const steps = func({ driver, context });
    runSteps({ context, driver, steps });
  };
}

const it = (description: string, func: ItCallback) =>
  itCypress(description, wrapItCallback(func));
it.only = (description: string, func: ItCallback) =>
  itCypress.only(description, wrapItCallback(func));

export { it };

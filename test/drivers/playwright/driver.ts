import { expect, Locator, Page, test as itPlaywright } from '@playwright/test';

import type {
  Assertions,
  AssertionsNot,
  Driver,
  Interactions,
  Step,
} from '../../driver';

type LocatorResolver = () => Locator;

function makeAssertions(elementResolver: LocatorResolver): Assertions {
  return {
    shouldHaveAttribute:
      (attribute, value) =>
      ({ page }) =>
        expect(elementResolver({ page })).toHaveAttribute(
          attribute,
          value || /.*/,
        ),
    shouldBeVisible:
      () =>
      ({ page }) =>
        expect(elementResolver({ page })).toBeVisible(),
  };
}

function makeAssertionsNot(elementResolver: LocatorResolver): AssertionsNot {
  return {
    shouldNotBeVisible:
      () =>
      ({ page }) =>
        expect(elementResolver({ page })).toBeHidden(),
    shouldNotExist:
      () =>
      ({ page }) =>
        expect(elementResolver({ page })).not.toBeVisible(),
  };
}

function makeInteractions(elementResolver: LocatorResolver): Interactions {
  return {
    check:
      () =>
      async ({ page }) => {
        await elementResolver({ page }).check();
      },
    click:
      () =>
      async ({ page }) => {
        await elementResolver({ page }).click();
      },
    type:
      (text) =>
      async ({ page }) => {
        await elementResolver({ page }).fill(`${text}`);
      },
  };
}

function makeAssertionsInteractions(
  elementResolver: LocatorResolver,
): Assertions & Interactions {
  return {
    ...makeAssertions(elementResolver),
    ...makeInteractions(elementResolver),
  };
}

const makeLocalStorageFake = () => ({
  data: {} as Record<string, string>,
  setItem(key: string, value: string) {
    this.data[key] = value;
  },
  getItem(key: string) {
    return this.data[key];
  },
  removeItem(key: string) {
    delete this.data[key];
  },
  get length() {
    return Object.keys(this.data).length;
  },
  clear() {
    this.data = {};
  },
  key(index: number) {
    const keys = Object.keys(this.data);
    return keys[index] || null;
  },
});

const makeDriver = ({ context }): Driver => {
  return {
    goTo(path) {
      return async ({ page }) => {
        await page.addInitScript((state) => {
          for (const [key, value] of Object.entries(state)) {
            window.localStorage.setItem(key, value as string);
          }
        }, context.localStorage.data);
        await page.goto(path);
      };
    },
    findByLabelText(text) {
      return makeAssertionsInteractions(({ page }) => page.getByLabel(text));
    },
    findByRole(role, { name }) {
      return makeAssertionsInteractions(({ page }) =>
        page.getByRole(role, { name }),
      );
    },
    findByText(text) {
      return makeAssertions(({ page }) => page.getByText(text));
    },
    findAllByText(text) {
      return makeAssertions(({ page }) => page.getByText(text));
    },
    mockEndpoint(path, { body, method = 'get', status = 200 }) {
      return ({ page }) =>
        page.route(path, (route) => {
          if (route.request().method() !== method.toUpperCase()) {
            route.continue();
            return;
          }

          route.fulfill({
            status,
            body: JSON.stringify(body),
          });
        });
    },
    queryByText(text) {
      return makeAssertionsNot(({ page }) => page.getByText(text));
    },
  };
};

async function runSteps({
  context,
  driver,
  page,
  steps,
}: {
  context: { localStorage: Storage };
  driver: Driver;
  page: Page;
  steps: Step[];
}) {
  // eslint-disable-next-line no-restricted-syntax
  for (const step of steps) {
    // eslint-disable-next-line no-await-in-loop
    const nestedCallback = await step({ context, driver, page });
    // Step definitions return another callback.
    if (typeof nestedCallback === 'function') await nestedCallback({ page });
    // eslint-disable-next-line no-await-in-loop
    if (Array.isArray(nestedCallback))
      await runSteps({ driver, page, steps: nestedCallback });
  }
}

type ItCallback = ({
  driver,
  context,
}: {
  driver: Driver;
  context: { localStorage: Storage };
}) => Step[];

function wrapItCallback(
  description: string,
  func: ItCallback,
  itVariant: typeof itPlaywright,
) {
  const context = { localStorage: makeLocalStorageFake() };
  const driver = makeDriver({ context });
  const steps = func({ context, driver });
  itVariant(description, async ({ page }) => {
    await runSteps({ context, driver, page, steps });
  });
}

const it = (description: string, func: ItCallback) =>
  wrapItCallback(description, func, itPlaywright);
it.only = (description: string, func: ItCallback) =>
  wrapItCallback(description, func, itPlaywright.only);

export { it };

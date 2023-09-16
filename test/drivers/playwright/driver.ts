import { expect, Locator, Page, test as itPlaywright } from '@playwright/test';

import type {
  Assertions,
  AssertionsNot,
  Driver,
  Interactions,
} from '../../driver';

type LocatorResolver = () => Locator;

function makeAssertions(elementResolver: LocatorResolver): Assertions {
  return {
    shouldHaveAttribute: async (attribute, value) => {
      await expect(elementResolver()).toHaveAttribute(attribute, value || /.*/);
    },
    shouldBeVisible: async () => {
      await expect(elementResolver()).toBeVisible();
    },
  };
}

function makeAssertionsNot(elementResolver: LocatorResolver): AssertionsNot {
  return {
    shouldNotBeVisible: async () => {
      await expect(elementResolver()).toBeHidden();
    },
    shouldNotExist: async () => {
      await expect(elementResolver()).not.toBeVisible();
    },
  };
}

function makeInteractions(elementResolver: LocatorResolver): Interactions {
  return {
    check: async () => {
      await elementResolver().check();
    },
    click: async () => {
      await elementResolver().click();
    },
    type: async (text) => {
      await elementResolver().fill(`${text}`);
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

const makeDriver = ({ page }: { page: Page }): Driver => {
  const localStorageFake = makeLocalStorageFake();

  return {
    async goTo(path) {
      await page.addInitScript((state) => {
        for (const [key, value] of Object.entries(state)) {
          window.localStorage.setItem(key, value as string);
        }
      }, localStorageFake.data);
      await page.goto(path);
    },
    findByLabelText(text) {
      return makeAssertionsInteractions(() => page.getByLabel(text));
    },
    findByRole(role, { name }) {
      return makeAssertionsInteractions(() => page.getByRole(role, { name }));
    },
    findByText(text) {
      return makeAssertions(() => page.getByText(text));
    },
    findAllByText(text) {
      return makeAssertions(() => page.getByText(text));
    },
    mockEndpoint(path, { body, method = 'get', status = 200 }) {
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
    async setUp(factory) {
      return factory({
        context: { localStorage: localStorageFake },
        driver: this,
      });
    },
    queryByText(text) {
      return makeAssertionsNot(() => page.getByText(text));
    },
  };
};

const it = itPlaywright.extend<{ driver: Driver }>({
  driver: async ({ page }, use) => {
    await use(makeDriver({ page }));
  },
});

export { it };

import { Step, StepWithOptions } from 'test/driver';

export const open: Step =
  () =>
  ({ driver }) =>
    driver.goTo('/');

export const addItem: StepWithOptions<{ title: string }> =
  ({ title }) =>
  ({ driver }) =>
    [
      () =>
        driver.mockEndpoint('http://localhost:5173/api/items', {
          method: 'post',
          body: { id: '123', userId: '123', title },
        }),
      () => driver.findByLabelText('Title').type(title),
      () => driver.findByRole('button', { name: 'Add item' }).click(),
    ];

export const removeItem: StepWithOptions<{ title: string }> =
  ({ title }) =>
  ({ driver }) =>
    [
      () =>
        driver.mockEndpoint('http://localhost:5173/api/items/', {
          method: 'delete',
          body: { success: true },
        }),
      () => driver.findByRole('button', { name: title }).click(),
    ];

export const hasItems: StepWithOptions<{
  items: { id: string; userId: string; title: string }[];
}> =
  ({ items }) =>
  ({ driver }) =>
    driver.mockEndpoint('http://localhost:5173/api/items', {
      body: items,
    });

export const expectItemOnList: StepWithOptions<{ title: string }> =
  ({ title }) =>
  ({ driver }) =>
    driver.findByText(title).shouldBeVisible();

export const expectItemNotOnList: StepWithOptions<{ title: string }> =
  ({ title }) =>
  ({ driver }) =>
    driver.queryByText(title).shouldNotExist();

import { Step, StepWithOptions } from '../driver';

export const logIn: StepWithOptions<{ name: string; password: string }> =
  ({ name, password }) =>
  ({ driver }) =>
    [
      () =>
        driver.mockEndpoint('http://localhost:5173/api/login', {
          method: 'post',
          body: {
            token: 'token',
            user: {
              id: 123,
              name,
            },
          },
        }),
      () => driver.goTo('/login'),
      () => driver.findByLabelText('Username').type(name),
      () => driver.findByLabelText('Password').type(password),
      () => driver.findByRole('button', { name: 'Log in' }).click(),
    ];

export const isLoggedIn: Step =
  () =>
  ({ context }) => {
    const token = 'token';
    const user = { id: '123', name: 'admin' };
    context.localStorage.setItem('token', token);
    context.localStorage.setItem('user', JSON.stringify(user));
  };

export const expectLoggedIn: Step =
  () =>
  ({ driver }) =>
    driver.findByText('Shopping list').shouldBeVisible();

import { SetupFactoryOptions } from '../driver';

export const userDSLFactory = ({ context, driver }: SetupFactoryOptions) => ({
  logIn: async ({ name, password }: { name: string; password: string }) => {
    await driver.mockEndpoint('http://localhost:5173/api/login', {
      method: 'post',
      body: {
        token: 'token',
        user: {
          id: 123,
          name,
        },
      },
    });
    await driver.goTo('/login');
    await driver.findByLabelText('Username').type(name);
    await driver.findByLabelText('Password').type(password);
    await driver.findByRole('button', { name: 'Log in' }).click();
  },
  isLoggedIn: async () => {
    const token = 'token';
    const user = { id: '123', name: 'admin' };
    context.localStorage.setItem('token', token);
    context.localStorage.setItem('user', JSON.stringify(user));

    return { token, user };
  },
  expectLoggedIn: async () => {
    await driver.findByText('Shopping list').shouldBeVisible();
  },
});

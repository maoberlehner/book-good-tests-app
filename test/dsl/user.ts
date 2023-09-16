import { SetupFactoryOptions } from '../driver';
import { makeAuthRepository } from '../../src/repositories/auth';
import { makeUserRepository } from '../../server/repositories/user.mjs';
import { makeDb } from '../../server/db.mjs';

const { logIn } = makeAuthRepository({
  apiBaseUrl: 'http://localhost:5173/api/',
});
const db = makeDb();
const userRepository = makeUserRepository({ db });

export const userDSLFactory = ({ context, driver }: SetupFactoryOptions) => ({
  logIn: async ({ name, password }: { name: string; password: string }) => {
    await userRepository.create({ name, password });
    await driver.goTo('/login');
    await driver.findByLabelText('Username').type(name);
    await driver.findByLabelText('Password').type(password);
    await driver.findByRole('button', { name: 'Log in' }).click();
  },
  isLoggedIn: async () => {
    const name = `test-${Date.now()}-${
      Math.floor(Math.random() * 1000) + 1000
    }`;
    await userRepository.create({ name, password: 'password' });
    const { token, user } = await logIn({
      name,
      password: 'password',
    });
    context.localStorage.setItem('token', token);
    context.localStorage.setItem('user', JSON.stringify(user));

    return { token, user };
  },
  expectLoggedIn: async () => {
    await driver.findByText('Shopping list').shouldBeVisible();
  },
});

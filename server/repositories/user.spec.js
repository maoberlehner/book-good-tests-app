import { expect, it } from 'vitest';

import { makeUserRepository } from './user.mjs';
import { makeDb } from '../db.mjs';

const setUp = async (usersNew = []) => {
  const db = makeDb(
    `./tmp/${Date.now()}-${Math.floor(Math.random() * 1000) + 1000}.sqlite`,
  );
  const repository = makeUserRepository({ db });
  const users = [];
  for (let userNew of usersNew) {
    users.push(await repository.create(userNew));
  }

  return { db, users, repository };
};

it('should create a new user', async () => {
  const { db, repository } = await setUp();
  const name = 'Test user';
  const password = 'password';

  const user = await repository.create({ name, password });

  expect(
    await db
      .prepare(`SELECT name, password FROM users WHERE id = ?`)
      .get(user.id),
  ).toEqual({ name, password });
});

it('should find a user by name', async () => {
  const name = 'Test user';
  const password = 'password';
  const { repository } = await setUp([{ name, password }]);

  const user = await repository.findByName({ name });

  expect(user).toEqual({ id: expect.any(Number), name, password });
});

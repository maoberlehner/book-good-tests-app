import { expect, it } from 'vitest';

import { makeItemRepository } from './item.mjs';
import { makeDb } from '../db.mjs';

const setUp = async (itemsNew = []) => {
  const db = makeDb(
    `./tmp/${Date.now()}-${Math.floor(Math.random() * 1000) + 1000}.sqlite`,
  );
  const repository = makeItemRepository({ db });
  const items = [];
  for (let itemNew of itemsNew) {
    items.push(await repository.create(itemNew));
  }

  return { db, items, repository };
};

it('should create an item', async () => {
  const { db, repository } = await setUp();

  const userId = '123';
  const title = 'Test item';
  const item = await repository.create({ userId, title });

  expect(
    await db
      .prepare(`SELECT userId, title FROM items WHERE id = ?`)
      .get(item.id),
  ).toEqual({ userId, title });
});

it('should list items', async () => {
  const { repository } = await setUp([
    { userId: '123', title: 'Test item 1' },
    { userId: '123', title: 'Test item 2' },
    { userId: '456', title: 'Test item 3' },
  ]);

  const items = await repository.list({ userId: '123' });

  expect(items).toEqual([
    { id: expect.any(Number), userId: '123', title: 'Test item 1' },
    { id: expect.any(Number), userId: '123', title: 'Test item 2' },
  ]);
});

it('should remove an item', async () => {
  const userId = '123';
  const title = 'Test item';
  const { db, items, repository } = await setUp([{ userId, title }]);

  await repository.remove({ id: items[0].id });

  expect(
    await db
      .prepare(`SELECT userId, title FROM items WHERE id = ?`)
      .get(items[0].id),
  ).toBe(undefined);
});

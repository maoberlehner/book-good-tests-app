export const makeItemRepository = ({ db }) => {
  return {
    create: ({ userId, title }) => {
      return db
        .prepare(
          `INSERT INTO items(userId, title) VALUES(?, ?) RETURNING id, userId, title`,
        )
        .get(userId, title);
    },
    list: ({ userId }) => {
      return db
        .prepare(
          `SELECT id, userId, title FROM items WHERE userId = ? ORDER BY id`,
        )
        .all(userId);
    },
    remove: async ({ id }) => {
      await db.prepare(`DELETE FROM items WHERE id = ?`).run(id);
    },
  };
};

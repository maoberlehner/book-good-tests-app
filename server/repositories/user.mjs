export const makeUserRepository = ({ db }) => {
  return {
    async create({ name, password }) {
      const sql = 'INSERT INTO users (name, password) VALUES (?, ?)';
      await db.prepare(sql).run(name, password);
      return this.findByName({ name });
    },
    findByName: async ({ name }) => {
      const sql = 'SELECT * FROM users WHERE name = ?';
      const user = await db.prepare(sql).get(name);
      if (!user) {
        throw new Error(`User with name ${name} not found`);
      }
      return user;
    },
  };
};

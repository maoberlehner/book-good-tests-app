import fastify from 'fastify';
import fastifyStatic from '@fastify/static';
import jwt from '@fastify/jwt';
import path from 'path';

import { makeItemRepository } from './repositories/item.mjs';
import { makeUserRepository } from './repositories/user.mjs';
import { makeDb } from './db.mjs';

const app = fastify({ logger: true });
app.register(jwt, { secret: 'supersecret' });
app.register(fastifyStatic, {
  root: path.resolve('./dist'),
  prefix: '/',
});

app.setNotFoundHandler((request, reply) => {
  reply.sendFile('index.html');
});

const db = makeDb();
const itemRepository = makeItemRepository({ db });
const userRepository = makeUserRepository({ db });

app.decorate('authenticate', async (request, reply) => {
  try {
    await request.jwtVerify();
  } catch (error) {
    reply.send(error);
  }
});

app.post('/login', async (req, reply) => {
  const { name, password } = req.body;

  const user = await userRepository.findByName({ name });

  if (user?.password === password) {
    // User authenticated successfully
    const token = app.jwt.sign({ user: { id: user.id } });

    reply.send({ token, user: { id: user.id, name: user.name } });
  } else {
    // User authentication failed
    reply.status(401).send({ error: 'Invalid name or password' });
  }
});

app.post(
  '/items',
  { preValidation: [app.authenticate] },
  async (req, reply) => {
    const { title } = req.body;
    const { user } = req.user;

    try {
      const id = await itemRepository.create({ userId: user.id, title });
      reply.send({ id, userId: user.id, title });
    } catch (error) {
      console.error(error);
      reply.status(500).send({ error: 'Failed to create item' });
    }
  },
);

app.get('/items', { preValidation: [app.authenticate] }, async (req, reply) => {
  const { user } = req.user;

  try {
    const items = await itemRepository.list({ userId: user.id });
    reply.send(items);
  } catch (error) {
    console.error(error);
    reply.status(500).send({ error: 'Failed to list items' });
  }
});

app.delete(
  '/items/:id',
  { preValidation: [app.authenticate] },
  async (req, reply) => {
    const { id } = req.params;

    try {
      await itemRepository.remove({ id });
      reply.send({ success: true });
    } catch (error) {
      console.error(error);
      reply.status(500).send({ error: 'Failed to delete item' });
    }
  },
);

const PORT = process.env.PORT || 3222;
const HOST = process.env.HOST || '0.0.0.0';
app.listen({
  port: PORT,
  host: HOST,
});

console.log(`Server listening on http://${HOST}:${PORT}`);

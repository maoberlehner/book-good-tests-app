import { makeUserRepository } from './repositories/user.mjs';
import { makeDb } from './db.mjs';

const db = makeDb();
const userRepository = makeUserRepository({ db });

// Seed admin user
userRepository.create({ name: 'admin', password: 'password' });

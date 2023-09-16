import sqlite3 from 'better-sqlite3';

export const makeDb = (file = './db.sqlite') => {
  const db = sqlite3(file);
  db.prepare(
    `CREATE TABLE IF NOT EXISTS items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    userId TEXT NOT NULL,
    title TEXT NOT NULL
  )`,
  ).run();

  db.prepare(
    `CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    password TEXT NOT NULL
  )`,
  ).run();

  return db;
};

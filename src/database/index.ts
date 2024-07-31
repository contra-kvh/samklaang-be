import sqlite3 from 'sqlite3';
import dotenv from 'dotenv';
import {logger} from '@/utils/logger';


dotenv.config()

const DB_PATH = process.env.DB_PATH || ":memory:"
logger.info(`using ${DB_PATH} for the sqlite3 database`)
const db = new sqlite3.Database(DB_PATH)

db.serialize(() => {
// Enable foreign key support
  db.run(`PRAGMA foreign_keys = ON;`);

  // Create Users Table if needed
  db.run(`CREATE TABLE IF NOT EXISTS Users (
    uuid TEXT PRIMARY KEY NOT NULL,
    name TEXT NOT NULL,
    designation TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL UNIQUE,
    pwhash TEXT NOT NULL,
    created_at DATETIME NOT NULL
  )`, (err: Error | null) => {
    if (err) {
      console.error("Error creating Users table:", err.message);
    } else {
      console.log("Users table created or already exists.");
    }
  });

  // Create MailingLists Table if needed
  db.run(`CREATE TABLE IF NOT EXISTS MailingLists (
    slug TEXT PRIMARY KEY NOT NULL,
    name TEXT NOT NULL,
    description TEXT
  )`, (err: Error | null) => {
    if (err) {
      console.error("Error creating MailingLists table:", err.message);
    } else {
      console.log("MailingLists table created or already exists.");
    }
  });

  // Create MailingListEntries Table if needed
  db.run(`CREATE TABLE IF NOT EXISTS MailingListEntries (
    list_slug TEXT NOT NULL,
    email TEXT NOT NULL,
    PRIMARY KEY (list_slug, email),
    FOREIGN KEY (list_slug) REFERENCES MailingLists(slug) ON DELETE CASCADE
  )`, (err: Error | null) => {
    if (err) {
      console.error("Error creating MailingListEntries table:", err.message);
    } else {
      console.log("MailingListEntries table created or already exists.");
    }
  });
});

export default db

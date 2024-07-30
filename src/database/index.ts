import sqlite3 from 'sqlite3';
import dotenv from 'dotenv';
import {logger} from '../utils/logger';
import {generate} from '../utils/random-words';


dotenv.config()

const DB_PATH = process.env.DB_PATH || ":memory:"
logger.info(`using ${DB_PATH} for the sqlite3 database`)
const db = new sqlite3.Database(DB_PATH)

db.serialize(() => {
  // create Users Table if needed
  db.run(`CREATE TABLE Users (
    uuid    TEXT PRIMARY KEY NOT NULL,
    name    TEXT NOT NULL,
    designation TEXT NOT NULL,
    email   TEXT NOT NULL,
    pwhash  TEXT NOT NULL,
    created_at DATETIME NOT NULL
  )`, (err: Error | null) => {
    if (err) {
      console.error("Error creating Users table:", err.message);
    } else {
      console.log("Users table created or already exists.");
    }
  });

  // create Participants Table if needed
  db.run(`CREATE TABLE IF NOT EXISTS Participants (
    uuid  TEXT PRIMARY KEY NOT NULL,
    email TEXT NOT NULL,
    name  TEXT NOT NULL,
    org_name TEXT NOT NULL,
    designation TEXT NOT NULL,
    verified BOOLEAN NOT NULL DEFAULT 0
  )`, (err: Error | null) => {
    if (err) {
      console.error("Error creating Participants table:", err.message);
    } else {
      console.log("Participants table created or already exists.");
    }
  });
  db.run(`CREATE TABLE Meetings (
    uuid TEXT PRIMARY KEY NOT NULL,
    creator_uuid TEXT NOT NULL,
    agenda TEXT NOT NULL,
    start_time DATETIME NOT NULL,
    join_code TEXT NOT NULL,
    is_recorded BOOLEAN,
    created_at DATETIME NOT NULL
  )`, (err: Error | null) => {
    if (err) {
      console.error("Error creating Meetings table:", err.message);
    } else {
      console.log("Meetings table created or already exists.");
    }
  });
});

export default db

import { getDb } from "../src/db.js";

const db = getDb();

db.exec(`
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY,
  username TEXT UNIQUE,
  pp INTEGER DEFAULT 0,
  xp INTEGER DEFAULT 0,
  banned INTEGER DEFAULT 0
);
CREATE TABLE IF NOT EXISTS runs (
  id INTEGER PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  created_at TEXT DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS chapters (
  branch_key TEXT PRIMARY KEY,
  content_json TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS pending_options (
  token TEXT PRIMARY KEY,
  user_id INTEGER,
  option_id TEXT,
  expires_at TEXT
);
CREATE TABLE IF NOT EXISTS events (
  id INTEGER PRIMARY KEY,
  user_id INTEGER,
  option_id TEXT,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS quotas (
  user_id INTEGER PRIMARY KEY,
  choices INTEGER DEFAULT 0,
  generations INTEGER DEFAULT 0,
  day TEXT
);
CREATE TABLE IF NOT EXISTS generation_jobs (
  id INTEGER PRIMARY KEY,
  branch_key TEXT,
  status TEXT,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS user_rewards (
  id INTEGER PRIMARY KEY,
  user_id INTEGER,
  reward TEXT,
  xp INTEGER
);
CREATE INDEX IF NOT EXISTS idx_pending_options_expires ON pending_options(expires_at);
`);

console.log("migration complete");

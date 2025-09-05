import fs from "fs";
import path from "path";
import Database from "better-sqlite3";

const dbPath = path.join(process.cwd(), "data", "kingofcarts.sqlite");
fs.mkdirSync(path.dirname(dbPath), { recursive: true });

const db = new Database(dbPath);
db.pragma("journal_mode = WAL");
db.pragma("synchronous = NORMAL");
db.pragma("foreign_keys = ON");
db.pragma("busy_timeout = 3000");

export function getDb() {
  return db;
}

export function cleanupExpiredTokens() {
  db.prepare("DELETE FROM pending_options WHERE expires_at < datetime('now')").run();
}

export function applyChoiceTx(userId: number, optionId: string) {
  const tx = db.transaction(() => {
    // placeholder transactional logic
    db.prepare("INSERT INTO events(user_id, option_id) VALUES (?, ?)").run(userId, optionId);
  });
  tx();
}

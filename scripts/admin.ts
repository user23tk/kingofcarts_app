import { getDb } from "../src/db.js";

const db = getDb();
const [cmd, arg] = process.argv.slice(2);

if (cmd === "ban" && arg) {
  db.prepare("UPDATE users SET banned = 1 WHERE username = ?").run(arg);
  console.log(`banned ${arg}`);
} else {
  console.log("usage: node dist/scripts/admin.js ban <username>");
}

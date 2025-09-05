import { getDb } from "../db.js";
import { generateChapter } from "../ai/provider.js";
import { Chapter } from "../ai/schema.js";

export async function ensureChapter(branchKey: string, prompt: string): Promise<Chapter> {
  const db = getDb();
  const row: any = db
    .prepare("SELECT content_json FROM chapters WHERE branch_key = ?")
    .get(branchKey);
  if (row && row.content_json) {
    return JSON.parse(row.content_json) as Chapter;
  }
  const chapter = await generateChapter(prompt);
  saveChapter(branchKey, chapter);
  return chapter;
}

export function saveChapter(branchKey: string, chapter: Chapter) {
  const db = getDb();
  db.prepare(
    "INSERT OR REPLACE INTO chapters(branch_key, content_json) VALUES(?, ?)"
  ).run(branchKey, JSON.stringify(chapter));
}

export function awardPioneer(userId: number) {
  const db = getDb();
  db.prepare("INSERT INTO user_rewards(user_id, reward, xp) VALUES(?, 'Pioniere', 5)").run(userId);
}

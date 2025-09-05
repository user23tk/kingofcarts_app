import fetch from "node-fetch";
import { env } from "../env.js";
import { ChapterSchema, Chapter } from "./schema.js";

const SYSTEM_PROMPT = `Sei autore per un bot Telegram a bottoni. Stile psichedelico/ironico, maturo ma sicuro (no illegalità/sesso esplicito/violenza grafica). Mentore = {{KING}}, eroe = {{PLAYER}}. Genera 8 scene brevi (≤80 parole) + Finale. Scelte solo in scene 1/3/5/7 (A/B con pp_delta −2..+2 e goto), Finale con 3 opzioni A/B/C (solo pp_delta). Mantieni i placeholder {{KING}}/{{PLAYER}}. Output SOLO JSON {title, theme, scenes[], finale}.`;

export async function generateChapter(userPrompt: string): Promise<Chapter> {
  const body = {
    model: env.XAI_API_KEY ? "grok-4-0709" : "gpt-4o",
    messages: [
      { role: "system", content: SYSTEM_PROMPT },
      { role: "user", content: userPrompt }
    ]
  };
  const url = env.XAI_API_KEY
    ? "https://api.x.ai/v1/chat/completions"
    : "https://api.openai.com/v1/chat/completions";
  const key = env.XAI_API_KEY || env.OPENAI_API_KEY;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${key}`
    },
    body: JSON.stringify(body)
  });
  const json: any = await res.json();
  const content = json.choices?.[0]?.message?.content ?? "{}";
  const parsed = ChapterSchema.parse(JSON.parse(content));
  return parsed;
}

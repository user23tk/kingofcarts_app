import express from "express";
import { env } from "./env.js";
import { handleUpdate, bot } from "./server.js";
import { telegramAuth, basicAuth } from "./security.js";
import path from "path";

const app = express();
app.use(express.json());

app.get("/healthz", (_req, res) => res.json({ ok: true }));

const telegramPath = `/telegram/${env.WEBHOOK_PATH_SECRET ?? ""}`;
app.post(telegramPath, telegramAuth, handleUpdate);

app.get("/debug", basicAuth, (_req, res) => {
  res.sendFile(path.join(process.cwd(), "debug/index.html"));
});

app.listen(8085, async () => {
  console.log("server running on 8085");
  if (env.PUBLIC_BASE_URL && env.WEBHOOK_PATH_SECRET) {
    try {
      await bot.telegram.setWebhook(
        `${env.PUBLIC_BASE_URL}${telegramPath}`,
        { secret_token: env.TELEGRAM_SECRET_TOKEN }
      );
    } catch (err) {
      console.error("setWebhook failed", err);
    }
  }
});

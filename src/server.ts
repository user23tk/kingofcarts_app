import { Telegraf } from "telegraf";
import type { Request, Response } from "express";
import { env } from "./env.js";
import { render } from "./renderer.js";

export const bot = new Telegraf(env.TELEGRAM_BOT_TOKEN);

bot.start((ctx) => {
  const player = ctx.from?.username ?? "giocatore";
  ctx.reply(
    render("Benvenuto {{PLAYER}}!", player),
    {
      reply_markup: {
        keyboard: [
          [{ text: "\u25B6\uFE0F Inizia" }],
          [{ text: "\ud83d\udcca Statistiche" }, { text: "\ud83d\udce3 Condividi" }]
        ],
        resize_keyboard: true
      }
    }
  );
});

export async function handleUpdate(req: Request, res: Response) {
  await bot.handleUpdate(req.body as any, res);
  if (!res.headersSent) {
    res.status(200).end();
  }
}


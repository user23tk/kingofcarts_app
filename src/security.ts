import crypto from "crypto";
import type { Request, Response, NextFunction } from "express";
import { env } from "./env.js";

export function telegramAuth(req: Request, res: Response, next: NextFunction) {
  const secret = req.headers["x-telegram-bot-api-secret-token"]; 
  if (secret !== env.TELEGRAM_SECRET_TOKEN) {
    res.status(401).send("unauthorized");
    return;
  }
  next();
}

export function verifyStartPayload(payload: string, sig: string): boolean {
  const h = crypto.createHmac("sha256", env.START_SIGNATURE_SECRET);
  h.update(payload);
  const expected = h.digest("hex");
  return crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(expected));
}

export function signStartPayload(payload: string): string {
  const h = crypto.createHmac("sha256", env.START_SIGNATURE_SECRET);
  h.update(payload);
  return h.digest("hex");
}

export function escapeHtml(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export function basicAuth(req: Request, res: Response, next: NextFunction) {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith("Basic ")) {
    res.setHeader("WWW-Authenticate", "Basic realm=\"debug\"");
    res.status(401).end();
    return;
  }
  const creds = Buffer.from(auth.slice(6), "base64").toString();
  const [user, pass] = creds.split(":");
  if (user !== "admin" || pass !== env.ADMIN_KEY) {
    res.setHeader("WWW-Authenticate", "Basic realm=\"debug\"");
    res.status(401).end();
    return;
  }
  next();
}

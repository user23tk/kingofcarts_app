import { escapeHtml } from "./security.js";

export function render(text: string, player: string): string {
  return text
    .replace(/{{KING}}/g, escapeHtml("King of Carts"))
    .replace(/{{PLAYER}}/g, escapeHtml(player));
}

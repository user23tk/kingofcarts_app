# King of Carts – Telegram Bot

Backend-only Telegram adventure bot built in Node.js/TypeScript.

## Setup

1. Copy `.env.example` to `.env` and fill secrets.
2. Install dependencies and build:
   ```bash
   npm install
   npm run build
   ```
3. Run migrations:
   ```bash
   node dist/scripts/migrate.js
   ```
4. Start server:
   ```bash
   node dist/src/index.js
   ```

## Webhook configuration

After the server is reachable over HTTPS, configure the Telegram webhook:
```bash
TELEGRAM_BOT_TOKEN=... PUBLIC_BASE_URL=https://yourdomain WEBHOOK_PATH_SECRET=... TELEGRAM_SECRET_TOKEN=... ./scripts/set_webhook.sh
```
If using a self-signed certificate, pass the `certificate` parameter to `setWebhook`.

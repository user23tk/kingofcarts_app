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
   node dist/index.js
   ```

## Docker / VPS

On a VPS with Docker installed:

```bash
ufw allow 8443/tcp
cp .env.example .env # edit values
./scripts/deploy_vps.sh user@host
```

After deploy set webhook:
```bash
TELEGRAM_BOT_TOKEN=... PUBLIC_BASE_URL=https://yourdomain WEBHOOK_PATH_SECRET=... TELEGRAM_SECRET_TOKEN=... ./scripts/set_webhook.sh
```

If using self-signed certs, include `certificate` parameter when calling `setWebhook`.

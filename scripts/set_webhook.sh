#!/bin/sh
curl -s -X POST "https://api.telegram.org/bot$TELEGRAM_BOT_TOKEN/setWebhook" \
  -F "url=${PUBLIC_BASE_URL}/telegram/${WEBHOOK_PATH_SECRET}" \
  -F "secret_token=${TELEGRAM_SECRET_TOKEN}"

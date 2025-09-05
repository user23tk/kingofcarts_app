import { z } from "zod";

const EnvSchema = z.object({
  TELEGRAM_BOT_TOKEN: z.string().min(1),
  TELEGRAM_SECRET_TOKEN: z.string().min(1),
  WEBHOOK_PATH_SECRET: z.string().optional(),
  PUBLIC_BASE_URL: z.string().url().optional(),
  START_SIGNATURE_SECRET: z.string().min(1),
  ADMIN_KEY: z.string().min(1),
  XAI_API_KEY: z.string().optional(),
  OPENAI_API_KEY: z.string().optional(),
  SUPABASE_URL: z.string().url().optional(),
  SUPABASE_SERVICE_ROLE: z.string().optional(),
  TOKENS_TTL_MIN: z.coerce.number().int().positive().default(5),
  COOLDOWN_MS: z.coerce.number().int().nonnegative().default(1000),
  DAILY_GENERATIONS: z.coerce.number().int().nonnegative().default(50),
  DAILY_CHOICES: z.coerce.number().int().nonnegative().default(200)
});

export type Env = z.infer<typeof EnvSchema>;

export function loadEnv(): Env {
  const parsed = EnvSchema.safeParse(process.env);
  if (!parsed.success) {
    console.error("Invalid environment variables", parsed.error.flatten().fieldErrors);
    throw new Error("ENV_VALIDATION_FAILED");
  }
  return parsed.data;
}

export const env = loadEnv();

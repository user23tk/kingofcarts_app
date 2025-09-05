import { z } from "zod";

const OptionSchema = z.object({
  id: z.string().min(1),
  text: z.string().min(1),
  pp_delta: z.number().int().min(-2).max(2),
  goto: z.number().int().optional()
});

const SceneSchema = z.object({
  text: z.string().min(1),
  options: z.array(OptionSchema).optional()
});

const FinaleOptionSchema = OptionSchema.omit({ goto: true });

const FinaleSchema = z.object({
  text: z.string().min(1),
  options: z.array(FinaleOptionSchema).length(3)
});

export const ChapterSchema = z.object({
  title: z.string(),
  theme: z.string(),
  scenes: z.array(SceneSchema).length(8),
  finale: FinaleSchema
});

export type Chapter = z.infer<typeof ChapterSchema>;

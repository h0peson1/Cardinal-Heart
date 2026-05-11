import { z } from "zod"

export const reflectionSchema = z.object({
  content: z.string()
    .min(1, "Reflection cannot be empty")
    .max(1000, "Reflection is too long (max 1000 characters)")
    .trim(),
  category: z.enum(["Community", "Loneliness", "Growth", "Academic", "Gratitude", "Hope"]),
  mood: z.string().min(1, "Please select a mood"),
})

export const journalEntrySchema = z.object({
  content: z.string()
    .min(1, "Entry cannot be empty")
    .max(5000, "Entry is too long (max 5000 characters)")
    .trim(),
  category: z.string().min(1, "Please select a category"),
  mood: z.string().min(1, "Please select a mood"),
})

export const reportSchema = z.object({
  reflection_id: z.string().uuid(),
  reason: z.string().min(5, "Reason must be at least 5 characters").max(500),
})

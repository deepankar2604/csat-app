import { z } from "zod";

export const csatSchema = z.object({
  rating: z.number().min(1, "Rating is required").max(5),
  feedback_option: z.string().optional(),
  additional_comments: z.string().max(500, "Max 500 characters").optional(),
  tags: z.array(z.string()).max(3, "Max 3 tags").optional(),
});

export type CsatForm = z.infer<typeof csatSchema>;

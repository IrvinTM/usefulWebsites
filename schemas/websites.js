import { z } from 'zod';

const websiteSchema = z.object({
  name: z.string().min(1),
  category: z.string().min(1),
  url: z.string().url(),
  description: z.string().min(1),
  registration_required: z.boolean(),
});

export function validateWebsiteData(data) {
  return websiteSchema.safeParse(data);
}

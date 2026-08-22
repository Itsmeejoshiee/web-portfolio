import { createInsertSchema } from 'drizzle-zod';
import { z } from 'zod';
import { contact } from '../db/schema';

export const updateContactSchema = createInsertSchema(contact)
  .pick({ body: true, ctaLabel: true, ctaUrl: true })
  .partial();

export type UpdateContactDto = z.infer<typeof updateContactSchema>;

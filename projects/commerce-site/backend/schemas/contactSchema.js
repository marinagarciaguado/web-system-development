// backend/schemas/contactSchema.js
import { z } from 'zod';

export const ContactFormSchema = z.object({
  name: z.string().min(2, "Name is required and must be at least 2 characters."),
  email: z.string().email("A valid email address is required for reply."),
  message: z.string().min(10, "A message of at least 10 characters is required."),
});
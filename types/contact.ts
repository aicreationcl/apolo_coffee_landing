import { z } from "zod";

export const contactFormSchema = z.object({
  name: z.string().min(2, "Ingresa tu nombre completo"),
  email: z.string().email("Ingresa un correo válido"),
  message: z.string().min(10, "Cuéntanos un poco más (mínimo 10 caracteres)"),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

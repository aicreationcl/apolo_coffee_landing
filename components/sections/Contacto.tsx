"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import { useScrollReveal } from "@/components/gsap/useScrollReveal";
import { contactFormSchema, type ContactFormData } from "@/types/contact";
import { cn } from "@/lib/utils";

const inputClass =
  "border-0 border-b-2 border-outline-variant bg-transparent px-0 py-2 body-md text-on-background outline-none transition-colors focus:border-primary";

export function Contacto() {
  const formRef = useScrollReveal<HTMLDivElement>({ y: 24 });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  });

  const onSubmit = async (data: ContactFormData, event?: React.BaseSyntheticEvent) => {
    setIsSubmitting(true);
    try {
      const formData = new FormData(event?.target as HTMLFormElement | undefined);
      const website = formData.get("website");

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, website: typeof website === "string" ? website : "" }),
      });
      const result = await response.json();

      if (response.ok && result.success) {
        toast.success("¡Gracias! Tu mensaje fue enviado, te responderemos pronto.");
        reset();
      } else {
        toast.error("No pudimos enviar tu mensaje. Intenta nuevamente.");
      }
    } catch {
      toast.error("No pudimos enviar tu mensaje. Revisa tu conexión e intenta de nuevo.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const submit = handleSubmit(onSubmit);

  return (
    <section id="contacto" className="bg-surface-container-low">
      <Container className="py-20 lg:py-28">
        <div ref={formRef} className="mx-auto flex max-w-xl flex-col gap-8">
          <div className="flex flex-col gap-3 text-center">
            <span className="label-sm text-secondary">Hablemos</span>
            <h2 className="headline-lg text-on-background">Escríbenos</h2>
            <p className="body-md text-on-surface-variant">
              ¿Preguntas, pedidos especiales o quieres llevar Apolo Coffee a tu evento? Cuéntanos.
            </p>
          </div>

          <form onSubmit={submit} className="flex flex-col gap-6" noValidate>
            {/* Honeypot anti-spam: oculto para humanos, si un bot lo rellena se descarta en el servidor */}
            <input
              name="website"
              type="text"
              tabIndex={-1}
              autoComplete="off"
              className="hidden"
              aria-hidden="true"
            />

            <div className="flex flex-col gap-1.5">
              <label htmlFor="name" className="label-sm text-on-surface-variant">
                Nombre
              </label>
              <input
                id="name"
                type="text"
                className={inputClass}
                aria-invalid={!!errors.name}
                {...register("name")}
              />
              {errors.name && <p className="body-md text-error">{errors.name.message}</p>}
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="email" className="label-sm text-on-surface-variant">
                Email
              </label>
              <input
                id="email"
                type="email"
                className={inputClass}
                aria-invalid={!!errors.email}
                {...register("email")}
              />
              {errors.email && <p className="body-md text-error">{errors.email.message}</p>}
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="message" className="label-sm text-on-surface-variant">
                Mensaje
              </label>
              <textarea
                id="message"
                rows={4}
                className={cn(inputClass, "resize-none")}
                aria-invalid={!!errors.message}
                {...register("message")}
              />
              {errors.message && <p className="body-md text-error">{errors.message.message}</p>}
            </div>

            <Button type="submit" size="lg" disabled={isSubmitting} className="w-fit px-6 py-5 text-base">
              {isSubmitting ? "Enviando…" : "Enviar mensaje"}
            </Button>
          </form>
        </div>
      </Container>
    </section>
  );
}

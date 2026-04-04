"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  contactFormSchema,
  type ContactFormInput,
} from "@/lib/validations/contact-form";
import { CheckCircle2, Loader2 } from "lucide-react";
import { FormField } from "./form-field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { CONTACT_CATEGORIES } from "@/lib/constants";
import { submitContactForm } from "@/actions/submit-contact-form";

const categoryOptions = CONTACT_CATEGORIES.map((cat) => ({
  value: cat,
  label: cat,
}));

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormInput>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      honeypot: "",
    },
  });

  async function onSubmit(data: ContactFormInput) {
    setServerError(null);
    const result = await submitContactForm(data);

    if (result.success) {
      setSubmitted(true);
    } else {
      setServerError(result.error ?? "Something went wrong. Please try again.");
    }
  }

  if (submitted) {
    return (
      <div className="bg-success/10 border border-success p-6 rounded-sm animate-fade-in">
        <CheckCircle2 className="h-6 w-6 text-success mb-3" />
        <h3 className="font-heading text-lg font-semibold text-text-primary mb-2">
          Message Sent
        </h3>
        <p className="text-text-secondary">
          Thank you for reaching out. We will get back to you within 1-2
          business days.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6">
      {serverError && (
        <div role="alert" className="bg-error/10 border border-error p-4 rounded-sm text-error text-sm">
          {serverError}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField label="Full Name" htmlFor="contact-name" required error={errors.name?.message}>
          <Input
            {...register("name")}
            id="contact-name"
            type="text"
            placeholder="Your full name"
          />
        </FormField>

        <FormField label="Email" htmlFor="contact-email" required error={errors.email?.message}>
          <Input
            {...register("email")}
            id="contact-email"
            type="email"
            placeholder="you@example.com"
          />
        </FormField>
      </div>

      <FormField label="Category" htmlFor="contact-category" required error={errors.category?.message}>
        <Select
          {...register("category")}
          id="contact-category"
          options={categoryOptions}
          placeholder="Select a category"
        />
      </FormField>

      <FormField label="Message" htmlFor="contact-message" required error={errors.message?.message}>
        <Textarea
          {...register("message")}
          id="contact-message"
          placeholder="How can we help you?"
        />
      </FormField>

      {/* Honeypot field for spam prevention */}
      <input
        {...register("honeypot")}
        type="text"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute opacity-0 h-0 w-0 overflow-hidden"
      />

      <Button type="submit" variant="primary" disabled={isSubmitting} className="w-full sm:w-auto">
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Sending...
          </>
        ) : (
          "Send Message"
        )}
      </Button>
    </form>
  );
}

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
      <div className="bg-success/10 border border-success p-6 rounded-[3px] animate-fade-in">
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
        <div role="alert" className="bg-error/10 border border-error p-4 rounded-[3px] text-error text-sm">
          {serverError}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField label="Full Name" required error={errors.name?.message}>
          <Input
            {...register("name")}
            type="text"
            placeholder="Your full name"
            error={errors.name?.message}
          />
        </FormField>

        <FormField label="Email" required error={errors.email?.message}>
          <Input
            {...register("email")}
            type="email"
            placeholder="you@example.com"
            error={errors.email?.message}
          />
        </FormField>
      </div>

      <FormField label="Category" required error={errors.category?.message}>
        <Select
          {...register("category")}
          options={categoryOptions}
          placeholder="Select a category"
          error={errors.category?.message}
        />
      </FormField>

      <FormField label="Message" required error={errors.message?.message}>
        <Textarea
          {...register("message")}
          placeholder="How can we help you?"
          error={errors.message?.message}
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

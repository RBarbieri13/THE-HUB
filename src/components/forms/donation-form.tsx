"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  donationInquirySchema,
  type DonationInquiryInput,
} from "@/lib/validations/donation-inquiry";
import { CheckCircle2, Loader2 } from "lucide-react";
import { FormField } from "./form-field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { EQUIPMENT_CATEGORIES, EQUIPMENT_CONDITIONS } from "@/lib/constants";
import { submitDonationInquiry } from "@/actions/submit-donation-inquiry";

const categoryOptions = EQUIPMENT_CATEGORIES.map((cat) => ({
  value: cat,
  label: cat,
}));

const conditionOptions = EQUIPMENT_CONDITIONS.map((cond) => ({
  value: cond,
  label: cond,
}));

export function DonationForm() {
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<DonationInquiryInput>({
    resolver: zodResolver(donationInquirySchema),
    defaultValues: {
      pickup_needed: false,
      honeypot: "",
    },
  });

  async function onSubmit(data: DonationInquiryInput) {
    setServerError(null);
    const result = await submitDonationInquiry(data);

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
          Donation Inquiry Submitted
        </h3>
        <p className="text-text-secondary">
          Thank you for your generous donation inquiry. Our team will reach out
          within 2-3 business days to coordinate next steps.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6">
      <div className="bg-primary/10 border-l-4 border-primary-dark rounded-sm p-4 mb-6">
        <p className="text-text-primary text-sm font-semibold">Donation Process</p>
        <p className="text-text-body text-sm mt-1">
          After submitting, our team will contact you within 2–3 business days to arrange pickup or drop-off of your equipment.
        </p>
      </div>

      {serverError && (
        <div role="alert" className="bg-error/10 border border-error p-4 rounded-sm text-error text-sm">
          {serverError}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField label="Full Name" htmlFor="donor-name" required error={errors.name?.message}>
          <Input
            {...register("name")}
            id="donor-name"
            type="text"
            placeholder="Your full name"
          />
        </FormField>

        <FormField
          label="Organization (if applicable)"
          htmlFor="org_name"
          error={errors.org_name?.message}
        >
          <Input
            {...register("org_name")}
            id="org_name"
            type="text"
            placeholder="Organization name"
          />
        </FormField>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField label="Email" htmlFor="donor-email" required error={errors.email?.message}>
          <Input
            {...register("email")}
            id="donor-email"
            type="email"
            placeholder="you@example.com"
          />
        </FormField>

        <FormField label="Phone" htmlFor="donor-phone" required error={errors.phone?.message}>
          <Input
            {...register("phone")}
            id="donor-phone"
            type="tel"
            placeholder="(615) 555-0100"
          />
        </FormField>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField label="Item Type" htmlFor="item_type" required error={errors.item_type?.message}>
          <Select
            {...register("item_type")}
            id="item_type"
            options={categoryOptions}
            placeholder="Select item type"
          />
        </FormField>

        <FormField
          label="Condition"
          htmlFor="condition"
          required
          error={errors.condition?.message}
        >
          <Select
            {...register("condition")}
            id="condition"
            options={conditionOptions}
            placeholder="Select condition"
          />
        </FormField>
      </div>

      <FormField label="Brand / Model" htmlFor="brand_model" error={errors.brand_model?.message}>
        <Input
          {...register("brand_model")}
          id="brand_model"
          type="text"
          placeholder="e.g., Quickie QM-710"
        />
      </FormField>

      <FormField label="Additional Notes" htmlFor="donor-notes" error={errors.notes?.message}>
        <Textarea
          {...register("notes")}
          id="donor-notes"
          placeholder="Any other details about the item (age, accessories, modifications, etc.)"
        />
      </FormField>

      <FormField label="Pickup Assistance" htmlFor="pickup_needed" error={errors.pickup_needed?.message}>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            {...register("pickup_needed")}
            id="pickup_needed"
            type="checkbox"
            className="h-4 w-4 rounded-sm border border-border accent-primary-dark"
          />
          <span className="text-sm text-text-body">
            I need pickup assistance
          </span>
        </label>
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

      <Button type="submit" variant="secondary" disabled={isSubmitting}>
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Submitting...
          </>
        ) : (
          "Submit Donation Inquiry"
        )}
      </Button>
    </form>
  );
}

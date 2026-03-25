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
      <div className="bg-success/10 border border-success p-6 rounded-[3px] animate-fade-in">
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
      <div className="bg-primary/10 border-l-4 border-primary-dark rounded-[3px] p-4 mb-6">
        <p className="text-text-primary text-sm font-semibold">Donation Process</p>
        <p className="text-text-body text-sm mt-1">
          After submitting, our team will contact you within 2–3 business days to arrange pickup or drop-off of your equipment.
        </p>
      </div>

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

        <FormField
          label="Organization (if applicable)"
          error={errors.org_name?.message}
        >
          <Input
            {...register("org_name")}
            type="text"
            placeholder="Organization name"
            error={errors.org_name?.message}
          />
        </FormField>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField label="Email" required error={errors.email?.message}>
          <Input
            {...register("email")}
            type="email"
            placeholder="you@example.com"
            error={errors.email?.message}
          />
        </FormField>

        <FormField label="Phone" required error={errors.phone?.message}>
          <Input
            {...register("phone")}
            type="tel"
            placeholder="(615) 555-0100"
            error={errors.phone?.message}
          />
        </FormField>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField label="Item Type" required error={errors.item_type?.message}>
          <Select
            {...register("item_type")}
            options={categoryOptions}
            placeholder="Select item type"
            error={errors.item_type?.message}
          />
        </FormField>

        <FormField
          label="Condition"
          required
          error={errors.condition?.message}
        >
          <Select
            {...register("condition")}
            options={conditionOptions}
            placeholder="Select condition"
            error={errors.condition?.message}
          />
        </FormField>
      </div>

      <FormField label="Brand / Model" error={errors.brand_model?.message}>
        <Input
          {...register("brand_model")}
          type="text"
          placeholder="e.g., Quickie QM-710"
          error={errors.brand_model?.message}
        />
      </FormField>

      <FormField label="Additional Notes" error={errors.notes?.message}>
        <Textarea
          {...register("notes")}
          placeholder="Any other details about the item (age, accessories, modifications, etc.)"
          error={errors.notes?.message}
        />
      </FormField>

      <FormField label="Pickup Assistance" error={errors.pickup_needed?.message}>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            {...register("pickup_needed")}
            type="checkbox"
            className="h-4 w-4 rounded-[3px] border border-[#E5E5E5] accent-primary-dark"
          />
          <span className="text-sm text-text-secondary">
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

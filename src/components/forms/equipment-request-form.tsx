"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  equipmentRequestSchema,
  type EquipmentRequestInput,
} from "@/lib/validations/equipment-request";
import { CheckCircle2, Loader2 } from "lucide-react";
import { FormField } from "./form-field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { REQUESTER_ROLES, URGENCY_LEVELS } from "@/lib/constants";
import { submitEquipmentRequest } from "@/actions/submit-equipment-request";

const roleOptions = REQUESTER_ROLES.map((role) => ({
  value: role,
  label: role,
}));

const urgencyOptions = URGENCY_LEVELS.map((level) => ({
  value: level,
  label: level,
}));

export function EquipmentRequestForm() {
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<EquipmentRequestInput>({
    resolver: zodResolver(equipmentRequestSchema),
    defaultValues: {
      tn_resident: undefined,
      honeypot: "",
    },
  });

  async function onSubmit(data: EquipmentRequestInput) {
    setServerError(null);
    const result = await submitEquipmentRequest(data);

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
          Request Submitted
        </h3>
        <p className="text-text-secondary">
          Thank you for your equipment request. Our team will review your
          submission and contact you within 2-3 business days.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6">
      <div className="bg-primary/10 border-l-4 border-primary-dark rounded-[3px] p-4 mb-6">
        <p className="text-text-primary text-sm font-semibold">What to expect</p>
        <p className="text-text-body text-sm mt-1">
          Requests are reviewed within 3–5 business days. A team member will contact you to discuss equipment availability and next steps.
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

        <FormField label="Email" required error={errors.email?.message}>
          <Input
            {...register("email")}
            type="email"
            placeholder="you@example.com"
            error={errors.email?.message}
          />
        </FormField>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField label="Phone" required error={errors.phone?.message} hint="Format: (615) 555-1234">
          <Input
            {...register("phone")}
            type="tel"
            placeholder="(615) 555-0100"
            error={errors.phone?.message}
          />
        </FormField>

        <FormField label="City" required error={errors.city?.message}>
          <Input
            {...register("city")}
            type="text"
            placeholder="Your city"
            error={errors.city?.message}
          />
        </FormField>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField label="County (Tennessee)" required error={errors.county?.message}>
          <Input
            {...register("county")}
            type="text"
            placeholder="Your county"
            error={errors.county?.message}
          />
        </FormField>

        <FormField label="Your Role / Relationship to Patient" required error={errors.role?.message}>
          <Select
            {...register("role")}
            options={roleOptions}
            placeholder="Select your role"
            error={errors.role?.message}
          />
        </FormField>
      </div>

      <FormField
        label="Equipment Needed"
        required
        error={errors.equipment_needed?.message}
      >
        <Textarea
          {...register("equipment_needed")}
          placeholder="Describe the equipment you need, including size or specifications if known"
          error={errors.equipment_needed?.message}
        />
      </FormField>

      <FormField label="Urgency" required error={errors.urgency?.message} hint="Select based on medical necessity">
        <Select
          {...register("urgency")}
          options={urgencyOptions}
          placeholder="Select urgency level"
          error={errors.urgency?.message}
        />
      </FormField>

      <FormField label="Additional Notes" error={errors.notes?.message}>
        <Textarea
          {...register("notes")}
          placeholder="Any other details that may help us assist you"
          error={errors.notes?.message}
        />
      </FormField>

      <FormField
        label="Tennessee Residency"
        required
        error={errors.tn_resident?.message}
      >
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            {...register("tn_resident")}
            type="checkbox"
            className="h-4 w-4 rounded-[3px] border border-[#E5E5E5] accent-primary-dark"
          />
          <span className="text-sm text-text-secondary">
            I confirm I am a Tennessee resident
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

      <Button type="submit" variant="primary" disabled={isSubmitting}>
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Submitting...
          </>
        ) : (
          "Submit Request"
        )}
      </Button>
    </form>
  );
}

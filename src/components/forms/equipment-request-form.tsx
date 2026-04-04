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
      <div className="bg-success/10 border border-success p-6 rounded-sm animate-fade-in">
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
      <div className="bg-primary/10 border-l-4 border-primary-dark rounded-sm p-4 mb-6">
        <p className="text-text-primary text-sm font-semibold">What to expect</p>
        <p className="text-text-body text-sm mt-1">
          Requests are reviewed within 3–5 business days. A team member will contact you to discuss equipment availability and next steps.
        </p>
      </div>

      {serverError && (
        <div role="alert" className="bg-error/10 border border-error p-4 rounded-sm text-error text-sm">
          {serverError}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField label="Full Name" htmlFor="name" required error={errors.name?.message}>
          <Input
            {...register("name")}
            id="name"
            type="text"
            placeholder="Your full name"
          />
        </FormField>

        <FormField label="Email" htmlFor="email" required error={errors.email?.message}>
          <Input
            {...register("email")}
            id="email"
            type="email"
            placeholder="you@example.com"
          />
        </FormField>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField label="Phone" htmlFor="phone" required error={errors.phone?.message} hint="Format: (615) 555-1234">
          <Input
            {...register("phone")}
            id="phone"
            type="tel"
            placeholder="(615) 555-0100"
          />
        </FormField>

        <FormField label="City" htmlFor="city" required error={errors.city?.message}>
          <Input
            {...register("city")}
            id="city"
            type="text"
            placeholder="Your city"
          />
        </FormField>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField label="County (Tennessee)" htmlFor="county" required error={errors.county?.message}>
          <Input
            {...register("county")}
            id="county"
            type="text"
            placeholder="Your county"
          />
        </FormField>

        <FormField label="Your Role / Relationship to Patient" htmlFor="role" required error={errors.role?.message}>
          <Select
            {...register("role")}
            id="role"
            options={roleOptions}
            placeholder="Select your role"
          />
        </FormField>
      </div>

      <FormField
        label="Equipment Needed"
        htmlFor="equipment_needed"
        required
        error={errors.equipment_needed?.message}
      >
        <Textarea
          {...register("equipment_needed")}
          id="equipment_needed"
          placeholder="Describe the equipment you need, including size or specifications if known"
        />
      </FormField>

      <FormField label="Urgency" htmlFor="urgency" required error={errors.urgency?.message} hint="Select based on medical necessity">
        <Select
          {...register("urgency")}
          id="urgency"
          options={urgencyOptions}
          placeholder="Select urgency level"
        />
      </FormField>

      <FormField label="Additional Notes" htmlFor="notes" error={errors.notes?.message}>
        <Textarea
          {...register("notes")}
          id="notes"
          placeholder="Any other details that may help us assist you"
        />
      </FormField>

      <FormField
        label="Tennessee Residency"
        htmlFor="tn_resident"
        required
        error={errors.tn_resident?.message}
      >
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            {...register("tn_resident")}
            id="tn_resident"
            type="checkbox"
            className="h-4 w-4 rounded-sm border border-border accent-primary-dark"
          />
          <span className="text-sm text-text-body">
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

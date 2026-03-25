"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";

import {
  forgotPasswordSchema,
  type ForgotPasswordInput,
} from "@/lib/validations/auth";
import { forgotPassword } from "@/actions/forgot-password";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { FormField } from "@/components/forms/form-field";

export function ForgotPasswordForm() {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    setError: setFieldError,
    formState: { errors },
  } = useForm<ForgotPasswordInput>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  async function onSubmit(data: ForgotPasswordInput) {
    setIsPending(true);
    setError(null);

    try {
      const result = await forgotPassword(data);

      if (!result.success) {
        if (result.fieldErrors) {
          for (const [field, messages] of Object.entries(result.fieldErrors)) {
            setFieldError(field as keyof ForgotPasswordInput, {
              message: messages[0],
            });
          }
        }
        setError(result.error ?? "Request failed. Please try again.");
        return;
      }

      setSuccess(true);
    } catch {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsPending(false);
    }
  }

  if (success) {
    return (
      <Card className="shadow-[var(--shadow-lg)]">
        <CardContent className="p-10 text-center">
          <h2 className="text-2xl font-bold mb-4">Check Your Email</h2>
          <p className="text-gray-600 mb-6">
            If an account exists with that email, we&apos;ve sent a password
            reset link. Please check your inbox.
          </p>
          <Link
            href="/login"
            className="text-primary-dark font-semibold hover:underline"
          >
            Back to Log In
          </Link>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-[var(--shadow-lg)]">
      <CardContent className="p-10">
        <h2 className="text-2xl font-bold text-center mb-2">
          Reset Your Password
        </h2>
        <p className="text-gray-600 text-center text-sm mb-6">
          Enter your email and we&apos;ll send you a link to reset your
          password.
        </p>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded px-4 py-3 mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <FormField label="Email" error={errors.email?.message} required>
            <Input
              type="email"
              placeholder="you@example.com"
              autoComplete="email"
              {...register("email")}
            />
          </FormField>

          <Button
            type="submit"
            variant="primary"
            className="w-full"
            disabled={isPending}
          >
            {isPending ? "Sending..." : "Send Reset Link"}
          </Button>
        </form>

        <div className="mt-6 text-center text-sm">
          <p>
            Remember your password?{" "}
            <Link
              href="/login"
              className="text-primary-dark font-semibold hover:underline"
            >
              Log in
            </Link>
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

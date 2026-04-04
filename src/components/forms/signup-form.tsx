"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { Eye, EyeOff, UserPlus, CheckCircle2, Loader2 } from "lucide-react";

import { signupSchema, type SignupInput } from "@/lib/validations/auth";
import { signup } from "@/actions/signup";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { FormField } from "@/components/forms/form-field";

export function SignupForm() {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    setError: setFieldError,
    formState: { errors },
  } = useForm<SignupInput>({
    resolver: zodResolver(signupSchema),
  });

  async function onSubmit(data: SignupInput) {
    setIsPending(true);
    setError(null);

    try {
      const result = await signup(data);

      if (!result.success) {
        if (result.fieldErrors) {
          for (const [field, messages] of Object.entries(result.fieldErrors)) {
            setFieldError(field as keyof SignupInput, {
              message: messages[0],
            });
          }
        }
        setError(result.error ?? "Sign up failed. Please try again.");
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
      <Card className="shadow-lg overflow-hidden">
        <div className="h-1 bg-gradient-to-r from-accent via-primary to-primary-dark rounded-t-[3px]" />
        <CardContent className="p-10 text-center animate-fade-in">
          <CheckCircle2 className="h-10 w-10 text-green-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-4">Check Your Email</h2>
          <p className="text-gray-600 mb-6">
            We&apos;ve sent a confirmation link to your email address. Please
            click the link to verify your account.
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
    <Card className="shadow-lg overflow-hidden">
      {/* Top gradient bar */}
      <div className="h-1 bg-gradient-to-r from-accent via-primary to-primary-dark rounded-t-[3px]" />
      <CardContent className="p-10">
        {/* Decorative icon */}
        <div className="flex justify-center mb-4">
          <div className="bg-primary-dark/10 rounded-full p-3">
            <UserPlus className="h-6 w-6 text-primary-dark" />
          </div>
        </div>
        <h2 className="font-display text-2xl font-bold text-center mb-6">
          Create Your Account
        </h2>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded px-4 py-3 mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <FormField label="Name" error={errors.name?.message} required>
            <Input
              type="text"
              placeholder="Your full name"
              autoComplete="name"
              {...register("name")}
            />
          </FormField>

          <FormField label="Email" error={errors.email?.message} required>
            <Input
              type="email"
              placeholder="you@example.com"
              autoComplete="email"
              {...register("email")}
            />
          </FormField>

          <FormField label="Password" error={errors.password?.message} required>
            <div className="relative">
              <input
                {...register("password")}
                type={showPassword ? "text" : "password"}
                id="password"
                autoComplete="new-password"
                className="w-full rounded-sm border border-border px-3 py-2.5 text-sm focus:border-primary-dark focus:outline-none pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-text-light hover:text-text-body transition-colors"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </FormField>

          <FormField
            label="Confirm Password"
            error={errors.confirmPassword?.message}
            required
          >
            <div className="relative">
              <input
                {...register("confirmPassword")}
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                autoComplete="new-password"
                className="w-full rounded-sm border border-border px-3 py-2.5 text-sm focus:border-primary-dark focus:outline-none pr-10"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-text-light hover:text-text-body transition-colors"
                aria-label={showConfirmPassword ? "Hide password" : "Show password"}
              >
                {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </FormField>

          <Button
            type="submit"
            variant="primary"
            className="w-full"
            disabled={isPending}
          >
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating account...
              </>
            ) : (
              "Create Account"
            )}
          </Button>
        </form>

        <p className="mt-4 text-xs text-gray-500 text-center">
          With an account you can view real-time inventory, save your
          preferences, and get notified when items you need become available.
        </p>

        <div className="mt-6 text-center text-sm">
          <p>
            Already have an account?{" "}
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

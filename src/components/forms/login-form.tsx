"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Eye, EyeOff, Lock } from "lucide-react";

import { loginSchema, type LoginInput } from "@/lib/validations/auth";
import { login } from "@/actions/login";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { FormField } from "@/components/forms/form-field";

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect") ?? "/portal";

  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    setError: setFieldError,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });

  async function onSubmit(data: LoginInput) {
    setIsPending(true);
    setError(null);

    try {
      const result = await login(data);

      if (!result.success) {
        if (result.fieldErrors) {
          for (const [field, messages] of Object.entries(result.fieldErrors)) {
            setFieldError(field as keyof LoginInput, {
              message: messages[0],
            });
          }
        }
        setError(result.error ?? "Login failed. Please try again.");
        return;
      }

      router.push(redirectTo);
    } catch {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsPending(false);
    }
  }

  return (
    <Card className="shadow-lg overflow-hidden">
      {/* Top gradient bar */}
      <div className="h-1 bg-gradient-to-r from-accent via-primary to-primary-dark rounded-t-[3px]" />
      <CardContent className="p-10">
        {/* Decorative lock icon */}
        <div className="flex justify-center mb-4">
          <div className="bg-primary-dark/10 rounded-full p-3">
            <Lock className="h-6 w-6 text-primary-dark" />
          </div>
        </div>
        <h2 className="font-display text-2xl font-bold text-center mb-6">Welcome Back</h2>

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

          <FormField label="Password" error={errors.password?.message} required>
            <div className="relative">
              <input
                {...register("password")}
                type={showPassword ? "text" : "password"}
                id="password"
                autoComplete="current-password"
                className="w-full rounded-[3px] border border-[#E5E5E5] px-3 py-2.5 text-sm focus:border-primary-dark focus:outline-none pr-10"
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

          <Button
            type="submit"
            variant="primary"
            className="w-full"
            disabled={isPending}
          >
            {isPending ? "Logging in..." : "Log In"}
          </Button>
        </form>

        <div className="mt-6 text-center text-sm space-y-2">
          <p>
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="text-primary-dark font-semibold hover:underline">
              Sign up
            </Link>
          </p>
          <p>
            <Link href="/forgot-password" className="text-primary-dark font-semibold hover:underline">
              Forgot your password?
            </Link>
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

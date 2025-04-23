"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { motion } from "motion/react";
import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createClient } from "@/utils/supabase/client";
import { AuthError } from "@supabase/supabase-js";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type AuthAction = "signin" | "signup" | "reset-password";

interface AuthFormProps {
  action: AuthAction;
}

const AuthForm: React.FC<AuthFormProps> = ({ action }) => {
  const supabase = createClient();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAuth: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    if (!email?.trim()) {
      setError("Email is required");
      return;
    }

    if (action !== "reset-password" && !password?.trim()) {
      setError("Password is required");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      switch (action) {
        case "signup":
          const { error: signInError } = await supabase.auth.signInWithPassword(
            {
              email,
              password,
            },
          );

          if (
            signInError &&
            signInError.message.includes("Invalid login credentials")
          ) {
            const { error: signUpError } = await supabase.auth.signUp({
              email,
              password,
            });

            if (signUpError) throw signUpError;

            toast.success("Account created successfully!");
            router.push("/dashboard");
          } else if (signInError) {
            throw signInError;
          }
          break;

        case "signin":
          const { error: loginError } = await supabase.auth.signInWithPassword({
            email,
            password,
          });

          if (loginError) throw loginError;

          toast.success("Signed in successfully!");
          router.push("/dashboard");
          break;

        case "reset-password":
          const { error: resetError } =
            await supabase.auth.resetPasswordForEmail(email);

          if (resetError) throw resetError;

          toast.success("Password reset email sent!");
          router.push("/auth/check-email?action=reset-password");
          break;

        default:
          throw new Error("Invalid authentication action");
      }
    } catch (error) {
      if (error instanceof AuthError) {
        setError(error.message);
        toast.error(error.message);
      } else {
        setError("An unexpected error occurred. Please try again.");
        toast.error("An unexpected error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] grid place-items-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm"
      >
        <Card className="w-full border-none shadow-lg">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-semibold tracking-tight text-center">
              {action === "signin"
                ? "Welcome back"
                : action === "signup"
                  ? "Create account"
                  : "Reset password"}
            </CardTitle>
            <CardDescription className="text-center text-sm text-muted-foreground">
              {action === "signin"
                ? "Enter your credentials to continue"
                : action === "signup"
                  ? "Enter your details to get started"
                  : "Enter your email to reset your password"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAuth} className="space-y-3">
              <div className="space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="h-9"
                />
              </div>
              {action !== "reset-password" && (
                <div className="space-y-1.5">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      placeholder={
                        showPassword ? "Password123." : "●●●●●●●●●●●●"
                      }
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      minLength={8}
                      className="h-9"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>
              )}
              {action === "signin" && (
                <Link href="/auth/reset-password" passHref>
                  <Button
                    type="button"
                    className="w-full text-xs"
                    variant="link"
                  >
                    Forgot password?
                  </Button>
                </Link>
              )}
              <div className="pt-2">
                <Button type="submit" className="w-full h-9" disabled={loading}>
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Please wait
                    </>
                  ) : action === "signin" ? (
                    "Sign In"
                  ) : action === "signup" ? (
                    "Sign Up"
                  ) : (
                    "Reset Password"
                  )}
                </Button>
              </div>
            </form>

            {error && (
              <div
                className="mt-3 rounded-md bg-destructive/10 p-3 text-sm text-destructive"
                role="alert"
              >
                {error}
              </div>
            )}
          </CardContent>
          <CardFooter>
            <div className="w-full text-center text-sm">
              <span className="text-muted-foreground">
                {action === "signin"
                  ? "Don't have an account?"
                  : "Already have an account?"}{" "}
              </span>
              <Link
                href={`/auth/${action === "signin" ? "sign-up" : "sign-in"}`}
                passHref
              >
                <Button variant="link" className="h-auto p-0 text-sm">
                  {action === "signin" ? "Sign up" : "Sign in"}
                </Button>
              </Link>
            </div>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
};

export default AuthForm;

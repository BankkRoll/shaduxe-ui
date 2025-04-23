"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React, { Suspense } from "react";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "motion/react";
import { useSearchParams } from "next/navigation";

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  in: { opacity: 1, y: 0 },
  out: { opacity: 0, y: -20 },
};

const pageTransition = {
  type: "tween",
  ease: "anticipate",
  duration: 0.5,
};

const CheckEmailContent = () => {
  const searchParams = useSearchParams();
  const action = searchParams.get("action");

  return (
    <motion.div
      key={action}
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
      className="container m-auto flex h-[75svh] items-center justify-center p-4"
    >
      <Card className="m-auto max-w-md justify-center">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold">
            Check Your Email
          </CardTitle>
          <CardDescription className="text-center">
            We have sent you a password reset email. Please check your inbox and
            follow the instructions to reset your password.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center">
          <Link href="/auth/signin" passHref>
            <Button>Return to Sign In</Button>
          </Link>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default function CheckEmailPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CheckEmailContent />
    </Suspense>
  );
}

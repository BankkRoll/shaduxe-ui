"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AlertCircle, Home, ShoppingCart } from "lucide-react";
import Link from "next/link";

export default function StripeErrorPage() {
  return (
    <div className="container flex items-center justify-center min-h-[calc(100vh-10rem)] py-12 px-4">
      <Card className="w-full max-w-md mx-auto border border-destructive/20 shadow-sm">
        <CardHeader className="text-center space-y-3 pb-4">
          <div className="mx-auto h-16 w-16 rounded-full bg-destructive/10 flex items-center justify-center">
            <AlertCircle className="h-8 w-8 text-destructive" />
          </div>
          <div>
            <CardTitle className="text-2xl font-bold">
              Payment Unsuccessful
            </CardTitle>
            <CardDescription className="text-base mt-1">
              There was a problem with your payment
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="space-y-6 pb-6">
          <div className="text-sm text-center space-y-4">
            <p>Your payment could not be processed. This could be due to:</p>
            <ul className="list-disc text-left pl-8 space-y-1.5">
              <li>Insufficient funds in your account</li>
              <li>Card declined by your bank</li>
              <li>Incorrect payment information</li>
              <li>Network or connection issues</li>
            </ul>
            <p className="mt-4">
              No charges have been made to your account. You can try again with
              a different payment method.
            </p>
          </div>
        </CardContent>

        <CardFooter className="flex flex-col space-y-3 pt-2">
          <Link href="/pricing" passHref className="w-full">
            <Button className="w-full">
              <ShoppingCart className="h-4 w-4 mr-2" />
              Try Again
            </Button>
          </Link>

          <Link href="/" passHref className="w-full">
            <Button variant="outline" className="w-full">
              <Home className="h-4 w-4 mr-2" />
              Return to Home
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}

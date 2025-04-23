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
import { useRouter } from "next/navigation";

export default function StripeErrorPage() {
  const router = useRouter();

  return (
    <div className="container min-h-screen justify-center max-w-md mx-auto py-12">
      <Card className="border-destructive/20">
        <CardHeader className="text-center pb-2">
          <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-destructive/10 flex items-center justify-center">
            <AlertCircle className="h-6 w-6 text-destructive" />
          </div>
          <CardTitle className="text-xl">Payment Unsuccessful</CardTitle>
          <CardDescription>
            There was a problem with your payment
          </CardDescription>
        </CardHeader>
        <CardContent className="pb-2">
          <div className="space-y-4">
            <div className="text-sm text-muted-foreground">
              <p>Your payment could not be processed. This could be due to:</p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>Insufficient funds in your account</li>
                <li>Card declined by your bank</li>
                <li>Incorrect payment information</li>
                <li>Network or connection issues</li>
              </ul>
              <p className="mt-4">
                No charges have been made to your account. You can try again
                with a different payment method.
              </p>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <Button onClick={() => router.push("/pricing")} className="w-full">
            <ShoppingCart className="h-4 w-4 mr-2" />
            Try Again
          </Button>

          <Button
            variant="outline"
            onClick={() => router.push("/")}
            className="w-full"
          >
            <Home className="h-4 w-4 mr-2" />
            Return to Home
          </Button>

          <div className="text-xs text-center text-muted-foreground pt-2">
            If you continue to experience issues, please contact our support
            team at support@shaduxe-ui.com
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}

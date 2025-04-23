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
import { createClient } from "@/utils/supabase/client";
import { CheckCircle2, ChevronLeft, FileText, Home } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function StripeSuccessPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [purchaseData, setPurchaseData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const router = useRouter();
  const supabase = createClient();

  const sessionId = searchParams.get("session_id");

  useEffect(() => {
    if (!sessionId) {
      setError("Missing session ID");
      setIsLoading(false);
      return;
    }

    async function fetchSession() {
      try {
        const response = await fetch(
          `/api/stripe/checkout-session?session_id=${sessionId}`,
        );
        if (!response.ok) {
          throw new Error("Failed to fetch session data");
        }
        const data = await response.json();
        setPurchaseData(data);
      } catch (err) {
        console.error("Error fetching session:", err);
        setError("Failed to load purchase information");
      } finally {
        setIsLoading(false);
      }
    }

    fetchSession();
  }, [sessionId]);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mb-4"></div>
        <p className="text-muted-foreground">Confirming your purchase...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container max-w-md mx-auto py-12">
        <Card>
          <CardHeader>
            <CardTitle>Something went wrong</CardTitle>
            <CardDescription>We couldn't confirm your purchase</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">{error}</p>
          </CardContent>
          <CardFooter className="flex gap-2">
            <Button onClick={() => router.push("/")}>
              <Home className="h-4 w-4 mr-2" />
              Return home
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  const isPaidUser = purchaseData?.product_type === "lifetime";
  const isSingleTemplate =
    purchaseData?.product_type === "template" && purchaseData?.product_id;

  return (
    <div className="container min-h-screen justify-center max-w-md mx-auto py-12">
      <Card className="border-primary/20">
        <CardHeader className="text-center pb-2">
          <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
            <CheckCircle2 className="h-6 w-6 text-primary" />
          </div>
          <CardTitle className="text-xl">
            Thank you for your purchase!
          </CardTitle>
          <CardDescription>Your transaction was successful</CardDescription>
        </CardHeader>
        <CardContent className="pb-2">
          <div className="space-y-4">
            <div className="border rounded-lg p-4 bg-muted/5">
              <h3 className="text-sm font-medium mb-2">Purchase Details</h3>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="text-muted-foreground">Date:</div>
                <div>
                  {new Date(purchaseData?.purchase_date).toLocaleDateString()}
                </div>
                <div className="text-muted-foreground">Amount:</div>
                <div>${purchaseData?.amount_paid.toFixed(2)}</div>
                <div className="text-muted-foreground">Type:</div>
                <div>
                  {isPaidUser
                    ? "Lifetime Access"
                    : isSingleTemplate
                      ? "Single Template"
                      : "Purchase"}
                </div>
                {isSingleTemplate && (
                  <>
                    <div className="text-muted-foreground">Template:</div>
                    <div>{purchaseData?.product_id}</div>
                  </>
                )}
              </div>
            </div>

            <div className="text-sm text-muted-foreground">
              <p>
                {isPaidUser
                  ? "You now have lifetime access to all templates and components!"
                  : isSingleTemplate
                    ? `You now have access to the ${purchaseData?.product_id} template!`
                    : "Thank you for your purchase!"}
              </p>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          {isPaidUser ? (
            <Button
              onClick={() => router.push("/templates")}
              className="w-full"
            >
              <FileText className="h-4 w-4 mr-2" />
              Explore Templates
            </Button>
          ) : isSingleTemplate ? (
            <Button
              onClick={() =>
                router.push(`/templates/${purchaseData?.product_id}`)
              }
              className="w-full"
            >
              <FileText className="h-4 w-4 mr-2" />
              View Template
            </Button>
          ) : (
            <Button onClick={() => router.push("/")} className="w-full">
              <Home className="h-4 w-4 mr-2" />
              Return Home
            </Button>
          )}

          <Button
            variant="outline"
            onClick={() => router.push("/")}
            className="w-full"
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

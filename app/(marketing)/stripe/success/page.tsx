"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CheckCircle2, ChevronLeft, FileText, Home, Users } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

export default function StripeSuccessPage() {
  return (
    <div className="container flex items-center justify-center min-h-[calc(100vh-10rem)] py-12 px-4">
      <Suspense fallback={<LoadingUI />}>
        <StripeSuccessContent />
      </Suspense>
    </div>
  );
}

function LoadingUI() {
  return (
    <div className="container min-h-screen py-10 space-y-10 max-w-6xl mx-auto">
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <div className="w-8 h-8 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
        <p className="mt-4 text-muted-foreground">Processing...</p>
      </div>
    </div>
  );
}

function StripeSuccessContent() {
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const [purchaseData, setPurchaseData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [errorDetails, setErrorDetails] = useState<string | null>(null);

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
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          },
        );

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Failed to fetch session data");
        }

        const data = await response.json();
        console.log("Purchase data:", data);
        setPurchaseData(data);
      } catch (err) {
        console.error("Error fetching session:", err);
        setError("Failed to load purchase information");
        setErrorDetails((err as Error).message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchSession();
  }, [sessionId]);

  if (isLoading) {
    return (
      <div className="container min-h-screen py-10 space-y-10 max-w-6xl mx-auto">
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
          <div className="w-8 h-8 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
          <p className="mt-4 text-muted-foreground">
            Confirming your purchase...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <Card className="w-full max-w-md mx-auto border border-destructive/20">
        <CardHeader className="text-center">
          <CardTitle>Something went wrong</CardTitle>
          <CardDescription>We couldn't confirm your purchase</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-center mb-2">{error}</p>
          {errorDetails && (
            <p className="text-xs text-destructive/70 text-center">
              {errorDetails}
            </p>
          )}
          <div className="mt-4 p-3 bg-muted/30 rounded-lg text-sm">
            <p>You can try:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Refreshing this page</li>
              <li>Checking your email for purchase confirmation</li>
              <li>Contacting support if you were charged</li>
            </ul>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center gap-3">
          <Link href="/pricing" passHref>
            <Button variant="outline">
              <ChevronLeft className="h-4 w-4 mr-2" />
              Back to pricing
            </Button>
          </Link>
          <Link href="/" passHref>
            <Button>
              <Home className="h-4 w-4 mr-2" />
              Home
            </Button>
          </Link>
        </CardFooter>
      </Card>
    );
  }

  const isPaidUser = purchaseData?.product_type === "lifetime";
  const isSingleTemplate =
    purchaseData?.product_type === "template" && purchaseData?.product_id;
  const isTeamLicense = isPaidUser && purchaseData?.license_type === "team";

  return (
    <Card className="w-full max-w-md mx-auto border border-primary/20 shadow-sm">
      <CardHeader className="text-center space-y-3 pb-4">
        <div className="mx-auto h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
          <CheckCircle2 className="h-8 w-8 text-primary" />
        </div>
        <div>
          <CardTitle className="text-2xl font-bold">
            Thank you for your purchase!
          </CardTitle>
          <CardDescription className="text-base mt-1">
            Your transaction was successful
          </CardDescription>
        </div>
      </CardHeader>

      <CardContent className="space-y-6 pb-6">
        <div className="rounded-lg border bg-muted/5 p-4">
          <h3 className="text-sm font-medium mb-3">Purchase Details</h3>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="text-muted-foreground">Date:</div>
            <div className="font-medium">
              {new Date(purchaseData?.purchase_date).toLocaleDateString()}
            </div>
            <div className="text-muted-foreground">Amount:</div>
            <div className="font-medium">
              ${purchaseData?.amount_paid.toFixed(2)}
            </div>
            <div className="text-muted-foreground">Type:</div>
            <div className="font-medium">
              {isPaidUser
                ? isTeamLicense
                  ? "Team License"
                  : "Personal License"
                : isSingleTemplate
                  ? "Single Template"
                  : "Purchase"}
            </div>
            {isTeamLicense && purchaseData?.team_license && (
              <>
                <div className="text-muted-foreground">Seats:</div>
                <div className="font-medium flex items-center">
                  <Users className="h-3.5 w-3.5 mr-1.5 text-muted-foreground" />
                  <span>
                    {purchaseData.team_license.max_seats} team members
                  </span>
                </div>
              </>
            )}
            {isSingleTemplate && (
              <>
                <div className="text-muted-foreground">Template:</div>
                <div className="font-medium">
                  {purchaseData?.template?.name || purchaseData?.product_id}
                </div>
              </>
            )}
            <div className="text-muted-foreground">Status:</div>
            <div className="font-medium">
              <Badge
                variant="outline"
                className="bg-green-50 text-green-700 border-green-200"
              >
                Active
              </Badge>
            </div>
          </div>
        </div>

        <div className="text-sm text-center text-muted-foreground">
          <p>
            {isPaidUser
              ? isTeamLicense
                ? "You now have TEAM lifetime access to shaduxe/ui with up to " +
                  purchaseData?.team_license?.max_seats +
                  " team members!"
                : "You now have PRO lifetime access to shaduxe/ui!"
              : isSingleTemplate
                ? `You now have access to the ${purchaseData?.template?.name || purchaseData?.product_id} template!`
                : "Thank you for your purchase!"}
          </p>
        </div>
      </CardContent>

      <CardFooter className="flex flex-col space-y-3 pt-2">
        {isPaidUser ? (
          <Link href="/docs/templates" passHref className="w-full">
            <Button className="w-full">
              <FileText className="h-4 w-4 mr-2" />
              Explore Templates
            </Button>
          </Link>
        ) : isSingleTemplate ? (
          <Link
            href={`/docs/templates/${purchaseData?.product_id}`}
            passHref
            className="w-full"
          >
            <Button className="w-full">
              <FileText className="h-4 w-4 mr-2" />
              View Template
            </Button>
          </Link>
        ) : (
          <Link href="/" passHref className="w-full">
            <Button className="w-full">
              <Home className="h-4 w-4 mr-2" />
              Return Home
            </Button>
          </Link>
        )}

        {isTeamLicense && (
          <Link href="/dashboard" passHref className="w-full">
            <Button variant="outline" className="w-full">
              <Users className="h-4 w-4 mr-2" />
              Manage Team
            </Button>
          </Link>
        )}

        <Link href="/" passHref className="w-full">
          <Button variant="outline" className="w-full">
            <ChevronLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}

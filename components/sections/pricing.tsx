"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SectionTitle } from "@/components/ui/section-title";
import { Separator } from "@/components/ui/separator";
import pricingConfig, { calculateSavings } from "@/config/pricing";
import { createClient } from "@/utils/supabase/client";
import { Check, Loader2, Sparkles, Users } from "lucide-react";
import { motion, useInView } from "motion/react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

export default function PricingSection() {
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasLifetimeAccess, setHasLifetimeAccess] = useState(false);
  const [licenseType, setLicenseType] = useState<"personal" | "team" | null>(
    null,
  );
  const router = useRouter();
  const supabase = createClient();

  // Animation refs
  const sectionRef = useRef<HTMLDivElement>(null);
  const personalCardRef = useRef<HTMLDivElement>(null);
  const teamCardRef = useRef<HTMLDivElement>(null);
  const valuePropositionRef = useRef<HTMLDivElement>(null);
  const faqsRef = useRef<HTMLDivElement>(null);

  // InView states
  const isSectionInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const isValuePropositionInView = useInView(valuePropositionRef, {
    once: true,
    amount: 0.3,
  });
  const isFaqsInView = useInView(faqsRef, { once: true, amount: 0.3 });

  useEffect(() => {
    async function getData() {
      const {
        data: { user: currentUser },
      } = await supabase.auth.getUser();
      setUser(currentUser);

      if (currentUser) {
        const { data: profile } = await supabase
          .from("user_profiles")
          .select("has_lifetime_access")
          .eq("user_id", currentUser.id)
          .single();

        setHasLifetimeAccess(!!profile?.has_lifetime_access);
      }
    }
    getData();
  }, [supabase]);

  const handlePurchase = async (type: "personal" | "team") => {
    if (!user) {
      router.push("/auth/sign-in");
      return;
    }

    try {
      setIsLoading(true);
      setLicenseType(type);

      const response = await fetch("/api/stripe/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user,
          productType: "lifetime",
          licenseType: type,
          price:
            type === "personal"
              ? pricingConfig.pricing.personal.basePrice
              : pricingConfig.pricing.team.basePrice,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to create checkout session");
      }

      const { url } = await response.json();
      window.location.href = url;
    } catch (error) {
      console.error("Error creating checkout session:", error);
      toast.error("Failed to initiate purchase. Please try again.");
    } finally {
      setIsLoading(false);
      setLicenseType(null);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="w-full py-12 md:py-16 lg:py-20" ref={sectionRef}>
      <div className="px-4 md:px-6">
        <div className="text-center mb-10 mx-auto">
          <SectionTitle
            title="Simple, Transparent Pricing"
            description="One-time payment, lifetime access to PRO features. No subscriptions, no hidden fees."
            delay={0}
          />
        </div>

        <motion.div
          className="flex flex-col lg:flex-row justify-center w-full max-w-7xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate={isSectionInView ? "visible" : "hidden"}
        >
          {/* Personal License Card */}
          <motion.div
            className="w-full lg:w-2/3 p-0.5 rounded-t-2xl lg:rounded-l-2xl lg:rounded-tr-none"
            variants={itemVariants}
            ref={personalCardRef}
          >
            <div className="h-full rounded-t-2xl lg:rounded-l-2xl lg:rounded-tr-none border border-border bg-primary/10 relative">
              <div className="p-6 md:p-8 flex flex-col h-full">
                <motion.div
                  className="flex justify-between items-start mb-6"
                  variants={itemVariants}
                >
                  <div>
                    <h3 className="text-2xl font-bold">
                      {pricingConfig.pricing.personal.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      For individual developers & freelancers
                    </p>
                  </div>
                  <Badge
                    variant="default"
                    className="hover:bg-primary text-xs whitespace-nowrap"
                  >
                    <Sparkles className="h-3 w-3 mr-1" />
                    POPULAR
                  </Badge>
                </motion.div>

                <motion.div
                  className="flex items-baseline gap-2 mb-6"
                  variants={itemVariants}
                >
                  <span className="text-3xl font-bold tracking-tight">
                    $
                    {(pricingConfig.pricing.personal.basePrice / 100).toFixed(
                      2,
                    )}
                  </span>
                  <span className="text-muted-foreground line-through">
                    $
                    {(
                      pricingConfig.pricing.personal.originalPrice / 100
                    ).toFixed(2)}
                  </span>
                  <Badge
                    variant="outline"
                    className="bg-muted hover:bg-muted text-xs rounded-full  whitespace-nowrap"
                  >
                    Save{" "}
                    {calculateSavings(
                      pricingConfig.pricing.personal.basePrice,
                      pricingConfig.pricing.personal.originalPrice,
                    )}
                    %
                  </Badge>
                </motion.div>

                <motion.div
                  className="grid gap-3 flex-grow"
                  variants={itemVariants}
                >
                  {pricingConfig.pricing.personal.features.map((feature, i) => (
                    <motion.div
                      key={i}
                      className="flex items-start gap-3"
                      variants={itemVariants}
                      custom={i}
                      transition={{ delay: 0.1 + i * 0.05 }}
                    >
                      <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="h-3 w-3 text-primary" />
                      </div>
                      <p className="text-sm text-muted-foreground">{feature}</p>
                    </motion.div>
                  ))}
                </motion.div>

                <motion.div className="mt-8" variants={itemVariants}>
                  {hasLifetimeAccess ? (
                    <Button
                      className="w-full cursor-not-allowed"
                      variant="outline"
                      disabled
                    >
                      <Check className="h-4 w-4 mr-2" />
                      You have lifetime access
                    </Button>
                  ) : (
                    <Button
                      onClick={() => handlePurchase("personal")}
                      className="w-full cursor-pointer"
                      disabled={isLoading}
                    >
                      {isLoading && licenseType === "personal" ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          Processing...
                        </>
                      ) : (
                        "Get Personal License" +
                        " $" +
                        pricingConfig.pricing.personal.basePrice / 100
                      )}
                    </Button>
                  )}
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Team License Card */}
          <motion.div
            className="w-full lg:w-1/3 p-0.5 rounded-b-2xl lg:rounded-r-2xl lg:rounded-bl-none"
            variants={itemVariants}
            ref={teamCardRef}
            transition={{ delay: 0.2 }}
          >
            <div className="h-full rounded-b-2xl lg:rounded-r-2xl lg:rounded-bl-none border border-border bg-primary/5 relative lg:border-l-0">
              <div className="p-6 md:p-8 flex flex-col h-full">
                <motion.div
                  className="flex justify-between items-start mb-6"
                  variants={itemVariants}
                >
                  <div>
                    <h3 className="text-2xl font-bold">
                      {pricingConfig.pricing.team.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      For teams & businesses
                    </p>
                  </div>
                  <Badge variant="secondary" className="hover:bg-secondary">
                    <Users className="h-3 w-3 mr-1" />
                    TEAMS
                  </Badge>
                </motion.div>

                <motion.div
                  className="flex items-baseline gap-2 mb-6"
                  variants={itemVariants}
                >
                  <span className="text-3xl font-bold tracking-tight">
                    ${(pricingConfig.pricing.team.basePrice / 100).toFixed(2)}
                  </span>
                  <span className="text-muted-foreground line-through">
                    $
                    {(pricingConfig.pricing.team.originalPrice / 100).toFixed(
                      2,
                    )}
                  </span>
                  <Badge
                    variant="outline"
                    className="bg-secondary hover:bg-secondary text-xs rounded-full  whitespace-nowrap"
                  >
                    Save{" "}
                    {calculateSavings(
                      pricingConfig.pricing.team.basePrice,
                      pricingConfig.pricing.team.originalPrice,
                    )}
                    %
                  </Badge>
                </motion.div>

                <motion.div className="grid gap-3" variants={itemVariants}>
                  {pricingConfig.pricing.team.additionalFeatures.map(
                    (feature, i) => (
                      <motion.div
                        key={i}
                        className="flex items-start gap-3"
                        variants={itemVariants}
                        custom={i}
                        transition={{ delay: 0.3 + i * 0.05 }}
                      >
                        <div className="h-5 w-5 rounded-full bg-muted/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check className="h-3 w-3" />
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {feature}
                        </p>
                      </motion.div>
                    ),
                  )}
                </motion.div>

                <div className="flex-grow"></div>

                <motion.div className="mt-8" variants={itemVariants}>
                  {hasLifetimeAccess ? (
                    <Button
                      className="w-full cursor-not-allowed"
                      variant="outline"
                      disabled
                    >
                      <Check className="h-4 w-4 mr-2" />
                      You have lifetime access
                    </Button>
                  ) : (
                    <Button
                      onClick={() => handlePurchase("team")}
                      className="w-full cursor-pointer"
                      variant="outline"
                      disabled={isLoading}
                    >
                      {isLoading && licenseType === "team" ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          Processing...
                        </>
                      ) : (
                        "Get Team License" +
                        " $" +
                        pricingConfig.pricing.team.basePrice / 100
                      )}
                    </Button>
                  )}
                </motion.div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          className="text-center text-[12px] text-muted-foreground mt-4"
          variants={itemVariants}
          initial={{ opacity: 0, y: 20 }}
          animate={
            isSectionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
          }
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          Expected 5+ templates price will rise each template release +$14
          untill recahing $169 and team will follow same pattern.
        </motion.div>

        {/* Value Proposition */}
        <motion.div
          className="mt-12 max-w-3xl mx-auto"
          ref={valuePropositionRef}
          initial={{ opacity: 0, y: 30 }}
          animate={
            isValuePropositionInView
              ? { opacity: 1, y: 0 }
              : { opacity: 0, y: 30 }
          }
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="rounded-xl border border-border bg-gradient-to-b from-background to-background/80 backdrop-blur-sm overflow-hidden p-6">
            <div className="absolute inset-px bg-gradient-to-b from-primary/10 to-primary/5 rounded-xl pointer-events-none" />

            <motion.div
              className="text-center mb-6"
              initial={{ opacity: 0, y: 10 }}
              animate={
                isValuePropositionInView
                  ? { opacity: 1, y: 0 }
                  : { opacity: 0, y: 10 }
              }
              transition={{ duration: 0.4, delay: 0.3 }}
            >
              <h4 className="text-lg font-semibold mb-1">
                Why Our Pricing Makes Sense
              </h4>
              <p className="text-sm text-muted-foreground">
                Get all current and future templates at a fraction of the cost
              </p>
            </motion.div>

            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
              initial={{ opacity: 0 }}
              animate={
                isValuePropositionInView ? { opacity: 1 } : { opacity: 0 }
              }
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <motion.div
                className="space-y-1 text-center"
                initial={{ opacity: 0, y: 15 }}
                animate={
                  isValuePropositionInView
                    ? { opacity: 1, y: 0 }
                    : { opacity: 0, y: 15 }
                }
                transition={{ duration: 0.4, delay: 0.4 }}
              >
                <p className="text-2xl font-bold">
                  $
                  {(pricingConfig.stats.averageTemplateMinPrice / 100).toFixed(
                    2,
                  )}{" "}
                  - $
                  {(pricingConfig.stats.averageTemplateMaxPrice / 100).toFixed(
                    2,
                  )}
                </p>
                <p className="text-xs text-muted-foreground">
                  Per template normally
                </p>
              </motion.div>
              <motion.div
                className="space-y-1 text-center"
                initial={{ opacity: 0, y: 15 }}
                animate={
                  isValuePropositionInView
                    ? { opacity: 1, y: 0 }
                    : { opacity: 0, y: 15 }
                }
                transition={{ duration: 0.4, delay: 0.5 }}
              >
                <p className="text-2xl font-bold">
                  ${(pricingConfig.stats.totalValue / 100).toFixed(2)}+
                </p>
                <p className="text-xs text-muted-foreground">Total value</p>
              </motion.div>
              <motion.div
                className="space-y-1 text-center col-span-1 sm:col-span-2 md:col-span-1"
                initial={{ opacity: 0, y: 15 }}
                animate={
                  isValuePropositionInView
                    ? { opacity: 1, y: 0 }
                    : { opacity: 0, y: 15 }
                }
                transition={{ duration: 0.4, delay: 0.6 }}
              >
                <p className="text-2xl font-bold text-primary">
                  ${(pricingConfig.pricing.personal.basePrice / 100).toFixed(2)}
                </p>
                <p className="text-xs text-muted-foreground">
                  Your price today
                </p>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

        {/* FAQs */}
        <motion.div
          className="mt-12 max-w-3xl mx-auto"
          ref={faqsRef}
          initial={{ opacity: 0, y: 30 }}
          animate={isFaqsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Separator className="mb-8" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              className="space-y-2"
              initial={{ opacity: 0, x: -20 }}
              animate={
                isFaqsInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }
              }
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <h4 className="font-semibold">What's included in the license?</h4>
              <p className="text-sm text-muted-foreground">
                Both licenses include all current templates and sections, plus
                all future additions at no extra cost. Use them in unlimited
                projects. Minimum 5 templates planned and included.
              </p>
            </motion.div>
            <motion.div
              className="space-y-2"
              initial={{ opacity: 0, x: 20 }}
              animate={
                isFaqsInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }
              }
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <h4 className="font-semibold">
                What's the difference between licenses?
              </h4>
              <p className="text-sm text-muted-foreground">
                Personal license is for individual use. Team license includes
                distribution rights for up to 20 developers and priority
                support.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

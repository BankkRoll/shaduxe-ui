import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Check, X } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface Feature {
  name: string;
  included: boolean;
}

interface Plan {
  name: string;
  price: string;
  description: string;
  features: Feature[];
  ctaLabel: string;
  isPrimary: boolean;
}

export default function PricingSection() {
  const plans: Plan[] = [
    {
      name: "Basic",
      price: "$9",
      description: "All the basics for starting a new business",
      features: [
        { name: "5 products", included: true },
        { name: "Basic analytics", included: true },
        { name: "48-hour support response time", included: true },
        { name: "Advanced analytics", included: false },
        { name: "Custom reporting", included: false },
      ],
      ctaLabel: "Get Started",
      isPrimary: false,
    },
    {
      name: "Pro",
      price: "$29",
      description: "Everything you need for a growing business",
      features: [
        { name: "25 products", included: true },
        { name: "Advanced analytics", included: true },
        { name: "24-hour support response time", included: true },
        { name: "Custom reporting", included: true },
        { name: "API access", included: false },
      ],
      ctaLabel: "Get Started",
      isPrimary: true,
    },
    {
      name: "Enterprise",
      price: "Custom",
      description: "Advanced features for scaling your business",
      features: [
        { name: "Unlimited products", included: true },
        { name: "Advanced analytics", included: true },
        { name: "1-hour support response time", included: true },
        { name: "Custom reporting", included: true },
        { name: "API access", included: true },
      ],
      ctaLabel: "Contact Sales",
      isPrimary: false,
    },
  ];

  return (
    <section className="py-24 sm:py-32">
      <div className="container px-4 md:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Badge variant="secondary" className="mb-4">
              Pricing
            </Badge>
          </motion.div>
          <motion.h2
            className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Simple, Transparent Pricing
          </motion.h2>
          <motion.p
            className="mt-4 text-lg text-muted-foreground"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Choose the plan that's right for you and start optimizing your
            workflow today.
          </motion.p>
        </div>

        <motion.div
          className="mx-auto mt-16 flex max-w-6xl flex-col items-center justify-center gap-6 sm:mt-20 md:flex-row md:items-stretch md:gap-0"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {plans.map((plan, planIdx) => (
            <motion.div
              key={plan.name}
              className={`w-full max-w-sm md:w-1/3 ${
                planIdx === 1
                  ? "z-10 md:-mx-0"
                  : planIdx === 0
                    ? "md:mr-[-1px]"
                    : "md:ml-[-1px]"
              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * (planIdx + 4) }}
            >
              <Card
                className={`flex h-full flex-col justify-between rounded-3xl border-2 ${
                  planIdx === 1
                    ? "border-primary shadow-2xl md:scale-110"
                    : "border-border"
                }`}
              >
                <CardHeader className="p-6">
                  <CardTitle
                    className={`text-xl ${planIdx === 1 ? "text-primary" : ""}`}
                  >
                    {plan.name}
                  </CardTitle>
                  <div className="mt-4 flex items-baseline text-5xl font-extrabold">
                    {plan.price}
                    {plan.price !== "Custom" && (
                      <span className="ml-1 text-xl font-normal text-muted-foreground">
                        /month
                      </span>
                    )}
                  </div>
                  <p className="mt-4 text-sm text-muted-foreground">
                    {plan.description}
                  </p>
                </CardHeader>
                <CardContent className="flex-grow p-6">
                  <ul className="space-y-3">
                    {plan.features.map((feature) => (
                      <li key={feature.name} className="flex items-center">
                        {feature.included ? (
                          <Check className="h-5 w-5 flex-shrink-0 text-primary" />
                        ) : (
                          <X className="h-5 w-5 flex-shrink-0 text-muted-foreground" />
                        )}
                        <span
                          className={`ml-3 text-sm ${
                            feature.included
                              ? "text-foreground"
                              : "text-muted-foreground"
                          }`}
                        >
                          {feature.name}
                        </span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter className="p-6">
                  <Button
                    variant={planIdx === 1 ? "default" : "outline"}
                    className="w-full"
                    size="lg"
                  >
                    {plan.ctaLabel}
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

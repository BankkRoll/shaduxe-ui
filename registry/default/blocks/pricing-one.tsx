import { Check, Minus, MoveRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface Feature {
  name: string;
  tiers: (boolean | string)[];
}

interface Plan {
  name: string;
  price: string;
  description: string;
  features: Feature[];
  isPrimary: boolean;
  ctaLabel: string;
  ctaLink: string;
}

export default function PricingComponent() {
  const plans: Plan[] = [
    {
      name: "Starter",
      price: "Free",
      description: "Get started with essential features for small projects.",
      features: [
        { name: "Supabase Integration", tiers: [true, true, true] },
        { name: "Stripe Checkout", tiers: [true, true, true] },
        { name: "Custom Email Templates", tiers: [false, true, true] },
        { name: "24/7 Support", tiers: [false, false, true] },
      ],
      isPrimary: false,
      ctaLabel: "Learn More",
      ctaLink: "#",
    },
    {
      name: "Pro",
      price: "$19",
      description: "Advanced tools for growing businesses and teams.",
      features: [
        { name: "Supabase Integration", tiers: [true, true, true] },
        { name: "Stripe Checkout", tiers: [true, true, true] },
        { name: "Custom Email Templates", tiers: [true, true, true] },
        { name: "24/7 Support", tiers: [false, true, true] },
      ],
      isPrimary: true,
      ctaLabel: "Get Started",
      ctaLink: "#",
    },
    {
      name: "Enterprise",
      price: "Contact Us",
      description: "Custom solutions for enterprise-grade applications.",
      features: [
        { name: "Supabase Integration", tiers: [true, true, true] },
        { name: "Stripe Checkout", tiers: [true, true, true] },
        { name: "Custom Email Templates", tiers: [true, true, true] },
        { name: "24/7 Support", tiers: [true, true, true] },
      ],
      isPrimary: false,
      ctaLabel: "Contact Sales",
      ctaLink: "#",
    },
  ];

  return (
    <div className="w-full py-10 md:py-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center gap-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Badge>Launch Your Product</Badge>
          </motion.div>
          <motion.h2
            className="font-regular max-w-xl text-center text-3xl tracking-tighter md:text-5xl lg:text-7xl"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            No credit card required
          </motion.h2>
          <motion.p
            className="max-w-xl text-center text-base leading-relaxed tracking-tight text-gray-400 md:text-lg"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            Launch smarter, faster, and better with pre-integrated tools like
            Supabase, Stripe, Resend, and Framer Motion. Emerald empowers your
            SaaS journey with a modern, scalable architecture.
          </motion.p>
        </div>
        <motion.div
          className="mt-10 md:mt-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <div className="md:hidden">
            {plans.map((plan, index) => (
              <div key={index} className="mb-8 rounded-lg border p-6">
                <h3 className="text-2xl font-bold">{plan.name}</h3>
                <p className="mt-2 text-sm text-gray-400">{plan.description}</p>
                <div className="mt-4 flex items-baseline">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="ml-2 text-sm text-gray-400">
                    {plan.price === "Contact Us" ? "" : "/ month"}
                  </span>
                </div>
                <a href={plan.ctaLink}>
                  <Button
                    variant={plan.isPrimary ? "default" : "outline"}
                    className="mt-6 w-full justify-center gap-2 bg-white text-black hover:bg-gray-200"
                  >
                    {plan.ctaLabel} <MoveRight className="h-4 w-4" />
                  </Button>
                </a>
                <div className="mt-6">
                  <h4 className="mb-2 font-semibold">Features:</h4>
                  <ul className="space-y-2">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center">
                        {typeof feature.tiers[index] === "boolean" ? (
                          feature.tiers[index] ? (
                            <Check className="mr-2 h-5 w-5 text-green-500" />
                          ) : (
                            <Minus className="mr-2 h-5 w-5 text-gray-500" />
                          )
                        ) : (
                          <Check className="mr-2 h-5 w-5 text-green-500" />
                        )}
                        <span className="text-sm">
                          {feature.name}
                          {typeof feature.tiers[index] !== "boolean" && (
                            <span className="ml-1 text-gray-400">
                              ({feature.tiers[index]})
                            </span>
                          )}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          <div className="hidden md:block">
            <div className="grid grid-cols-4 gap-0 divide-x divide-gray-800">
              <div />
              {plans.map((plan, index) => (
                <div
                  key={index}
                  className="flex flex-col justify-between gap-4 p-6"
                >
                  <div>
                    <p className="text-2xl font-bold">{plan.name}</p>
                    <p className="mt-2 h-12 text-sm text-gray-400">
                      {plan.description}
                    </p>
                    <div className="mt-6 flex items-baseline">
                      <span className="text-4xl font-bold">{plan.price}</span>
                      <span className="ml-2 text-sm text-gray-400">
                        {plan.price === "Contact Us" ? "" : "/ month"}
                      </span>
                    </div>
                  </div>
                  <a href={plan.ctaLink}>
                    <Button
                      variant={plan.isPrimary ? "default" : "outline"}
                      className="mt-4 w-full justify-center gap-2"
                    >
                      {plan.ctaLabel} <MoveRight className="h-4 w-4" />
                    </Button>
                  </a>
                </div>
              ))}
            </div>
            <div className="mt-8 grid grid-cols-4 gap-0 divide-x divide-gray-800">
              {plans[0].features.map((feature, featureIndex) => (
                <>
                  <div
                    key={`feature-${featureIndex}`}
                    className="flex items-center p-4 font-medium"
                  >
                    {feature.name}
                  </div>
                  {feature.tiers.map((tier, tierIndex) => (
                    <div
                      key={`feature-tier-${featureIndex}-${tierIndex}`}
                      className="flex justify-center p-4"
                    >
                      {typeof tier === "boolean" ? (
                        tier ? (
                          <Check className="h-5 w-5 text-green-500" />
                        ) : (
                          <Minus className="h-5 w-5 text-gray-500" />
                        )
                      ) : (
                        <p className="text-sm text-gray-400">{tier}</p>
                      )}
                    </div>
                  ))}
                </>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

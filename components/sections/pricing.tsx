"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SectionTitle } from "@/components/ui/section-title";
import { Separator } from "@/components/ui/separator";
import { Check, Sparkles, Users } from "lucide-react";

export default function PricingSection() {
  const personalFeatures = [
    "5+ planned templates built with React, Next.js, and TailwindCSS",
    "Over 20+ sections to build beautiful landing pages",
    "Commercial usage for unlimited projects",
    "Perpetual license - own the templates forever",
    "Lifetime updates at no extra cost",
    "Source code with full customization rights",
    "Premium support and documentation",
  ];

  const teamFeatures = [
    "Everything in personal license",
    "20 developer licenses for your team",
  ];

  return (
    <section className="w-full py-12 md:py-16 lg:py-20 flex justify-center">
      <div className="container px-4 md:px-6 max-w-6xl">
        <div className="text-center mb-10">
          <SectionTitle
            title="Simple, Transparent Pricing"
            description="One-time payment, lifetime access. No subscriptions, no hidden fees."
          />
        </div>

        <div className="flex flex-col lg:flex-row justify-center max-w-6xl mx-auto">
          <div className="pricing-container flex flex-col lg:flex-row border border-primary/20 rounded-lg overflow-hidden shadow-lg relative mx-auto">
            {/* Personal License Card */}
            <div className="personal-card w-full lg:w-2/3 bg-card relative">
              <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-primary/60 via-primary to-primary/60"></div>

              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold">Personal License</h3>
                    <p className="text-xs text-muted-foreground mt-1">
                      For individual developers & freelancers
                    </p>
                  </div>
                  <Badge
                    variant="outline"
                    className="bg-primary/10 text-primary border-primary/30 text-[10px] py-0 h-5"
                  >
                    <Sparkles className="h-2.5 w-2.5 mr-1" />
                    POPULAR
                  </Badge>
                </div>

                <div className="flex items-baseline mb-5">
                  <span className="text-2xl font-bold">$149</span>
                  <span className="text-muted-foreground line-through text-sm ml-2">
                    $399
                  </span>
                  <span className="text-xs bg-primary/10 text-primary rounded-full px-2 py-0.5 ml-2">
                    Save 63%
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2 mb-6">
                  {personalFeatures.map((feature, i) => (
                    <div key={i} className="flex items-start">
                      <Check className="h-4 w-4 text-primary mr-2 mt-0.5 flex-shrink-0" />
                      <p className="text-xs text-muted-foreground">{feature}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-auto p-6 pt-4 border-t border-border/30">
                <Button disabled className="w-full text-sm h-10">
                  Coming Soon
                </Button>
                <p className="text-[10px] text-center text-muted-foreground mt-2">
                  Secure payment • Instant access • 30-day guarantee
                </p>
              </div>
            </div>

            {/* Team License Card */}
            <div className="team-card w-full lg:w-1/3 bg-muted/5 relative lg:border-l border-border/30 lg:border-t-0 border-t">
              <div className="absolute top-0 left-0 w-full h-0.5 lg:h-full lg:w-0.5 bg-gradient-to-r lg:bg-gradient-to-b from-muted/60 via-muted to-muted/60"></div>

              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold">Team License</h3>
                    <p className="text-xs text-muted-foreground mt-1">
                      For teams & businesses
                    </p>
                  </div>
                  <Badge
                    variant="outline"
                    className="bg-muted/20 text-foreground border-muted/40 text-[10px] py-0 h-5"
                  >
                    <Users className="h-2.5 w-2.5 mr-1" />
                    TEAMS
                  </Badge>
                </div>

                <div className="flex items-baseline mb-5">
                  <span className="text-2xl font-bold">$269</span>
                  <span className="text-muted-foreground line-through text-sm ml-2">
                    $499
                  </span>
                  <span className="text-xs bg-muted/20 text-foreground rounded-full px-2 py-0.5 ml-2">
                    Save 46%
                  </span>
                </div>

                <div className="space-y-2 mb-6">
                  {teamFeatures.map((feature, i) => (
                    <div key={i} className="flex items-start">
                      <Check className="h-4 w-4 text-foreground mr-2 mt-0.5 flex-shrink-0" />
                      <p className="text-xs text-muted-foreground">{feature}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-auto p-6 pt-4 border-t border-border/30">
                <Button
                  disabled
                  className="w-full text-sm h-10 border-muted/50"
                >
                  Coming Soon
                </Button>
                <p className="text-[10px] text-center text-muted-foreground mt-2">
                  Volume discounts available
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Calculator/Savings Section */}
        <div className="mt-10 max-w-3xl mx-auto rounded-lg border border-muted/30 bg-muted/5 p-4 text-center">
          <p className="text-sm font-medium mb-2">
            Why our pricing makes sense:
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="p-2">
              <p className="text-xs text-muted-foreground">
                Individual templates
              </p>
              <p className="text-sm font-medium mt-1">$49-$69 each</p>
            </div>
            <div className="p-2">
              <p className="text-xs text-muted-foreground">Total value</p>
              <p className="text-sm font-medium mt-1">$2,500+</p>
            </div>
            <div className="p-2">
              <p className="text-xs text-muted-foreground">Your price</p>
              <p className="text-sm font-medium mt-1">$149</p>
            </div>
            <div className="p-2">
              <p className="text-xs text-muted-foreground">Your savings</p>
              <p className="text-sm font-medium text-primary mt-1">94%</p>
            </div>
          </div>
        </div>

        {/* FAQs */}
        <div className="mt-10 max-w-3xl mx-auto">
          <Separator className="mb-6" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
            <div>
              <h4 className="font-medium mb-2">
                What's included in the license?
              </h4>
              <p className="text-xs text-muted-foreground">
                Both licenses include all current templates and sections, plus
                all future additions at no extra cost. Use them in unlimited
                projects.
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-2">
                What's the difference between licenses?
              </h4>
              <p className="text-xs text-muted-foreground">
                Personal license is for a single developer. Team license allows
                for distribution of templates to up to 20 developers within your
                organization.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

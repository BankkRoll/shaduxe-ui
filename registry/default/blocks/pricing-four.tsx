import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Check,
  ChevronRight,
  Crown,
  ExternalLink,
  Heart,
  LucideIcon,
  Shield,
  ShoppingCart,
  Star,
  Stars,
} from "lucide-react";
import { AnimatePresence, motion, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  company?: string;
  content: string;
  rating: number;
  avatar: string;
}

export interface Feature {
  text: string;
}

export interface Benefit {
  text: string;
  icon: LucideIcon;
}

export interface PricingFourProps {
  className?: string;
  cardClassName?: string;
  maxWidth?: string;
}

const pricingConfig = {
  badge: {
    icon: Crown,
    text: "Premium Template",
  },
  title: "Next.js Starter Template",
  subtitle:
    "Build your next SaaS application with this premium starter template",
  price: {
    current: "$69.99",
    original: "$99.99",
    discount: "30% Off",
  },
  benefits: [
    {
      text: "One-time payment, lifetime updates",
      icon: Check,
    },
    {
      text: "30-day money-back guarantee",
      icon: Shield,
    },
    {
      text: "Created by developers for developers",
      icon: Heart,
    },
  ],
  features: [
    "Modern Next.js 14 App Router",
    "TypeScript and Tailwind CSS",
    "Supabase Auth Integration",
    "Responsive Dashboard Layout",
    "Dark Mode Support",
    "Authentication Flows",
    "50+ UI Components",
    "Email Templates",
    "SEO Optimized",
    "Performance Optimized",
    "Premium Support",
  ].map((text) => ({ text })),
  featuresIcon: Check,
  featuresTitle: "Included Features",
  featuresBadge: {
    icon: Stars,
    text: "All Features",
  },
  primaryButton: {
    text: "Purchase Template",
    chevronIcon: ChevronRight,
    href: "#",
  },
  secondaryButton: {
    text: "Live Demo",
    icon: ExternalLink,
    href: "#",
  },
  testimonials: [
    {
      id: 1,
      name: "Alex Johnson",
      role: "Full Stack Developer",
      company: "TechFlow",
      content:
        "This starter template saved me weeks of setup time. The Supabase integration is flawless, and the UI components are beautiful and easy to customize.",
      rating: 5,
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
      id: 2,
      name: "Sarah Miller",
      role: "Frontend Engineer",
      company: "DesignHub",
      content:
        "I've used many starter templates, but this one stands out for its clean architecture and attention to detail.",
      rating: 5,
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
      id: 3,
      name: "Michael Chen",
      role: "Product Manager",
      company: "InnovateLabs",
      content:
        "Our team was able to launch our MVP in record time thanks to this template. The authentication flow and user management features worked right out of the box.",
      rating: 5,
      avatar: "https://randomuser.me/api/portraits/men/46.jpg",
    },
    {
      id: 4,
      name: "Emily Rodriguez",
      role: "UX Designer",
      company: "CreativeCraft",
      content:
        "The dark mode implementation is perfect, and the components are accessible by default.",
      rating: 4,
      avatar: "https://randomuser.me/api/portraits/women/65.jpg",
    },
    {
      id: 5,
      name: "David Park",
      role: "CTO",
      company: "StartupForge",
      content:
        "We evaluated several starter templates for our new project, and this one was by far the most complete..",
      rating: 5,
      avatar: "https://randomuser.me/api/portraits/men/22.jpg",
    },
    {
      id: 6,
      name: "Olivia Martinez",
      role: "Product Owner",
      company: "InnovateX",
      content:
        "After evaluating several solutions, we chose this one for its flexibility and robust feature set. ",
      rating: 5,
      avatar: "https://randomuser.me/api/portraits/women/24.jpg",
    },
  ],
  testimonialRotationSpeed: 5000,
};

export default function PricingFour({
  className,
  cardClassName,
  maxWidth = "max-w-4xl",
}: PricingFourProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);

  // Auto-rotate testimonials
  useEffect(() => {
    if (pricingConfig.testimonials.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentTestimonialIndex(
        (prev) => (prev + 1) % pricingConfig.testimonials.length,
      );
    }, pricingConfig.testimonialRotationSpeed);

    return () => clearInterval(interval);
  }, []);

  // Extract data from config
  const {
    badge,
    title,
    subtitle,
    price,
    benefits,
    features,
    featuresIcon,
    featuresTitle,
    featuresBadge,
    primaryButton,
    secondaryButton,
    testimonials,
  } = pricingConfig;

  // Component references
  const BadgeIcon = badge?.icon;
  const FeaturesBadgeIcon = featuresBadge?.icon;
  const FeaturesIcon = featuresIcon;
  const ChevronIcon = primaryButton.chevronIcon;
  const SecondaryButtonIcon = secondaryButton?.icon;

  return (
    <div
      ref={sectionRef}
      className={`py-12 relative overflow-hidden ${className || ""}`}
    >
      <div
        className={`container px-4 md:px-6 relative z-10 mx-auto ${maxWidth}`}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <Card
            className={`overflow-hidden border border-primary/10 relative group ${cardClassName || ""}`}
          >
            <motion.div
              className="absolute inset-0 pointer-events-none"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gradient-to-r from-primary/5 via-primary/2 to-transparent" />
            </motion.div>

            <div className="flex flex-col md:flex-row">
              {/* Left column - Pricing details */}
              <div className="p-6 md:p-8 md:w-1/2 flex flex-col">
                {badge && (
                  <div className="flex items-center mb-4">
                    <Badge className="px-3 py-1 bg-primary/5 border-primary/10 text-primary hover:bg-primary/10">
                      {BadgeIcon && <BadgeIcon className="h-3.5 w-3.5 mr-1" />}
                      <span>{badge.text}</span>
                    </Badge>
                  </div>
                )}

                <h3 className="text-2xl font-bold mb-2">{title}</h3>
                <p className="text-muted-foreground mb-4">{subtitle}</p>

                <div className="flex items-baseline mb-6">
                  <span className="text-4xl font-bold">{price.current}</span>
                  {price.original && (
                    <span className="text-muted-foreground ml-2 line-through">
                      {price.original}
                    </span>
                  )}
                  {price.discount && (
                    <Badge
                      variant="outline"
                      className={`ml-3 border-green-400/30 text-green-500`}
                    >
                      <span>{price.discount}</span>
                    </Badge>
                  )}
                </div>

                <div className="space-y-4 mb-6">
                  {benefits.map((benefit, index) => {
                    const BenefitIcon = benefit.icon;

                    return (
                      <div key={index} className="flex items-center gap-2">
                        <BenefitIcon className="h-4 w-4 text-primary" />
                        <span className="text-sm">{benefit.text}</span>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-auto space-y-3">
                  <Button
                    className="w-full gap-2 group"
                    size="lg"
                    asChild={!!primaryButton.href}
                  >
                    {primaryButton.href ? (
                      <a href={primaryButton.href} target="_blank">
                        <span>{primaryButton.text}</span>
                        {ChevronIcon && (
                          <ChevronIcon className="h-4 w-4 ml-auto transition-transform group-hover:translate-x-1" />
                        )}
                      </a>
                    ) : (
                      <>
                        <span>{primaryButton.text}</span>
                        {ChevronIcon && (
                          <ChevronIcon className="h-4 w-4 ml-auto transition-transform group-hover:translate-x-1" />
                        )}
                      </>
                    )}
                  </Button>

                  {secondaryButton && (
                    <Button
                      variant="outline"
                      className="w-full gap-2"
                      size="lg"
                      asChild={!!secondaryButton.href}
                    >
                      {secondaryButton.href ? (
                        <a href={secondaryButton.href} target="_blank">
                          <span>{secondaryButton.text}</span>
                          {SecondaryButtonIcon && (
                            <SecondaryButtonIcon className="h-4 w-4 ml-auto" />
                          )}
                        </a>
                      ) : (
                        <>
                          <span>{secondaryButton.text}</span>
                          {SecondaryButtonIcon && (
                            <SecondaryButtonIcon className="h-4 w-4 ml-auto" />
                          )}
                        </>
                      )}
                    </Button>
                  )}
                </div>
              </div>

              {/* Right column - Features */}
              <div className="p-6 md:p-8 md:w-1/2 md:border-l border-border/50">
                <div className="flex items-center mb-4">
                  <h4 className="font-semibold">{featuresTitle}</h4>
                </div>

                <div className="space-y-3 mb-6">
                  {features.map((feature, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: 20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.4 + i * 0.05, duration: 0.5 }}
                      className="flex items-center gap-3"
                    >
                      <div className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/10">
                        <FeaturesIcon className="h-3 w-3 text-primary" />
                      </div>
                      <span className="text-sm">{feature.text}</span>
                    </motion.div>
                  ))}
                </div>

                {testimonials.length > 0 && (
                  <>
                    <Separator className="my-6" />

                    <div className="rounded-lg p-4 border border-border/50 relative overflow-hidden min-h-[140px]">
                      <AnimatePresence mode="wait">
                        {testimonials.map(
                          (testimonial, index) =>
                            index === currentTestimonialIndex && (
                              <motion.div
                                key={testimonial.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.5 }}
                                className="absolute inset-0 p-4"
                              >
                                <div className="flex items-center gap-3 mb-2">
                                  <div className="h-8 w-8 rounded-full overflow-hidden">
                                    <img
                                      src={
                                        testimonial.avatar || "/placeholder.svg"
                                      }
                                      alt={`${testimonial.name}'s avatar`}
                                      className="w-full h-full object-cover"
                                    />
                                  </div>
                                  <div>
                                    <p className="font-medium text-sm">
                                      {testimonial.name}
                                    </p>
                                    <p className="text-xs text-muted-foreground">
                                      {testimonial.role}
                                      {testimonial.company &&
                                        ` at ${testimonial.company}`}
                                    </p>
                                  </div>
                                  <div className="ml-auto flex">
                                    {[...Array(testimonial.rating)].map(
                                      (_, i) => (
                                        <Star
                                          key={i}
                                          className="h-3 w-3 fill-primary text-primary"
                                        />
                                      ),
                                    )}
                                  </div>
                                </div>
                                <p className="text-sm italic">
                                  {testimonial.content}
                                </p>
                              </motion.div>
                            ),
                        )}
                      </AnimatePresence>
                    </div>

                    {testimonials.length > 1 && (
                      <div className="flex justify-center mt-4 gap-1">
                        {testimonials.map((_, index) => (
                          <button
                            key={index}
                            className={`h-1.5 rounded-full transition-all ${
                              index === currentTestimonialIndex
                                ? "w-4 bg-primary"
                                : "w-1.5 bg-primary/30"
                            }`}
                            onClick={() => setCurrentTestimonialIndex(index)}
                            aria-label={`View testimonial ${index + 1}`}
                          />
                        ))}
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}

"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import { motion, useAnimation, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  avatar: string;
}

export interface TestimonialTwoProps {
  className?: string;
}

// All data in a single config object
const testimonialsConfig = {
  title: "Loved by Developers",
  subtitle: "See what others are saying about our premium starter template",
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
  ],
  autoRotateInterval: 6000,
  showVerifiedBadge: true,
  trustedCompanies: ["Google", "Microsoft", "Airbnb", "Spotify", "Netflix"],
  trustedCompaniesTitle: "Trusted by teams at these companies and more",
};

export default function TestimonialTwo({ className }: TestimonialTwoProps) {
  // State for active testimonial
  const [activeIndex, setActiveIndex] = useState(0);

  // Destructure config for easier access
  const {
    title,
    subtitle,
    testimonials,
    autoRotateInterval,
    showVerifiedBadge,
    trustedCompanies,
    trustedCompaniesTitle,
  } = testimonialsConfig;

  // Refs for scroll animations
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const controls = useAnimation();

  // Automatically cycle through testimonials
  useEffect(() => {
    if (autoRotateInterval <= 0 || testimonials.length <= 1) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, autoRotateInterval);

    return () => clearInterval(interval);
  }, [testimonials.length, autoRotateInterval]);

  // Trigger animations when section comes into view
  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  // Handlers for navigation
  const handlePrev = () => {
    setActiveIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length,
    );
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
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

  if (testimonials.length === 0) {
    return null;
  }

  return (
    <section
      ref={sectionRef}
      id="testimonials-alt"
      className={cn(
        "py-16 md:py-32 relative overflow-hidden flex justify-center",
        className,
      )}
    >
      <div className="items-center px-4 md:px-6">
        <motion.div
          initial="hidden"
          animate={controls}
          variants={containerVariants}
          className="text-center mb-12 space-y-4"
        >
          <motion.h2
            variants={itemVariants}
            className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl"
          >
            {title}
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-muted-foreground max-w-[700px] mx-auto md:text-xl/relaxed"
          >
            {subtitle}
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          animate={controls}
          variants={containerVariants}
          className="md:grid md:grid-cols-[1fr_auto] gap-8 items-center max-w-[1200px]"
        >
          <motion.div variants={itemVariants} className="relative">
            <div className="absolute -top-6 -left-6 z-10">
              <Quote className="h-12 w-12 text-primary/20" strokeWidth={1} />
            </div>

            {/* Testimonial cards */}
            <div className="relative h-[320px] md:h-[280px]">
              {testimonials.map((testimonial, index) => (
                <Card
                  key={testimonial.id}
                  className={cn(
                    "absolute inset-0 transition-all duration-500 border",
                    index === activeIndex
                      ? "opacity-100 translate-x-0 shadow-lg"
                      : "opacity-0 translate-x-[100px] pointer-events-none",
                  )}
                >
                  <CardContent className="p-6 md:p-8 h-full flex flex-col">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center gap-4">
                        <Avatar className="h-12 w-12 border-2 border-primary/10">
                          <AvatarImage
                            src={testimonial.avatar}
                            alt={testimonial.name}
                          />
                          <AvatarFallback>
                            {testimonial.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="text-left">
                          <h4 className="font-semibold">{testimonial.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            {testimonial.role}, {testimonial.company}
                          </p>
                        </div>
                      </div>
                      <div className="flex">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star
                            key={i}
                            className="h-4 w-4 fill-yellow-500 text-yellow-500"
                          />
                        ))}
                      </div>
                    </div>

                    <Separator className="my-4" />

                    <p className="flex-1 italic text-base/relaxed">
                      "{testimonial.content}"
                    </p>

                    {showVerifiedBadge && (
                      <div className="mt-4 text-xs text-right text-muted-foreground">
                        Verified Customer
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>

          {/* Navigation buttons */}
          <motion.div
            variants={itemVariants}
            className="flex md:flex-col gap-4 justify-center mt-8 md:mt-0"
          >
            <Button
              variant="outline"
              size="icon"
              onClick={handlePrev}
              className="rounded-full h-10 w-10"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>

            <div className="flex md:flex-col gap-2 items-center justify-center">
              {testimonials.map((_, index) => (
                <div
                  key={index}
                  className={cn(
                    "w-2 h-2 rounded-full transition-colors",
                    index === activeIndex
                      ? "bg-primary"
                      : "bg-muted-foreground/20",
                  )}
                  role="button"
                  tabIndex={0}
                  onClick={() => setActiveIndex(index)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      setActiveIndex(index);
                    }
                  }}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            <Button
              variant="outline"
              size="icon"
              onClick={handleNext}
              className="rounded-full h-10 w-10"
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </motion.div>
        </motion.div>

        {/* Logo cloud - Updated to match TestimonialsSection */}
        {trustedCompanies.length > 0 && (
          <motion.div variants={itemVariants} className="mt-20 pt-10 border-t">
            <h3 className="text-sm font-medium text-muted-foreground text-center mb-8">
              {trustedCompaniesTitle}
            </h3>
            <div className="flex flex-wrap justify-center gap-x-12 gap-y-8">
              {trustedCompanies.map((company) => (
                <div
                  key={company}
                  className="text-2xl font-semibold text-muted-foreground/50"
                >
                  {company}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}

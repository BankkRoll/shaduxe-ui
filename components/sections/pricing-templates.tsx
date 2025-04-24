"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SectionTitle } from "@/components/ui/section-title";
import type { Database } from "@/types/database.types";
import { createClient } from "@/utils/supabase/client";
import {
  Check,
  Clock,
  Download,
  ExternalLink,
  Loader2,
  Tag,
  User,
} from "lucide-react";
import { motion, useInView } from "motion/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import TechStack from "../docs/tech-stack";

type Template = Database["public"]["Tables"]["templates"]["Row"];

// Create a separate component for each template to avoid hook order issues
const TemplateCard = ({
  template,
  index,
  hasLifetimeAccess,
  purchasedTemplates,
  onPurchase,
  onDownload,
  isDownloading,
  isPurchasing,
  formatDate,
}: {
  template: Template;
  index: number;
  hasLifetimeAccess: boolean;
  purchasedTemplates: string[];
  onPurchase: (templateId: string) => void;
  onDownload: (templateId: string) => void;
  isDownloading: string | null;
  isPurchasing: string | null;
  formatDate: (date: string | null) => string;
}) => {
  const templateRef = useRef<HTMLDivElement>(null);
  const isTemplateInView = useInView(templateRef, { once: true, amount: 0.2 });

  // Determine if this is an even index (0-based, so 0, 2, 4... are even)
  const isEven = index % 2 === 0;

  // Motion variants
  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const fadeInVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.4 },
    },
  };

  return (
    <motion.div
      key={template.id}
      className="group relative rounded-2xl border border-primary/20 overflow-hidden bg-gradient-to-b from-background to-background/80 backdrop-blur-sm w-full"
      variants={itemVariants}
      custom={index}
      ref={templateRef}
      initial="hidden"
      animate={isTemplateInView ? "visible" : "hidden"}
      transition={{ delay: 0.1 * index }}
    >
      <div className="absolute inset-px bg-gradient-to-b from-primary/10 to-primary/5 rounded-2xl pointer-events-none" />

      <div className="relative p-6 lg:p-8 w-full">
        {/* Mobile View (flex-col) - Image always at top */}
        <div className="flex flex-col w-full lg:hidden">
          {/* Template Preview */}
          <motion.div className="w-full" variants={fadeInVariants}>
            <motion.div
              className="relative aspect-[16/9] rounded-lg overflow-hidden bg-muted/10 border border-muted/20 w-full"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={
                isTemplateInView
                  ? { opacity: 1, scale: 1 }
                  : { opacity: 0, scale: 0.95 }
              }
              transition={{ duration: 0.6, delay: 0.2 + index * 0.05 }}
            >
              <Link
                href={
                  template.live_preview_url ||
                  template.preview_url ||
                  `/templates/${template.id}/preview`
                }
                target="_blank"
                className="absolute inset-0"
              >
                <video
                  src={template.video_url || `/templates/${template.id}.mp4`}
                  poster={template.image_url || `/templates/${template.id}.png`}
                  className="w-full h-full object-cover"
                  autoPlay
                  muted
                  loop
                  playsInline
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                  <div className="flex items-center gap-2">
                    Live Preview
                    <ExternalLink className="w-5 h-5" />
                  </div>
                </div>
              </Link>
            </motion.div>

            {/* Template Metadata */}
            <motion.div
              className="flex flex-wrap items-center gap-3 mt-4 text-sm text-muted-foreground"
              initial={{ opacity: 0, y: 10 }}
              animate={
                isTemplateInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }
              }
              transition={{ duration: 0.5, delay: 0.3 + index * 0.05 }}
            >
              {template.version && (
                <Badge variant="outline" className="h-6">
                  <Tag className="w-3.5 h-3.5 mr-1" />v{template.version}
                </Badge>
              )}
              {template.author && (
                <Badge variant="outline" className="h-6">
                  <User className="w-3.5 h-3.5 mr-1" />
                  {template.author}
                </Badge>
              )}
              {template.last_updated && (
                <Badge variant="outline" className="h-6">
                  <Clock className="w-3.5 h-3.5 mr-1" />
                  Updated {formatDate(template.last_updated)}
                </Badge>
              )}
            </motion.div>
          </motion.div>

          {/* Template Info */}
          <motion.div
            className="w-full flex flex-col justify-between gap-6 mt-6"
            variants={fadeInVariants}
          >
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={
                  isTemplateInView
                    ? { opacity: 1, y: 0 }
                    : { opacity: 0, y: 15 }
                }
                transition={{ duration: 0.5, delay: 0.3 + index * 0.05 }}
              >
                <h2 className="text-2xl font-bold tracking-tight mb-2">
                  {template.name}
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  {template.description}
                </p>
              </motion.div>

              {/* Tech Stack */}
              {template.tech_stack &&
                Array.isArray(template.tech_stack) &&
                template.tech_stack.length > 0 && (
                  <motion.div
                    className="space-y-2"
                    initial={{ opacity: 0, y: 15 }}
                    animate={
                      isTemplateInView
                        ? { opacity: 1, y: 0 }
                        : { opacity: 0, y: 15 }
                    }
                    transition={{ duration: 0.5, delay: 0.4 + index * 0.05 }}
                  >
                    <h3 className="text-sm font-medium">Built with</h3>
                    <TechStack technologies={template.tech_stack as string[]} />
                  </motion.div>
                )}

              {/* Features */}
              {template.features &&
                Array.isArray(template.features) &&
                template.features.length > 0 && (
                  <motion.div
                    className="space-y-2"
                    initial={{ opacity: 0, y: 15 }}
                    animate={
                      isTemplateInView
                        ? { opacity: 1, y: 0 }
                        : { opacity: 0, y: 15 }
                    }
                    transition={{ duration: 0.5, delay: 0.5 + index * 0.05 }}
                  >
                    <h3 className="text-sm font-medium">Key Features</h3>
                    <ul className="grid gap-2 text-sm text-muted-foreground">
                      {(
                        template.features as {
                          title: string;
                          description: string;
                        }[]
                      ).map((feature, featureIndex) => (
                        <motion.li
                          key={featureIndex}
                          className="flex items-start gap-2"
                          initial={{ opacity: 0, x: -10 }}
                          animate={
                            isTemplateInView
                              ? { opacity: 1, x: 0 }
                              : { opacity: 0, x: -10 }
                          }
                          transition={{
                            duration: 0.4,
                            delay: 0.6 + index * 0.05 + featureIndex * 0.05,
                          }}
                        >
                          <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <Check className="h-3 w-3 text-primary" />
                          </div>
                          <span>{feature.title}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                )}
            </div>

            <motion.div
              className="flex flex-col sm:flex-row gap-3"
              initial={{ opacity: 0, y: 15 }}
              animate={
                isTemplateInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }
              }
              transition={{ duration: 0.5, delay: 0.6 + index * 0.05 }}
            >
              {hasLifetimeAccess || purchasedTemplates.includes(template.id) ? (
                <Button
                  onClick={() => onDownload(template.id)}
                  disabled={isDownloading === template.id}
                  size="lg"
                  className="cursor-pointer w-full sm:w-auto"
                >
                  {isDownloading === template.id ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Downloading...
                    </>
                  ) : (
                    <>
                      <Download className="h-4 w-4 mr-2" />
                      Download Now
                    </>
                  )}
                </Button>
              ) : (
                <Button
                  onClick={() => onPurchase(template.id)}
                  disabled={isPurchasing === template.id}
                  size="lg"
                  className="cursor-pointer w-full sm:w-auto"
                >
                  {isPurchasing === template.id ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>Purchase - ${(template.price / 100).toFixed(2)}</>
                  )}
                </Button>
              )}
              <Button
                asChild
                variant="outline"
                size="lg"
                className="cursor-pointer w-full sm:w-auto"
              >
                <Link href={`/docs/templates/${template.id}`}>Learn More</Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>

        {/* Desktop View (flex-row) - Alternating sides */}
        <div className="hidden lg:flex lg:flex-row gap-8 w-full">
          {isEven ? (
            // Even index (image on left)
            <>
              {/* Template Preview */}
              <motion.div className="lg:w-1/2 w-full" variants={fadeInVariants}>
                <motion.div
                  className="relative aspect-[16/9] rounded-lg overflow-hidden bg-muted/10 border border-muted/20 w-full"
                  initial={{ opacity: 0, scale: 0.95, x: -20 }}
                  animate={
                    isTemplateInView
                      ? { opacity: 1, scale: 1, x: 0 }
                      : { opacity: 0, scale: 0.95, x: -20 }
                  }
                  transition={{ duration: 0.6, delay: 0.2 + index * 0.05 }}
                >
                  <Link
                    href={
                      template.live_preview_url ||
                      template.preview_url ||
                      `/templates/${template.id}/preview`
                    }
                    target="_blank"
                    className="absolute inset-0"
                  >
                    <video
                      src={
                        template.video_url || `/templates/${template.id}.mp4`
                      }
                      poster={
                        template.image_url || `/templates/${template.id}.png`
                      }
                      className="w-full h-full object-cover"
                      autoPlay
                      muted
                      loop
                      playsInline
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                      <div className="flex items-center gap-2">
                        Live Preview
                        <ExternalLink className="w-5 h-5" />
                      </div>
                    </div>
                  </Link>
                </motion.div>

                {/* Template Metadata */}
                <motion.div
                  className="flex flex-wrap items-center gap-3 mt-4 text-sm text-muted-foreground"
                  initial={{ opacity: 0, y: 10 }}
                  animate={
                    isTemplateInView
                      ? { opacity: 1, y: 0 }
                      : { opacity: 0, y: 10 }
                  }
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.05 }}
                >
                  {template.version && (
                    <Badge variant="outline" className="h-6">
                      <Tag className="w-3.5 h-3.5 mr-1" />v{template.version}
                    </Badge>
                  )}
                  {template.author && (
                    <Badge variant="outline" className="h-6">
                      <User className="w-3.5 h-3.5 mr-1" />
                      {template.author}
                    </Badge>
                  )}
                  {template.last_updated && (
                    <Badge variant="outline" className="h-6">
                      <Clock className="w-3.5 h-3.5 mr-1" />
                      Updated {formatDate(template.last_updated)}
                    </Badge>
                  )}
                </motion.div>
              </motion.div>

              {/* Template Info */}
              <motion.div
                className="lg:w-1/2 flex flex-col justify-between gap-6 w-full"
                variants={fadeInVariants}
              >
                <div className="space-y-4">
                  <motion.div
                    initial={{ opacity: 0, y: 15, x: 20 }}
                    animate={
                      isTemplateInView
                        ? { opacity: 1, y: 0, x: 0 }
                        : { opacity: 0, y: 15, x: 20 }
                    }
                    transition={{ duration: 0.5, delay: 0.3 + index * 0.05 }}
                  >
                    <h2 className="text-2xl font-bold tracking-tight mb-2">
                      {template.name}
                    </h2>
                    <p className="text-muted-foreground leading-relaxed">
                      {template.description}
                    </p>
                  </motion.div>

                  {/* Tech Stack */}
                  {template.tech_stack &&
                    Array.isArray(template.tech_stack) &&
                    template.tech_stack.length > 0 && (
                      <motion.div
                        className="space-y-2"
                        initial={{ opacity: 0, y: 15 }}
                        animate={
                          isTemplateInView
                            ? { opacity: 1, y: 0 }
                            : { opacity: 0, y: 15 }
                        }
                        transition={{
                          duration: 0.5,
                          delay: 0.4 + index * 0.05,
                        }}
                      >
                        <h3 className="text-sm font-medium">Built with</h3>
                        <TechStack
                          technologies={template.tech_stack as string[]}
                        />
                      </motion.div>
                    )}

                  {/* Features */}
                  {template.features &&
                    Array.isArray(template.features) &&
                    template.features.length > 0 && (
                      <motion.div
                        className="space-y-2"
                        initial={{ opacity: 0, y: 15 }}
                        animate={
                          isTemplateInView
                            ? { opacity: 1, y: 0 }
                            : { opacity: 0, y: 15 }
                        }
                        transition={{
                          duration: 0.5,
                          delay: 0.5 + index * 0.05,
                        }}
                      >
                        <h3 className="text-sm font-medium">Key Features</h3>
                        <ul className="grid gap-2 text-sm text-muted-foreground">
                          {(
                            template.features as {
                              title: string;
                              description: string;
                            }[]
                          ).map((feature, featureIndex) => (
                            <motion.li
                              key={featureIndex}
                              className="flex items-start gap-2"
                              initial={{ opacity: 0, x: -10 }}
                              animate={
                                isTemplateInView
                                  ? { opacity: 1, x: 0 }
                                  : { opacity: 0, x: -10 }
                              }
                              transition={{
                                duration: 0.4,
                                delay: 0.6 + index * 0.05 + featureIndex * 0.05,
                              }}
                            >
                              <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                                <Check className="h-3 w-3 text-primary" />
                              </div>
                              <span>{feature.title}</span>
                            </motion.li>
                          ))}
                        </ul>
                      </motion.div>
                    )}
                </div>

                <motion.div
                  className="flex flex-col sm:flex-row gap-3"
                  initial={{ opacity: 0, y: 15 }}
                  animate={
                    isTemplateInView
                      ? { opacity: 1, y: 0 }
                      : { opacity: 0, y: 15 }
                  }
                  transition={{ duration: 0.5, delay: 0.6 + index * 0.05 }}
                >
                  {hasLifetimeAccess ||
                  purchasedTemplates.includes(template.id) ? (
                    <Button
                      onClick={() => onDownload(template.id)}
                      disabled={isDownloading === template.id}
                      size="lg"
                      className="w-full sm:w-auto"
                    >
                      {isDownloading === template.id ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          Downloading...
                        </>
                      ) : (
                        <>
                          <Download className="h-4 w-4 mr-2" />
                          Download Now
                        </>
                      )}
                    </Button>
                  ) : (
                    <Button
                      onClick={() => onPurchase(template.id)}
                      disabled={isPurchasing === template.id}
                      size="lg"
                      className="w-full sm:w-auto"
                    >
                      {isPurchasing === template.id ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          Processing...
                        </>
                      ) : (
                        <>Purchase - ${(template.price / 100).toFixed(2)}</>
                      )}
                    </Button>
                  )}
                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="w-full sm:w-auto"
                  >
                    <Link href={`/docs/templates/${template.id}`}>
                      Learn More
                    </Link>
                  </Button>
                </motion.div>
              </motion.div>
            </>
          ) : (
            // Odd index (image on right)
            <>
              {/* Template Info */}
              <motion.div
                className="lg:w-1/2 flex flex-col justify-between gap-6 w-full"
                variants={fadeInVariants}
              >
                <div className="space-y-4">
                  <motion.div
                    initial={{ opacity: 0, y: 15, x: -20 }}
                    animate={
                      isTemplateInView
                        ? { opacity: 1, y: 0, x: 0 }
                        : { opacity: 0, y: 15, x: -20 }
                    }
                    transition={{ duration: 0.5, delay: 0.3 + index * 0.05 }}
                  >
                    <h2 className="text-2xl font-bold tracking-tight mb-2">
                      {template.name}
                    </h2>
                    <p className="text-muted-foreground leading-relaxed">
                      {template.description}
                    </p>
                  </motion.div>

                  {/* Tech Stack */}
                  {template.tech_stack &&
                    Array.isArray(template.tech_stack) &&
                    template.tech_stack.length > 0 && (
                      <motion.div
                        className="space-y-2"
                        initial={{ opacity: 0, y: 15 }}
                        animate={
                          isTemplateInView
                            ? { opacity: 1, y: 0 }
                            : { opacity: 0, y: 15 }
                        }
                        transition={{
                          duration: 0.5,
                          delay: 0.4 + index * 0.05,
                        }}
                      >
                        <h3 className="text-sm font-medium">Built with</h3>
                        <TechStack
                          technologies={template.tech_stack as string[]}
                        />
                      </motion.div>
                    )}

                  {/* Features */}
                  {template.features &&
                    Array.isArray(template.features) &&
                    template.features.length > 0 && (
                      <motion.div
                        className="space-y-2"
                        initial={{ opacity: 0, y: 15 }}
                        animate={
                          isTemplateInView
                            ? { opacity: 1, y: 0 }
                            : { opacity: 0, y: 15 }
                        }
                        transition={{
                          duration: 0.5,
                          delay: 0.5 + index * 0.05,
                        }}
                      >
                        <h3 className="text-sm font-medium">Key Features</h3>
                        <ul className="grid gap-2 text-sm text-muted-foreground">
                          {(
                            template.features as {
                              title: string;
                              description: string;
                            }[]
                          ).map((feature, featureIndex) => (
                            <motion.li
                              key={featureIndex}
                              className="flex items-start gap-2"
                              initial={{ opacity: 0, x: -10 }}
                              animate={
                                isTemplateInView
                                  ? { opacity: 1, x: 0 }
                                  : { opacity: 0, x: -10 }
                              }
                              transition={{
                                duration: 0.4,
                                delay: 0.6 + index * 0.05 + featureIndex * 0.05,
                              }}
                            >
                              <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                                <Check className="h-3 w-3 text-primary" />
                              </div>
                              <span>{feature.title}</span>
                            </motion.li>
                          ))}
                        </ul>
                      </motion.div>
                    )}
                </div>

                <motion.div
                  className="flex flex-col sm:flex-row gap-3"
                  initial={{ opacity: 0, y: 15 }}
                  animate={
                    isTemplateInView
                      ? { opacity: 1, y: 0 }
                      : { opacity: 0, y: 15 }
                  }
                  transition={{ duration: 0.5, delay: 0.6 + index * 0.05 }}
                >
                  {hasLifetimeAccess ||
                  purchasedTemplates.includes(template.id) ? (
                    <Button
                      onClick={() => onDownload(template.id)}
                      disabled={isDownloading === template.id}
                      size="lg"
                      className="w-full sm:w-auto"
                    >
                      {isDownloading === template.id ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          Downloading...
                        </>
                      ) : (
                        <>
                          <Download className="h-4 w-4 mr-2" />
                          Download Now
                        </>
                      )}
                    </Button>
                  ) : (
                    <Button
                      onClick={() => onPurchase(template.id)}
                      disabled={isPurchasing === template.id}
                      size="lg"
                      className="w-full sm:w-auto"
                    >
                      {isPurchasing === template.id ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          Processing...
                        </>
                      ) : (
                        <>Purchase - ${(template.price / 100).toFixed(2)}</>
                      )}
                    </Button>
                  )}
                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="w-full sm:w-auto"
                  >
                    <Link href={`/docs/templates/${template.id}`}>
                      Learn More
                    </Link>
                  </Button>
                </motion.div>
              </motion.div>

              {/* Template Preview */}
              <motion.div className="lg:w-1/2 w-full" variants={fadeInVariants}>
                <motion.div
                  className="relative aspect-[16/9] rounded-lg overflow-hidden bg-muted/10 border border-muted/20 w-full"
                  initial={{ opacity: 0, scale: 0.95, x: 20 }}
                  animate={
                    isTemplateInView
                      ? { opacity: 1, scale: 1, x: 0 }
                      : { opacity: 0, scale: 0.95, x: 20 }
                  }
                  transition={{ duration: 0.6, delay: 0.2 + index * 0.05 }}
                >
                  {template.live_preview_url ? (
                    <Link
                      href={template.live_preview_url}
                      target="_blank"
                      className="absolute inset-0"
                    >
                      <img
                        alt={template.name}
                        src={`/templates/${template.id}.png`}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                        <div className="flex items-center gap-2">
                          Live Preview
                          <ExternalLink className="w-5 h-5" />
                        </div>
                      </div>
                    </Link>
                  ) : (
                    <img
                      alt={template.name}
                      src={`/templates/${template.id}.png`}
                      className="w-full h-full object-cover"
                    />
                  )}
                </motion.div>

                {/* Template Metadata */}
                <motion.div
                  className="flex flex-wrap items-center gap-3 mt-4 text-sm text-muted-foreground"
                  initial={{ opacity: 0, y: 10 }}
                  animate={
                    isTemplateInView
                      ? { opacity: 1, y: 0 }
                      : { opacity: 0, y: 10 }
                  }
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.05 }}
                >
                  {template.version && (
                    <Badge variant="outline" className="h-6">
                      <Tag className="w-3.5 h-3.5 mr-1" />v{template.version}
                    </Badge>
                  )}
                  {template.author && (
                    <Badge variant="outline" className="h-6">
                      <User className="w-3.5 h-3.5 mr-1" />
                      {template.author}
                    </Badge>
                  )}
                  {template.last_updated && (
                    <Badge variant="outline" className="h-6">
                      <Clock className="w-3.5 h-3.5 mr-1" />
                      Updated {formatDate(template.last_updated)}
                    </Badge>
                  )}
                </motion.div>
              </motion.div>
            </>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default function PricingTemplatesSection() {
  const [user, setUser] = useState<any>(null);
  const [templates, setTemplates] = useState<Template[]>([]);
  const [hasLifetimeAccess, setHasLifetimeAccess] = useState(false);
  const [purchasedTemplates, setPurchasedTemplates] = useState<string[]>([]);
  const [isDownloading, setIsDownloading] = useState<string | null>(null);
  const [isPurchasing, setIsPurchasing] = useState<string | null>(null);
  const router = useRouter();
  const supabase = createClient();

  // Animation refs
  const sectionRef = useRef<HTMLDivElement>(null);
  const isSectionInView = useInView(sectionRef, { once: true, amount: 0.1 });

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

        const { data: userTemplates } = await supabase
          .from("user_templates")
          .select("template_id")
          .eq("user_id", currentUser.id);

        setPurchasedTemplates((userTemplates || []).map((t) => t.template_id));
      }

      const { data: templatesData, error } = await supabase
        .from("templates")
        .select("*")
        .eq("published", true)
        .order("created_at", { ascending: true });

      if (error) {
        console.error("Error fetching templates:", error);
        toast.error("Failed to load templates");
        return;
      }

      setTemplates(templatesData || []);
    }

    getData();
  }, [supabase]);

  const handlePurchase = async (templateId: string) => {
    if (!user) {
      router.push("/auth/sign-in");
      return;
    }

    try {
      setIsPurchasing(templateId);

      const response = await fetch("/api/stripe/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user,
          productType: "template",
          licenseType: "personal",
          productId: templateId,
        }),
      });

      const { url } = await response.json();
      window.location.href = url;
    } catch (error) {
      console.error("Error creating checkout session:", error);
      toast.error("Failed to initiate purchase. Please try again.");
    } finally {
      setIsPurchasing(null);
    }
  };

  const handleDownload = async (templateId: string) => {
    if (!user) {
      router.push("/auth/sign-in");
      return;
    }

    try {
      setIsDownloading(templateId);

      const response = await fetch("/api/template-download", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ templateId }),
      });

      if (!response.ok) {
        throw new Error("Failed to download template");
      }

      const { archive, fileName } = await response.json();

      // Convert base64 to blob
      const binaryStr = window.atob(archive);
      const len = binaryStr.length;
      const bytes = new Uint8Array(len);
      for (let i = 0; i < len; i++) {
        bytes[i] = binaryStr.charCodeAt(i);
      }
      const blob = new Blob([bytes], { type: "application/zip" });

      // Create download link
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      toast.success("Download started successfully!");
    } catch (error) {
      console.error("Download error:", error);
      toast.error("Failed to download template. Please try again.");
    } finally {
      setIsDownloading(null);
    }
  };

  const formatDate = (date: string | null) => {
    if (!date) return "";
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Motion variants for staggered animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  return (
    <section className="w-full py-12 md:py-16 lg:py-20" ref={sectionRef}>
      <motion.div
        className="px-4 md:px-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <SectionTitle
          title="Premium Templates"
          description="Get started with a premium template"
          delay={0}
        />

        <motion.div
          className="grid gap-12 mt-8 w-full"
          variants={containerVariants}
          initial="hidden"
          animate={isSectionInView ? "visible" : "hidden"}
        >
          {templates.map((template, index) => (
            <TemplateCard
              key={template.id}
              template={template}
              index={index}
              hasLifetimeAccess={hasLifetimeAccess}
              purchasedTemplates={purchasedTemplates}
              onPurchase={handlePurchase}
              onDownload={handleDownload}
              isDownloading={isDownloading}
              isPurchasing={isPurchasing}
              formatDate={formatDate}
            />
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}

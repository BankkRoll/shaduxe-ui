"use client";

import { ComponentPreview } from "@/components/docs/component-preview";
import { motion } from "motion/react";

interface SectionTitleProps {
  title: string;
  description: string;
  delay?: number;
}

const SectionTitle: React.FC<SectionTitleProps> = ({
  title,
  description,
  delay = 0,
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: delay * 0.1 }}
    className="text-center mb-12"
  >
    <h2 className="text-4xl font-bold tracking-tight mb-4">{title}</h2>
    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
      {description}
    </p>
  </motion.div>
);

export default function ComponentDemos() {
  return (
      <section id="blocks" className="flex flex-col items-center justify-center mx-auto max-w-7xl py-24">
        <SectionTitle
          title="Pre-built Blocks"
          description="Beautiful, responsive sections ready to be customized and integrated into your project."
          delay={1}
        />

        <div className="space-y-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <ComponentPreview preview={true} name="pricing-one" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <ComponentPreview preview={true} name="pricing-two" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <ComponentPreview preview={true} name="pricing-three" />
          </motion.div>
        </div>
      </section>
  );
}

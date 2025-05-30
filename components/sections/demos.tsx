"use client";

import { ComponentPreview } from "@/components/docs/component-preview";
import { motion } from "motion/react";
import { SectionTitle } from "../ui/section-title";

export default function ComponentDemos() {
  return (
    <section
      id="blocks"
      className="flex flex-col items-center justify-center mx-auto max-w-7xl py-24 sm:px-6"
    >
      <SectionTitle
        title="Pre-built Blocks"
        description="Beautiful, responsive sections ready to be customized and integrated into your project."
        delay={1}
      />

      <div className="space-y-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <ComponentPreview preview={true} name="testimonial-one" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <ComponentPreview preview={true} name="pricing-four" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <ComponentPreview preview={true} name="testimonial-two" />
        </motion.div>
      </div>
    </section>
  );
}

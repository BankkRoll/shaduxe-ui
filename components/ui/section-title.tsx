import { motion } from "motion/react";

interface SectionTitleProps {
  title: string;
  description: string;
  delay?: number;
}

export const SectionTitle: React.FC<SectionTitleProps> = ({
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

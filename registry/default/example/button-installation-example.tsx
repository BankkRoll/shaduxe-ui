import { Button } from "@/components/ui/button";
import { motion } from "motion/react";

export default function Page() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex items-center p-2"
    >
      <Button>Click me</Button>
    </motion.div>
  );
}

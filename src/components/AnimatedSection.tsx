import { motion } from "framer-motion";
import { ReactNode } from "react";

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
  scale?: boolean;
}

const directionMap = {
  up: { y: 60, x: 0 },
  down: { y: -60, x: 0 },
  left: { x: 80, y: 0 },
  right: { x: -80, y: 0 },
};

const AnimatedSection = ({
  children,
  className = "",
  delay = 0,
  direction = "up",
  scale = false,
}: AnimatedSectionProps) => {
  const offset = directionMap[direction];

  return (
    <motion.div
      initial={{
        opacity: 0,
        x: offset.x,
        y: offset.y,
        scale: scale ? 0.95 : 1,
        filter: "blur(8px)",
      }}
      whileInView={{
        opacity: 1,
        x: 0,
        y: 0,
        scale: 1,
        filter: "blur(0px)",
      }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        type: "spring",
        stiffness: 40,
        damping: 20,
        mass: 1,
        delay,
        filter: { duration: 0.4 },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedSection;

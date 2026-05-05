import { motion } from "framer-motion";

export default function MotionReveal({
  children,
  className = "",
  delay = 0,
  y = 32,
  amount = 0.2,
  once = true,
  duration = 0.65,
  x = 200,
}) {
  return (
    <motion.div
      className={className}
      style={{ x, opacity: 0 }}
      initial={{ opacity: 0, x }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once, amount }}
      transition={{
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}

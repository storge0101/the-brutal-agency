import { useEffect, useState, useRef } from "react";
import { useInView, useSpring, useTransform, motion } from "framer-motion";

interface CounterProps {
  value: number;
  suffix?: string;
  prefix?: string;
  className?: string;
}

export function Counter({ value, suffix = "", prefix = "", className = "" }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const spring = useSpring(0, {
    bounce: 0,
    duration: 2500,
  });
  
  const display = useTransform(spring, (current) => 
    Math.round(current).toString()
  );

  useEffect(() => {
    if (isInView) {
      spring.set(value);
    }
  }, [isInView, spring, value]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      <motion.span>{display}</motion.span>
      {suffix}
    </span>
  );
}

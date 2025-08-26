import { motion } from "framer-motion";
import { ArrowUp, ArrowDown } from "lucide-react";

interface MetricChipProps {
  label: string;
  delta: number;
  unit: string;
  delay?: number;
}

export function MetricChip({ label, delta, unit, delay = 0 }: MetricChipProps) {
  const isPositive = delta > 0;
  const isNegative = delta < 0;
  
  const getColorClasses = () => {
    if (label.toLowerCase().includes('downtime') || 
        label.toLowerCase().includes('cost') ||
        label.toLowerCase().includes('cpl') ||
        label.toLowerCase().includes('wait') ||
        label.toLowerCase().includes('stockout')) {
      // For metrics where decrease is good
      return isNegative 
        ? "bg-green-50 text-green-700 border-green-200" 
        : "bg-red-50 text-red-700 border-red-200";
    } else {
      // For metrics where increase is good
      return isPositive 
        ? "bg-green-50 text-green-700 border-green-200"
        : "bg-red-50 text-red-700 border-red-200";
    }
  };

  const shouldShowArrow = () => {
    if (label.toLowerCase().includes('downtime') || 
        label.toLowerCase().includes('cost') ||
        label.toLowerCase().includes('cpl') ||
        label.toLowerCase().includes('wait') ||
        label.toLowerCase().includes('stockout')) {
      return isNegative ? ArrowDown : ArrowUp;
    } else {
      return isPositive ? ArrowUp : ArrowDown;
    }
  };

  const ArrowIcon = shouldShowArrow();
  const displayValue = Math.abs(delta);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5, ease: "easeOut" }}
      className={`inline-flex items-center gap-1 px-3 py-1 text-xs font-medium rounded-full border ${getColorClasses()}`}
      data-testid={`metric-chip-${label.toLowerCase().replace(/\s+/g, '-')}`}
    >
      <ArrowIcon className="w-3 h-3" />
      <span>
        {unit === "pp" ? "+" : ""}{displayValue}{unit} {label}
      </span>
    </motion.div>
  );
}

interface AnimatedCounterProps {
  value: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
}

export function AnimatedCounter({ 
  value, 
  suffix = "", 
  prefix = "", 
  duration = 2 
}: AnimatedCounterProps) {
  return (
    <motion.span
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {prefix}
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration }}
      >
        {value.toLocaleString()}
      </motion.span>
      {suffix}
    </motion.span>
  );
}

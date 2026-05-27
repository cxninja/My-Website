import { motion } from "framer-motion";
import { ArrowUp, ArrowDown } from "lucide-react";

interface MetricChipProps {
  label: string;
  delta: number;
  unit: string;
  delay?: number;
}

// Metrics where a DECREASE is the win (lower is better).
// When the case study reduces these, we want the chip styled positive (accent),
// not grey. Match on substring against the lowercased label.
const LOWER_IS_BETTER_KEYWORDS = [
  "downtime",
  "cost",
  "cpl",
  "cac",
  "cpa",
  "spend",
  "wait",
  "stockout",
  "churn",
  "attrition",
  "error",
  "defect",
  "rework",
  "manual",
  "time to",
  "latency",
  "friction",
  "complaint",
  "ticket",
  "leakage",
  "waste",
  "incident",
  "bounce",
  "drop-off",
  "dropoff",
];

function isLowerBetter(label: string): boolean {
  const l = label.toLowerCase();
  return LOWER_IS_BETTER_KEYWORDS.some((k) => l.includes(k));
}

export function MetricChip({ label, delta, unit, delay = 0 }: MetricChipProps) {
  const isPositive = delta > 0;
  const isNegative = delta < 0;
  const lowerBetter = isLowerBetter(label);

  // A change counts as an improvement when:
  //   higher-is-better metric goes up, OR
  //   lower-is-better metric goes down.
  const isImprovement = lowerBetter ? isNegative : isPositive;

  const colorClasses = isImprovement
    ? "bg-accent/10 text-accent border-accent/20"
    : "bg-muted text-muted-foreground border-border";

  // Arrow direction follows the actual delta sign, so readers can see
  // direction at a glance regardless of which way is "good".
  const ArrowIcon = delta < 0 ? ArrowDown : ArrowUp;
  const displayValue = Math.abs(delta);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5, ease: "easeOut" }}
      className={`inline-flex items-center gap-1 px-3 py-1 text-xs font-medium rounded-full border ${colorClasses}`}
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

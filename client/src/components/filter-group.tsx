import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface FilterGroupProps {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  options: string[];
  selected: Set<string>;
  onToggle: (value: string) => void;
  counts?: Record<string, number>;
  labelMap?: Record<string, string>;
  defaultOpen?: boolean;
}

export function FilterGroup({
  icon: Icon,
  title,
  options,
  selected,
  onToggle,
  counts,
  labelMap,
  defaultOpen = false,
}: FilterGroupProps) {
  const [open, setOpen] = useState(defaultOpen);
  const activeCount = selected.size;
  const slug = title.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className="mb-3 border-b border-border/60 last:border-b-0 pb-2">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="w-full flex items-center gap-2 py-2 text-xs uppercase tracking-[0.2em] text-muted-foreground font-bold hover:text-foreground transition-colors"
        data-testid={`filter-toggle-${slug}`}
      >
        <Icon className="w-3.5 h-3.5 text-accent/80" />
        <span>{title}</span>
        {activeCount > 0 && (
          <span className="ml-1 px-1.5 py-0.5 rounded-full bg-accent/15 text-accent text-[10px] tracking-normal font-semibold normal-case">
            {activeCount}
          </span>
        )}
        <ChevronDown
          className={`ml-auto w-4 h-4 text-muted-foreground transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <div className="space-y-1 mt-2" data-testid={`filter-options-${slug}`}>
          {options.map((opt) => {
            const isOn = selected.has(opt);
            const label = labelMap?.[opt] ?? opt;
            return (
              <label
                key={opt}
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted cursor-pointer transition-colors group"
              >
                <input
                  type="checkbox"
                  checked={isOn}
                  onChange={() => onToggle(opt)}
                  className="w-4 h-4 rounded border-border text-accent focus:ring-accent/50 accent-accent"
                />
                <span
                  className={`text-sm transition-colors ${
                    isOn ? "text-accent font-medium" : "text-foreground group-hover:text-accent"
                  }`}
                >
                  {label}
                </span>
                {counts && (
                  <span className="ml-auto text-xs text-muted-foreground">
                    {counts[opt] ?? 0}
                  </span>
                )}
              </label>
            );
          })}
        </div>
      )}
    </div>
  );
}

/**
 * A collapsible wrapper for a custom filter body (e.g. a slider).
 */
export function FilterSection({
  icon: Icon,
  title,
  activeCount = 0,
  defaultOpen = false,
  children,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  activeCount?: number;
  defaultOpen?: boolean;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const slug = title.toLowerCase().replace(/\s+/g, "-");
  return (
    <div className="mb-3 border-b border-border/60 last:border-b-0 pb-2">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="w-full flex items-center gap-2 py-2 text-xs uppercase tracking-[0.2em] text-muted-foreground font-bold hover:text-foreground transition-colors"
        data-testid={`filter-toggle-${slug}`}
      >
        <Icon className="w-3.5 h-3.5 text-accent/80" />
        <span>{title}</span>
        {activeCount > 0 && (
          <span className="ml-1 px-1.5 py-0.5 rounded-full bg-accent/15 text-accent text-[10px] tracking-normal font-semibold normal-case">
            {activeCount}
          </span>
        )}
        <ChevronDown
          className={`ml-auto w-4 h-4 text-muted-foreground transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && <div className="mt-2 px-2">{children}</div>}
    </div>
  );
}

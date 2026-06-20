import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";
import { TrendingUp } from "lucide-react";

export type MetricTone = "info" | "success" | "warning" | "violet";

interface HeaderMetricProps {
  icon: LucideIcon;
  label: string;
  value: string;
  tone: MetricTone;
  hint?: string;
  delta?: { value: string; positive: boolean };
  onClick?: () => void;
  editable?: boolean;
}

const toneMap: Record<MetricTone, string> = {
  info: "bg-info text-white",
  success: "bg-success text-white",
  warning: "bg-success text-white",
  violet: "bg-violet text-white",
};

const HeaderMetric = ({
  icon: Icon,
  label,
  value,
  tone,
  hint,
  delta,
  onClick,
  editable,
}: HeaderMetricProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "group flex items-center gap-3 rounded-xl px-3 py-2 text-left transition-colors",
        onClick && "hover:bg-white/5",
      )}
    >
      <div
        className={cn(
          "flex h-12 w-12 items-center justify-center rounded-xl shadow-sm",
          toneMap[tone],
        )}
      >
        <Icon className="h-6 w-6" />
      </div>
      <div className="min-w-0">
        <div className="text-[10px] font-semibold uppercase tracking-wider text-header-muted">
          {label}
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-lg font-bold text-header-foreground">
            {value}
          </span>
          {delta && (
            <span
              className={cn(
                "flex items-center gap-0.5 text-xs font-semibold",
                delta.positive ? "text-success" : "text-destructive",
              )}
            >
              {delta.value}
              <TrendingUp className="h-3 w-3" />
            </span>
          )}
        </div>
        {hint && (
          <div className="text-[10px] text-header-muted">
            {editable ? "Clique para editar" : hint}
          </div>
        )}
      </div>
    </button>
  );
};

export default HeaderMetric;
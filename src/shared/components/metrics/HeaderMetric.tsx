import { cn } from "@/lib/utils";
import { TrendingUp } from "lucide-react";

import { badge, textElement, layout, iconStyle } from "@/styles";

export type MetricTone = "info" | "success" | "warning" | "violet";

interface HeaderMetricProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  tone: MetricTone;
  hint?: string;
  delta?: {
    value: string;
    positive: boolean;
  };
  onClick?: () => void;
  editable?: boolean;
}

const HeaderMetric = ({
  icon,
  label,
  value,
  tone,
  hint,
  delta,
  onClick,
  editable,
}: HeaderMetricProps) => {
  const clickable = Boolean(onClick);

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(layout({ align: "center", direction: "row" }))}
    >
      <div className={cn(badge({ shadow: "sm", boxSize: "sm", tone: tone }), "mr-4")}>
        <div className={cn(iconStyle({ iconSize: "lg" }))}>{icon}</div>
      </div>

      <div className="my-[6px]">
        <div className={cn(layout({ align: "start" }))}>
          <div
            className={cn(
              "uppercase",
              textElement({
                textSize: "md",
                fontWeight: "medium",
                spacing: "large",
                textColor: "slate",
              }),
            )}
          >
            {label}
          </div>
        </div>

        <div className={cn(layout({ gap: "sm" }), "items-baseline")}>
          <span
            className={cn(textElement({ textSize: "xl", fontWeight: "bold", textColor: "dark" }))}
          >
            {value}
          </span>

          {delta && (
            <div
              className={cn(
                layout({ align: "center", gap: "xs" }),
                delta.positive ? "text-success" : "text-destructive",
              )}
            >
              <span
                className={textElement({
                  textSize: "xs",
                  fontWeight: "semibold",
                })}
              >
                {delta.value}
              </span>

              <TrendingUp className="h-3 w-3" />
            </div>
          )}
        </div>

        {hint && (
          <div
            className={cn(
              textElement({ textSize: "md", fontWeight: "medium", textColor: "slate" }),
            )}
          >
            {editable ? "Clique para editar" : hint}
          </div>
        )}
      </div>
    </button>
  );
};

export default HeaderMetric;

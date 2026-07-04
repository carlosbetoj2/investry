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
      className={cn(layout({ alignX: "center", alignY: "start" }), "ml-11 mr-11")}
    >
      <div className={cn(badge({ boxSize: "md", bgTone: tone }), "mr-4 mt-2")}>
        <div className={cn(iconStyle({ iconSize: "xl" }))}>{icon}</div>
      </div>

      <div className={cn(layout({ direction: "fixedSize", display: "block" }))}>
        <div className={cn(layout({ alignX: "start", alignY: "center" }))}>
          <div
            className={cn(
              "uppercase",
              textElement({
                textSize: "sm",
                fontWeight: "medium",
                spacing: "large",
                textColor: "slate",
              }),
            )}
          >
            {label}
          </div>
        </div>

        <div className={cn(layout({ gap: "sm", alignX: "start" }), "items-baseline")}>
          <span
            className={cn(textElement({ textSize: "xl", fontWeight: "bold", textColor: "dark" }))}
          >
            {value}
          </span>

          {delta && (
            <div
              className={cn(
                layout({ alignX: "center", alignY: "start", gap: "xs" }),
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
              textElement({ textSize: "sm", fontWeight: "medium", textColor: "slate" }),
              layout({ alignX: "start" }),
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

import { ArrowUpRight, TrendingUp } from "lucide-react";
import { brl, pct } from "@/shared/utils/format";
import { usePortfolioMetrics } from "@/features/portfolio/hooks/usePortfolioMetrics";

import {
  cardStyles,
  cardHeaderStyles,
  titleStyles,
  valueStyles,
  metricPositiveStyles,
  mutedTextStyles,
} from "./styles";
import { appearance, badge, iconStyle, layout } from "@/styles";
import { cn } from "@/lib/cn";

const Card = ({
  title,
  icon,
  children,
  tone,
}: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  tone?: "info" | "success";
}) => (
  <div className={cn(appearance({ rounded: "large", border: "full", shadow: "large" }), "p-4")}>
    <div className={cn(layout({ align: "between" }))}>
      <h4 className={cn(badge({ textTone: tone }))}>{title}</h4>
      {icon}
    </div>
    {children}
  </div>
);

const FinancialSummary = () => {
  const { total, expected, profit, profitPercent, proventos } = usePortfolioMetrics();

  return (
    <div className={cn(badge({ textTone: "info" }), layout({ gap: "md" }), "grid md:grid-cols-2")}>
      <Card
        title="Valor Aplicado / Esperado"
        icon={<ArrowUpRight className={cn(iconStyle({ iconSize: "md" }))} />}
      >
        <div className={cn(layout({ alignY: "end", gap: "sm" }), "mt-4")}>
          <span className={valueStyles({ size: "lg" })}>{brl(total)}</span>
          <span className="text-base text-muted-foreground">/ {brl(expected)}</span>
        </div>

        <div className="mt-6">
          <div className={mutedTextStyles()}>Ganho de Capital:</div>
          <div className={metricPositiveStyles()}>
            <span>+ {brl(profit)}</span>
            <span>+{pct(profitPercent)}</span>
            <TrendingUp className="h-4 w-4" />
          </div>
        </div>
      </Card>

      <Card
        title="Proventos Recebidos (12M)"
        icon={<TrendingUp className="h-5 w-5 text-success" />}
        tone="success"
      >
        <div className="mt-4">
          <div className={valueStyles({ size: "lg" })}>{brl(proventos)}</div>
        </div>

        <div className="mt-6">
          <div className={mutedTextStyles()}>Total:</div>
          <div className="text-sm font-semibold text-foreground">{brl(proventos)}</div>
        </div>
      </Card>
    </div>
  );
};

export default FinancialSummary;

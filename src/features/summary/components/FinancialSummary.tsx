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

const Card = ({
  title,
  icon,
  children,
  tone = "default",
}: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  tone?: "info" | "success" | "default";
}) => (
  <div className={cardStyles()}>
    <div className={cardHeaderStyles()}>
      <h4 className={titleStyles({ tone })}>{title}</h4>
      {icon}
    </div>
    {children}
  </div>
);

const FinancialSummary = () => {
  const { total, expected, profit, profitPercent, proventos } = usePortfolioMetrics();

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card
        title="Valor Aplicado / Esperado"
        icon={<ArrowUpRight className="h-5 w-5 text-info" />}
        tone="info"
      >
        <div className="mt-4 flex items-baseline gap-2">
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

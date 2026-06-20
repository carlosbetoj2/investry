import { ArrowUpRight, TrendingUp } from "lucide-react";
import SectionCard from "@/shared/components/cards/SectionCard";
import { brl, pct } from "@/shared/utils/format";
import { usePortfolioMetrics } from "@/features/portfolio/hooks/usePortfolioMetrics";

const Card = ({
  title,
  icon,
  children,
}: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) => (
  <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
    <div className="flex items-start justify-between">
      <h4 className="text-base font-semibold text-info">{title}</h4>
      {icon}
    </div>
    {children}
  </div>
);

const FinancialSummary = () => {
  const { total, expected, profit, profitPercent, proventos } =
    usePortfolioMetrics();
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card
        title="Valor Aplicado / Esperado"
        icon={<ArrowUpRight className="h-5 w-5 text-info" />}
      >
        <div className="mt-4 flex items-baseline gap-2">
          <span className="text-3xl font-extrabold text-foreground">
            {brl(total)}
          </span>
          <span className="text-base text-muted-foreground">
            / {brl(expected)}
          </span>
        </div>
        <div className="mt-6">
          <div className="text-sm text-muted-foreground">Ganho de Capital:</div>
          <div className="mt-1 flex items-center gap-2 text-sm font-semibold text-success">
            <span>+ {brl(profit)}</span>
            <span>+{pct(profitPercent)}</span>
            <TrendingUp className="h-4 w-4" />
          </div>
        </div>
      </Card>
      <Card
        title="Proventos Recebidos (12M)"
        icon={<TrendingUp className="h-5 w-5 text-success" />}
      >
        <div className="mt-4 text-3xl font-extrabold text-foreground">
          {brl(proventos)}
        </div>
        <div className="mt-6 text-sm text-muted-foreground">Total:</div>
        <div className="text-sm font-semibold text-foreground">
          {brl(proventos)}
        </div>
      </Card>
    </div>
  );
};

export default FinancialSummary;

export { SectionCard };
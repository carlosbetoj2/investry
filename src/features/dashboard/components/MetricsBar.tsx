import { DollarSign, TrendingUp, Coins, Wallet } from "lucide-react";
import HeaderMetric from "@/shared/components/metrics/HeaderMetric";
import { useWallet } from "@/features/portfolio/context/WalletContext";
import { usePortfolioMetrics } from "@/features/portfolio/hooks/usePortfolioMetrics";
import { brl, pct } from "@/shared/utils/format";

const MetricsBar = () => {
  const { availableBalance, setAvailableBalance } = useWallet();
  const { total, invested, profit, profitPercent, proventos } =
    usePortfolioMetrics();

  return (
    <div className="flex flex-wrap items-center justify-center gap-8">
      <HeaderMetric
        icon={DollarSign}
        label="Patrimônio Total"
        value={brl(total)}
        tone="info"
        hint={`Total investido: ${brl(invested)}`}
      />
      <HeaderMetric
        icon={TrendingUp}
        label="Lucro / Prejuízo"
        value={brl(profit)}
        tone="success"
        delta={{ value: pct(profitPercent), positive: profit >= 0 }}
      />
      <HeaderMetric
        icon={Coins}
        label="Total Proventos"
        value={brl(proventos)}
        tone="warning"
      />
      <HeaderMetric
        icon={Wallet}
        label="Saldo Disponível"
        value={brl(availableBalance)}
        tone="violet"
        editable
        hint="Clique para editar"
        onClick={() => {
          const v = window.prompt(
            "Saldo disponível (R$)",
            availableBalance.toString(),
          );
          if (v) {
            const n = parseFloat(v.replace(",", "."));
            if (!Number.isNaN(n)) setAvailableBalance(n);
          }
        }}
      />
    </div>
  );
};

export default MetricsBar;
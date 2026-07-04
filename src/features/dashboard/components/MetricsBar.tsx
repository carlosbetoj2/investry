import {
  dollar,
  coin,
  availableBalance as availableBalanceIcon,
  upGraph,
} from "@/assets/images/index.ts";

import HeaderMetric from "@/shared/components/metrics/HeaderMetric";
import { useWallet } from "@/features/portfolio/context/WalletContext";
import { usePortfolioMetrics } from "@/features/portfolio/hooks/usePortfolioMetrics";
import { brl, pct } from "@/shared/utils/format";

import { layout } from "@/styles";

import { cn } from "@/lib/cn";

const MetricsBar = () => {
  const { availableBalance, setAvailableBalance } = useWallet();
  const { total, invested, profit, profitPercent, proventos } = usePortfolioMetrics();

  return (
    <div
      className={cn(
        layout({ align: "between", direction: "row" }),
        "mx-auto py-[6px] max-w-[100%]",
      )}
    >
      <div>
        <HeaderMetric
          icon={<img src={dollar} alt="dólar" />}
          label="Patrimônio Total"
          value={brl(total)}
          tone="info"
          hint={`Total investido: ${brl(invested)}`}
        />
      </div>

      <div className={layout()}>
        <HeaderMetric
          icon={<img src={upGraph} alt="seta gráfica" />}
          label="Lucro / Prejuízo"
          value={brl(profit)}
          tone="success"
          delta={{
            value: pct(profitPercent),
            positive: profit >= 0,
          }}
        />
      </div>

      <div className={layout()}>
        <HeaderMetric
          icon={<img src={coin} alt="moeda" />}
          label="Total Proventos"
          value={brl(proventos)}
          tone="warning"
        />
      </div>

      <div
        onClick={() => {
          const v = window.prompt("Saldo disponível (R$)", availableBalance.toString());

          if (v) {
            const n = parseFloat(v.replace(",", "."));
            if (!Number.isNaN(n)) {
              setAvailableBalance(n);
            }
          }
        }}
      >
        <HeaderMetric
          icon={<img src={availableBalanceIcon} alt="saldo disponível" />}
          label="Saldo Disponível"
          value={brl(availableBalance)}
          tone="violet"
          editable
          hint="Clique para editar"
        />
      </div>
    </div>
  );
};

export default MetricsBar;

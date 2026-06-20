import { memo } from "react";
import { ChevronDown, ChevronRight, Info } from "lucide-react";
import { cn } from "@/lib/utils";
import { brl, pct } from "@/shared/utils/format";
import type { CategoryGroup } from "../types/portfolio-types";
import { useWallet } from "../context/WalletContext";
import { computeIdealQuantity } from "../domain/portfolio-calculations";
import PortfolioRow from "./PortfolioTable/PortfolioRow";

interface PortfolioDrawerProps {
  group: CategoryGroup;
  totalPortfolio: number;
  expanded: boolean;
  onToggle: () => void;
}

const PortfolioDrawer = ({
  group,
  totalPortfolio,
  expanded,
  onToggle,
}: PortfolioDrawerProps) => {
  const { targets } = useWallet();

  return (
    <div className="overflow-hidden rounded-xl border border-border">
      <button
        type="button"
        onClick={onToggle}
        className={cn(
          "flex w-full items-center gap-4 bg-secondary/40 px-6 py-4 text-left transition-colors hover:bg-secondary",
        )}
      >
        {expanded ? (
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        ) : (
          <ChevronRight className="h-4 w-4 text-muted-foreground" />
        )}
        <div className="flex min-w-[180px] items-center gap-2">
          <span className="text-base font-bold text-foreground">
            {group.category}
          </span>
          <span className="text-xs text-muted-foreground">
            {group.assets.length} ativos
          </span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <span className="text-xs uppercase tracking-wider text-muted-foreground">
            Valor Total:
          </span>
          <span className="font-bold text-foreground">
            {brl(group.totalValue)}
          </span>
          <span className="text-muted-foreground">
            / {brl(group.totalExpected)}
          </span>
          <Info className="h-3.5 w-3.5 text-muted-foreground" />
        </div>
        <div className="ml-auto flex items-center gap-6 text-sm">
          <div>
            <span className="text-xs uppercase tracking-wider text-muted-foreground">
              Variação:
            </span>{" "}
            <span className="font-bold">{brl(group.variation)}</span>
          </div>
          <div>
            <span className="text-xs uppercase tracking-wider text-muted-foreground">
              % em Carteira:
            </span>{" "}
            <span className="font-bold">{pct(group.walletPercent)}</span>{" "}
            <span className="text-muted-foreground">
              {pct(group.targetPercent, 0)} (meta)
            </span>
          </div>
        </div>
      </button>

      {expanded && (
        <div>
          <div className="grid grid-cols-12 gap-2 border-b border-border bg-card px-6 py-3 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
            <div className="col-span-2">Ativo</div>
            <div className="col-span-1">Preço Médio</div>
            <div className="col-span-1">Cotação</div>
            <div className="col-span-1">Quantidade</div>
            <div className="col-span-1">Qtn. Ideal</div>
            <div className="col-span-1">Comprar?</div>
            <div className="col-span-1">% Carteira</div>
            <div className="col-span-1">% Ideal</div>
            <div className="col-span-1">Saldo</div>
            <div className="col-span-1">Nota</div>
            <div className="col-span-1">Opções</div>
          </div>
          {group.assets.map((asset) => {
            const ideal = computeIdealQuantity(
              asset,
              totalPortfolio,
              targets[asset.category],
              group.assets.length,
            );
            return (
              <PortfolioRow
                key={asset.id}
                asset={asset}
                totalPortfolio={totalPortfolio}
                idealQuantity={ideal}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default memo(PortfolioDrawer);
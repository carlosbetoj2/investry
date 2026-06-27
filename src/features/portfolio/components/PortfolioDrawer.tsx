import { memo } from "react";
import { ChevronDown, ChevronRight, Info } from "lucide-react";
import { cn } from "@/lib/utils";
import { brl, pct } from "@/shared/utils/format";
import type { CategoryGroup } from "../types/portfolio-types";
import { useWallet } from "../context/WalletContext";
import { computeIdealQuantity } from "../domain/portfolio-calculations";
import PortfolioRow from "./PortfolioTable/PortfolioRow";

import {
  drawerContainer,
  drawerButton,
  drawerHeaderGroup,
  drawerTitle,
  drawerMetaText,
  drawerValueBlock,
  drawerRightGroup,
  drawerSectionLabel,
  drawerGridHeader,
  iconStyle,
  infoIconStyle,
} from "./styles";

interface PortfolioDrawerProps {
  group: CategoryGroup;
  totalPortfolio: number;
  expanded: boolean;
  onToggle: () => void;
}

const PortfolioDrawer = ({ group, totalPortfolio, expanded, onToggle }: PortfolioDrawerProps) => {
  const { targets } = useWallet();

  return (
    <div className={cn(drawerContainer())}>
      <button type="button" onClick={onToggle} className={cn(drawerButton({ active: expanded }))}>
        {expanded ? (
          <ChevronDown className={iconStyle()} />
        ) : (
          <ChevronRight className={iconStyle()} />
        )}

        <div className={cn(drawerHeaderGroup())}>
          <span className={drawerTitle()}>{group.category}</span>
          <span className={drawerMetaText()}>{group.assets.length} ativos</span>
        </div>

        <div className={cn(drawerValueBlock())}>
          <span className={drawerSectionLabel()}>Valor Total:</span>
          <span className="font-bold text-foreground">{brl(group.totalValue)}</span>
          <span className="text-muted-foreground">/ {brl(group.totalExpected)}</span>
          <Info className={infoIconStyle()} />
        </div>

        <div className={cn(drawerRightGroup())}>
          <div>
            <span className={drawerSectionLabel()}>Variação:</span>{" "}
            <span className="font-bold">{brl(group.variation)}</span>
          </div>

          <div>
            <span className={drawerSectionLabel()}>% em Carteira:</span>{" "}
            <span className="font-bold">{pct(group.walletPercent)}</span>{" "}
            <span className="text-muted-foreground">{pct(group.targetPercent, 0)} (meta)</span>
          </div>
        </div>
      </button>

      {expanded && (
        <div>
          <div className={cn(drawerGridHeader())}>
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

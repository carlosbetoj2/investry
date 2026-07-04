import { memo } from "react";
import { ChevronDown, ChevronRight, Info } from "lucide-react";
import { cn } from "@/lib/utils";
import { brl, pct } from "@/shared/utils/format";
import type { CategoryGroup } from "../types/portfolio-types";
import { useWallet } from "../context/WalletContext";
import { computeIdealQuantity } from "../domain/portfolio-calculations";
import PortfolioRow from "./PortfolioTable/PortfolioRow";

import { appearance, drawer, textElement, layout, iconStyle } from "@/styles";

interface PortfolioDrawerProps {
  group: CategoryGroup;
  totalPortfolio: number;
  expanded: boolean;
  onToggle: () => void;
}

const PortfolioDrawer = ({ group, totalPortfolio, expanded, onToggle }: PortfolioDrawerProps) => {
  const { targets } = useWallet();

  return (
    <div className={cn(appearance({ border: "full", rounded: "large" }))}>
      <button
        type="button"
        onClick={onToggle}
        className={cn(
          drawer({
            drawerType: "secondaryDrawer",
            textColor: "slate",
            textSize: "lg",
            fontWeight: "medium",
            spacing: "medium",
            active: expanded,
          }),
          layout({
            gap: "xs",
            screen: "full",
            align: "between",
            alignY: "start",
          }),
          "px-4 py-[11px]",
        )}
      >
        <div className={cn(layout({ align: "start" }), "")}>
          <div className={cn(iconStyle({ iconSize: "xl", iconColor: "primaryColor" }))}>
            {expanded ? <ChevronDown /> : <ChevronRight />}
          </div>

          <span className={cn(textElement({ fontWeight: "extrabold", textColor: "dark" }), "pl-2")}>
            {group.category}
          </span>
          <span className={cn(textElement({ textSize: "sm" }), "pl-2")}>
            {group.assets.length} ativos
          </span>
        </div>

        <div className={cn(layout({ display: "onlyDesktop" }), "gap-24")}>
          <div className={cn(layout({ alignY: "start" }), appearance({ border: "left" }), "pl-4")}>
            <span>Valor Total:</span>
            <span
              className={cn(textElement({ fontWeight: "extrabold", textColor: "black" }), "pl-2")}
            >
              {brl(group.totalValue)}
            </span>
            <span className={cn(textElement({ textSize: "sm" }), "pl-2")}>
              {" "}
              / {brl(group.totalExpected)}
            </span>
            <Info className={cn(iconStyle({ iconSize: "sm", animation: "zoom" }), "ml-1")} />
          </div>

          <div className={cn(appearance({ border: "left" }), "pl-4")}>
            <span>Variação:</span>
            <span
              className={cn(textElement({ textColor: "black", fontWeight: "extrabold" }), "pl-2")}
            >
              {brl(group.variation)}
            </span>
          </div>

          <div className={cn(layout({ alignY: "start" }), appearance({ border: "left" }), "pl-4")}>
            <span>% em Carteira:</span>
            <span
              className={cn(textElement({ textColor: "black", fontWeight: "extrabold" }), "pl-2")}
            >
              {pct(group.walletPercent)}
            </span>
            <span className={cn(textElement({ textSize: "md" }), "pl-2")}>
              {pct(group.targetPercent, 0)} (meta)
            </span>
          </div>
        </div>
      </button>

      {expanded && (
        <div className={cn(layout({ direction: "row", display: "block" }))}>
          <div className="min-w-max">
            <div
              className={cn(
                layout({ gap: "sm" }),
                textElement({
                  textSize: "sm",
                  fontWeight: "semibold",
                  spacing: "large",
                  textColor: "black",
                }),
                appearance({ bg: "gray" }),
                "grid grid-cols-[1.64fr_1.24fr_repeat(9,minmax(0,1fr))] px-6 border-b border-border py-1",
              )}
            >
              <div className={cn(layout({ direction: "fixedBox", layer: "up" }))}>Ativo</div>
              <div>Preço Médio</div>
              <div>Cotação</div>
              <div>Quantidade</div>
              <div>Qtn. Ideal</div>
              <div>Comprar?</div>
              <div>% Carteira</div>
              <div>% Ideal</div>
              <div>Saldo</div>
              <div>Nota</div>
              <div>Opções</div>
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
        </div>
      )}
    </div>
  );
};

export default memo(PortfolioDrawer);

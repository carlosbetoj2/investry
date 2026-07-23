import { memo } from "react";
import { ChevronDown, ChevronRight, Info } from "lucide-react";
import { cn } from "@/lib/cn";
import { brl, pct } from "@/shared/utils/format";
import type { CategoryGroup } from "../types/portfolio-types";
import { useWallet } from "../hooks/useWallet";
import { computeIdealQuantity, getTargetPercent } from "../domain/portfolio-calculations";
import PortfolioRow from "./PortfolioTable/PortfolioRow";

import { appearance, dropdownType, textElement, layout, iconStyle } from "@/styles";

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
        data-path="PortfolioDrawer"
        className={cn(
          dropdownType({
            dropdownType: "primaryDropdown",
            textColor: "blackSlate",
            textSize: "lg",
            fontWeight: "medium",
            spacing: "small",
            active: expanded,
          }),
          layout({
            align: "between",
            alignY: "start",
          }),
          "px-4 py-[11px] w-full",
        )}
      >
        <div className={cn(layout({ align: "start" }))}>
          <div className={cn(iconStyle({ width: "xl", iconColor: "primaryColor" }))}>
            {expanded ? <ChevronDown /> : <ChevronRight />}
          </div>

          <span className={cn(textElement({ fontWeight: "extrabold", textColor: "dark" }), "pl-2")}>
            {group.category}
          </span>
          <span className={cn(textElement({ textSize: "sm" }), "pl-2")}>
            {group.assets.length} ativos
          </span>
        </div>

        <div className={cn(layout({ screen: "onlyDesktop" }), "gap-24")}>
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
            <Info className={cn(iconStyle({ width: "sm", animation: "zoom" }), "ml-1")} />
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
                layout({ grid: "table", display: "grid" }),
                textElement({
                  textSize: "sm",
                  fontWeight: "semibold",
                  spacing: "medium",
                  textColor: "black",
                }),
                appearance({ bg: "gray" }),
                "px-5 border-b border-border py-1",
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
                getTargetPercent(targets, asset.category),
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

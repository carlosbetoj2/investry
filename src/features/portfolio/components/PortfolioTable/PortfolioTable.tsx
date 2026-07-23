import { useCallback } from "react";
import { useWallet } from "../../hooks/useWallet";
import { usePortfolioMetrics } from "../../hooks/usePortfolioMetrics";
import PortfolioDrawer from "../PortfolioDrawer";
import { cn } from "@/lib/cn";
import { layout } from "@/styles";

const PortfolioTable = () => {
  const { expandedCategory, setExpandedCategory } = useWallet();
  const { groups, total } = usePortfolioMetrics();

  const toggle = useCallback(
    (category: string) => setExpandedCategory(expandedCategory === category ? null : category),
    [expandedCategory, setExpandedCategory],
  );

  return (
    <div className={cn(layout({ direction: "col", gap: "md" }))}>
      {groups.map((g) => (
        <PortfolioDrawer
          key={g.category}
          group={g}
          totalPortfolio={total}
          expanded={expandedCategory === g.category}
          onToggle={() => toggle(g.category)}
        />
      ))}
    </div>
  );
};

export default PortfolioTable;

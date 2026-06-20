import { useCallback } from "react";
import { useWallet } from "../../context/WalletContext";
import { usePortfolioMetrics } from "../../hooks/usePortfolioMetrics";
import PortfolioDrawer from "../PortfolioDrawer";

const PortfolioTable = () => {
  const { expandedCategory, setExpandedCategory } = useWallet();
  const { groups, total } = usePortfolioMetrics();

  const toggle = useCallback(
    (category: string) =>
      setExpandedCategory(expandedCategory === category ? null : category),
    [expandedCategory, setExpandedCategory],
  );

  return (
    <div className="flex flex-col gap-3">
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
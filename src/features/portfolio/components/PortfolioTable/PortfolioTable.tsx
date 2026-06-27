import { useCallback } from "react";
import { useWallet } from "../../context/WalletContext";
import { usePortfolioMetrics } from "../../hooks/usePortfolioMetrics";
import PortfolioDrawer from "../PortfolioDrawer";
import { portfolioTableStyles } from "./styles";

type PortfolioTableProps = {
  density?: "compact" | "normal" | "spacious";
};

const PortfolioTable = ({ density }: PortfolioTableProps) => {
  const { expandedCategory, setExpandedCategory } = useWallet();
  const { groups, total } = usePortfolioMetrics();

  const toggle = useCallback(
    (category: string) => setExpandedCategory(expandedCategory === category ? null : category),
    [expandedCategory, setExpandedCategory],
  );

  return (
    <div className={portfolioTableStyles({ density })}>
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

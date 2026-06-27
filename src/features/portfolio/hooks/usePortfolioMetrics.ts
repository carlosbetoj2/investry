import { useMemo } from "react";
import { useWallet } from "../context/WalletContext";
import {
  groupByCategory,
  totalInvested,
  totalPortfolioValue,
} from "../domain/portfolio-calculations";

export const usePortfolioMetrics = () => {
  const { assets, targets, availableBalance } = useWallet();

  return useMemo(() => {
    const total = totalPortfolioValue(assets);
    const invested = totalInvested(assets);
    const profit = total - invested;
    const profitPercent = invested > 0 ? profit / invested : 0;
    const groups = groupByCategory(assets, targets);
    const expected = total + availableBalance;
    return {
      total,
      invested,
      profit,
      profitPercent,
      expected,
      groups,
      proventos: 0,
    };
  }, [assets, targets, availableBalance]);
};

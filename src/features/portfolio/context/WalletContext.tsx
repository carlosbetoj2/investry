import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import type { Asset, CategoryTargets, WalletType } from "../types/portfolio-types";
import { initialAssets, initialTargets } from "../data/initial-assets";

interface WalletContextValue {
  wallet: WalletType;
  setWallet: (w: WalletType) => void;
  assets: Asset[];
  targets: CategoryTargets;
  availableBalance: number;
  expandedCategory: string | null;
  setExpandedCategory: (c: string | null) => void;
  setAvailableBalance: (v: number) => void;
  updateAsset: (id: string, patch: Partial<Asset>) => void;
  updateTarget: (category: keyof CategoryTargets, percent: number) => void;
}

const WalletContext = createContext<WalletContextValue | undefined>(undefined);

export const WalletProvider = ({ children }: { children: ReactNode }) => {
  const [wallet, setWallet] = useState<WalletType>("previdenciaria");
  const [assets, setAssets] = useState<Asset[]>(initialAssets);
  const [targets, setTargets] = useState<CategoryTargets>(initialTargets);
  const [availableBalance, setAvailableBalance] = useState<number>(234.1);
  const [expandedCategory, setExpandedCategory] = useState<string | null>("Ações");

  const updateAsset = useCallback((id: string, patch: Partial<Asset>) => {
    setAssets((prev) => prev.map((a) => (a.id === id ? { ...a, ...patch } : a)));
  }, []);

  const updateTarget = useCallback((category: keyof CategoryTargets, percent: number) => {
    setTargets((prev) => ({ ...prev, [category]: percent }));
  }, []);

  const value = useMemo<WalletContextValue>(
    () => ({
      wallet,
      setWallet,
      assets,
      targets,
      availableBalance,
      expandedCategory,
      setExpandedCategory,
      setAvailableBalance,
      updateAsset,
      updateTarget,
    }),
    [wallet, assets, targets, availableBalance, expandedCategory, updateAsset, updateTarget],
  );

  return <WalletContext.Provider value={value}>{children}</WalletContext.Provider>;
};

export const useWallet = () => {
  const ctx = useContext(WalletContext);
  if (!ctx) throw new Error("useWallet must be used inside WalletProvider");
  return ctx;
};

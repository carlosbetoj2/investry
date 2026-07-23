import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import type { Asset } from "../types/asset-types";
import { defaultCategoryTargets, type CategoryTargets, type Wallet } from "../types/wallet-types";
import { adaptWallets } from "../adapters/wallet-adapter";
import { fetchUserWalletPortfolio, updatePortfolioTicker } from "../services/portfolio-service";
import {
  fetchWalletPreferences,
  upsertWalletPreference,
} from "../services/wallet-preference-service";
import { getSession, onAuthStateChange } from "@/features/auth/services/auth-service";

interface WalletContextValue {
  wallets: Wallet[];
  wallet: Wallet | null;
  selectedWalletId: string;
  setWallet: (walletId: string) => void;
  loading: boolean;
  assets: Asset[];
  targets: CategoryTargets;
  availableBalance: number;
  expandedCategory: string | null;
  setExpandedCategory: (category: string | null) => void;
  setAvailableBalance: (value: number) => void;
  updateAsset: (id: string, patch: Partial<Asset>) => Promise<void>;
  updateTarget: (category: keyof CategoryTargets, percent: number) => Promise<void>;
}

const WalletContext = createContext<WalletContextValue | undefined>(undefined);

const resolveTargets = (wallet: Wallet | null): CategoryTargets =>
  wallet?.targets ?? defaultCategoryTargets;

export const WalletProvider = ({ children }: { children: ReactNode }) => {
  const queryClient = useQueryClient();
  const [userId, setUserId] = useState<string | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [selectedWalletId, setSelectedWalletId] = useState("");
  const [availableBalance, setAvailableBalance] = useState<number>(234.1);
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const walletsQueryKey = useMemo(() => ["wallets", userId] as const, [userId]);

  useEffect(() => {
    let mounted = true;
    let unsubscribe: (() => void) | undefined;

    async function initialize() {
      const { data, error } = await getSession();

      if (!mounted) {
        return;
      }

      if (!error) {
        setUserId(data.session?.user.id ?? null);
      } else {
        setUserId(null);
      }

      setAuthLoading(false);

      const response = onAuthStateChange(async (_, session) => {
        if (!mounted) {
          return;
        }

        setUserId(session?.user.id ?? null);
        setSelectedWalletId("");
      });

      unsubscribe = response.data?.subscription?.unsubscribe;
    }

    initialize();

    return () => {
      mounted = false;
      unsubscribe?.();
    };
  }, []);

  const walletsQuery = useQuery({
    queryKey: walletsQueryKey,
    enabled: Boolean(userId),
    queryFn: async () => {
      if (!userId) {
        return [] as Wallet[];
      }

      const rawWallets = await fetchUserWalletPortfolio(userId);
      const preferences = await fetchWalletPreferences(rawWallets.map((wallet) => wallet.id));
      return adaptWallets(rawWallets, preferences);
    },
  });

  const wallets = walletsQuery.data ?? [];

  useEffect(() => {
    if (wallets.length === 0) {
      if (selectedWalletId) {
        setSelectedWalletId("");
      }
      return;
    }

    if (!selectedWalletId || !wallets.some((wallet) => wallet.id === selectedWalletId)) {
      setSelectedWalletId(wallets[0].id);
    }
  }, [selectedWalletId, wallets]);

  const wallet = useMemo(
    () => wallets.find((entry) => entry.id === selectedWalletId) ?? wallets[0] ?? null,
    [selectedWalletId, wallets],
  );

  const assets = wallet?.assets ?? [];
  const targets = resolveTargets(wallet);

  const patchWalletCache = useCallback(
    (updater: (previous: Wallet[] | undefined) => Wallet[] | undefined) => {
      queryClient.setQueryData<Wallet[]>(walletsQueryKey, updater);
    },
    [queryClient, walletsQueryKey],
  );

  const updateAsset = useCallback(
    async (id: string, patch: Partial<Asset>) => {
      if (!userId || !wallet) {
        return;
      }

      patchWalletCache((previous) =>
        previous?.map((entry) => {
          if (entry.id !== wallet.id) {
            return entry;
          }

          return {
            ...entry,
            assets: entry.assets.map((asset) => (asset.id === id ? { ...asset, ...patch } : asset)),
          };
        }),
      );

      try {
        await updatePortfolioTicker({
          id,
          userId,
          quantity: patch.quantity,
          averagePrice: patch.averagePrice ?? undefined,
          score: patch.score ?? undefined,
          notes: patch.notes === undefined ? undefined : patch.notes,
        });
      } catch (error) {
        await walletsQuery.refetch();
        throw error;
      }
    },
    [patchWalletCache, userId, wallet, walletsQuery],
  );

  const updateTarget = useCallback(
    async (category: keyof CategoryTargets, percent: number) => {
      if (!userId || !wallet) {
        return;
      }

      const nextTargets = {
        ...targets,
        [category]: percent,
      };

      patchWalletCache((previous) =>
        previous?.map((entry) =>
          entry.id === wallet.id
            ? {
                ...entry,
                targets: nextTargets,
              }
            : entry,
        ),
      );

      try {
        await upsertWalletPreference(wallet.id, nextTargets);
      } catch (error) {
        await walletsQuery.refetch();
        throw error;
      }
    },
    [patchWalletCache, targets, userId, wallet, walletsQuery],
  );

  const value = useMemo<WalletContextValue>(
    () => ({
      wallets,
      wallet,
      selectedWalletId,
      setWallet: setSelectedWalletId,
      loading: authLoading || walletsQuery.isLoading,
      assets,
      targets,
      availableBalance,
      expandedCategory,
      setExpandedCategory,
      setAvailableBalance,
      updateAsset,
      updateTarget,
    }),
    [
      wallets,
      wallet,
      selectedWalletId,
      authLoading,
      walletsQuery.isLoading,
      assets,
      targets,
      availableBalance,
      expandedCategory,
      updateAsset,
      updateTarget,
    ],
  );

  return <WalletContext.Provider value={value}>{children}</WalletContext.Provider>;
};

export const useWallet = () => {
  const ctx = useContext(WalletContext);
  if (!ctx) throw new Error("useWallet must be used inside WalletProvider");
  return ctx;
};

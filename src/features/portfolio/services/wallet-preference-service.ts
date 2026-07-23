import { supabase } from "../../../lib/supabase/client";
import type { CategoryTargets } from "../types/wallet-types";

export interface WalletPreferenceRecord {
  wallet_id: string;
  percentual_acoes: number | string | null;
  percentual_fiis: number | string | null;
  percentual_etfs: number | string | null;
}

export async function fetchWalletPreferences(
  walletIds: string[],
): Promise<WalletPreferenceRecord[]> {
  if (walletIds.length === 0) {
    return [];
  }

  const { data, error } = await supabase
    .from("wallet_preferences")
    .select("wallet_id, percentual_acoes, percentual_fiis, percentual_etfs")
    .in("wallet_id", walletIds);

  if (error) {
    throw error;
  }

  return (data ?? []) as WalletPreferenceRecord[];
}

export async function upsertWalletPreference(walletId: string, targets: CategoryTargets) {
  const { error } = await supabase.from("wallet_preferences").upsert(
    {
      wallet_id: walletId,
      percentual_acoes: targets.Ações,
      percentual_fiis: targets.FIIs,
      percentual_etfs: targets.ETFs,
    },
    {
      onConflict: "wallet_id",
    },
  );

  if (error) {
    throw error;
  }
}

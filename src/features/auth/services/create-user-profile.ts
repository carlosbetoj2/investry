import { supabase } from "../../../lib/supabase/client";

export async function createUserProfile(userId: string) {
  try {
    const { error: userSettingsError } = await supabase.from("user_settings").upsert(
      {
        user_id: userId,
        available_balance: 0,
      },
      {
        onConflict: "user_id",
      },
    );

    if (userSettingsError) {
      return { error: userSettingsError };
    }

    const { data: wallet, error: walletError } = await supabase
      .from("wallets")
      .upsert(
        {
          user_id: userId,
          nome: "Carteira01",
        },
        {
          onConflict: "user_id,nome",
        },
      )
      .select()
      .single();

    if (walletError) {
      return { error: walletError };
    }

    const { error: preferencesError } = await supabase.from("wallet_preferences").upsert(
      {
        wallet_id: wallet.id,
        percentual_acoes: 50,
        percentual_fiis: 30,
        percentual_etfs: 20,
      },
      {
        onConflict: "wallet_id",
      },
    );

    if (preferencesError) {
      return { error: preferencesError };
    }

    return {
      success: true,
    };
  } catch (error) {
    return {
      error,
    };
  }
}

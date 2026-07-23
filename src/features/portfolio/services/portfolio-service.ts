import { supabase } from "../../../lib/supabase/client";

export interface PortfolioCompanyRecord {
  nome: string | null;
  icon_url: string | null;
  tipo_ticker: string | null;
  codigo_bolsa: string | null;
}

export interface PortfolioTickerRecord {
  id: string;
  wallet_id?: string | null;
  ticker_id?: string | null;
  quantidade: number | string | null;
  preco_medio: number | string | null;
  score: number | string | null;
  notes: string | null;
  ticker: {
    id: string;
    ticker: string | null;
    preco_atual: number | string | null;
    company: PortfolioCompanyRecord | null;
  } | null;
}

export interface WalletPortfolioRecord {
  id: string;
  nome: string | null;
  user_id: string;
  portfolio_tickers: PortfolioTickerRecord[] | null;
}

const walletSelect = `
  id,
  nome,
  user_id,
  portfolio_tickers(
    id,
    wallet_id,
    ticker_id,
    quantidade,
    preco_medio,
    score,
    notes,
    ticker:tickers(
      id,
      ticker,
      preco_atual,
      company:companies(
        nome,
        icon_url,
        tipo_ticker,
        codigo_bolsa
      )
    )
  )
`;

export async function fetchUserWalletPortfolio(userId: string): Promise<WalletPortfolioRecord[]> {
  const { data, error } = await supabase
    .from("wallets")
    .select(walletSelect)
    .eq("user_id", userId)
    .order("created_at", { ascending: true });

  if (error) {
    throw error;
  }

  const wallets = (data ?? []) as WalletPortfolioRecord[];

  if (process.env.NODE_ENV !== "production") {
    const tickerRows = wallets.flatMap((wallet) => wallet.portfolio_tickers ?? []);
    const missingTickerRows = tickerRows.filter((row) => row.ticker == null);

    if (missingTickerRows.length > 0) {
      console.warn(
        "[portfolio-service] portfolio_tickers with missing ticker relation",
        missingTickerRows,
      );
    }
  }

  return wallets;
}

export async function updatePortfolioTicker(input: {
  id: string;
  userId: string;
  quantity?: number;
  averagePrice?: number;
  score?: number;
  notes?: string | null;
}) {
  const payload: Record<string, number | string | null> = {};

  if (typeof input.quantity === "number") {
    payload.quantidade = input.quantity;
  }

  if (typeof input.averagePrice === "number") {
    payload.preco_medio = input.averagePrice;
  }

  if (typeof input.score === "number") {
    payload.score = input.score;
  }

  if (input.notes !== undefined) {
    payload.notes = input.notes;
  }

  if (Object.keys(payload).length === 0) {
    return;
  }

  const { error } = await supabase
    .from("portfolio_tickers")
    .update(payload)
    .eq("id", input.id)
    .eq("user_id", input.userId);

  if (error) {
    throw error;
  }
}

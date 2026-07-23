import type { Asset, AssetCategory } from "../types/asset-types";
import { type CategoryTargets, type Wallet } from "../types/wallet-types";
import type { PortfolioTickerRecord, WalletPortfolioRecord } from "../services/portfolio-service";
import type { WalletPreferenceRecord } from "../services/wallet-preference-service";

const toNumber = (value: number | string | null | undefined): number => {
  if (value === null || value === undefined) {
    return 0;
  }

  const parsed = typeof value === "number" ? value : Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
};

const normalizeText = (value: string | null | undefined): string => value?.trim() ?? "";

const removeAccents = (value: string) => value.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

export const resolveAssetCategory = (rawType: string | null | undefined): AssetCategory => {
  switch (rawType?.toUpperCase()) {
    case "ACAO":
      return "Ações";
    case "FII":
      return "FIIs";
    case "ETF":
      return "ETFs";
    case "BDR":
      return "BDRs";
    case "REIT":
      return "REITs";
    case "CRIPTOMOEDA":
      return "Criptomoedas";
    default:
      return "Ações";
  }
};

export const adaptAsset = (row: PortfolioTickerRecord): Asset => {
  const ticker = row.ticker;
  const company = ticker?.company;

  return {
    id: row.id,
    tickerId: ticker?.id ?? "",
    ticker: normalizeText(ticker?.ticker) || "ATIVO",
    icon: company?.icon_url ?? null,
    market: company?.codigo_bolsa ?? null,
    price: toNumber(ticker?.preco_atual),
    quantity: toNumber(row.quantidade),
    averagePrice:
      row.preco_medio === null || row.preco_medio === undefined ? null : toNumber(row.preco_medio),
    category: resolveAssetCategory(company?.tipo_ticker),
    score: row.score === null || row.score === undefined ? null : toNumber(row.score),
    notes: row.notes ?? null,
  };
};

const adaptTargets = (row?: WalletPreferenceRecord | null): CategoryTargets => ({
  Ações: row ? toNumber(row.percentual_acoes) : 0,
  FIIs: row ? toNumber(row.percentual_fiis) : 0,
  ETFs: row ? toNumber(row.percentual_etfs) : 0,
});

export const adaptWallets = (
  wallets: WalletPortfolioRecord[],
  preferences: WalletPreferenceRecord[],
): Wallet[] => {
  const preferencesByWalletId = new Map(
    preferences.map((preference) => [preference.wallet_id, preference]),
  );

  return wallets.map((wallet) => ({
    id: wallet.id,
    nome: wallet.nome ?? "Carteira",
    user_id: wallet.user_id,
    assets: (wallet.portfolio_tickers ?? []).map(adaptAsset),
    targets: adaptTargets(preferencesByWalletId.get(wallet.id)),
  }));
};

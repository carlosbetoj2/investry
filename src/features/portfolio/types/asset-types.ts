export type AssetCategory =
  | "Ações"
  | "FIIs"
  | "ETFs"
  | "Cripto"
  | "REITs"
  | "BDRs"
  | "Criptomoedas";

export interface Asset {
  id: string;
  tickerId: string;
  ticker: string;
  icon: string | null;
  market?: string | null;
  price: number;
  quantity: number;
  averagePrice: number | null;
  category: AssetCategory;
  score: number | null;
  notes: string | null;
}

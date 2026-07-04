export type AssetCategory = "Ações" | "FIIs" | "ETFs" | "Cripto" | "REITS" | "BDRs";

export interface Asset {
  id: string;
  icon: string;
  ticker: string;
  price: number;
  quantity: number;
  averagePrice: number;
  idealQuantity: number;
  category: AssetCategory;
  note: number;
}

export interface CategoryTargets {
  Ações: number;
  FIIs: number;
  ETFs: number;
  Cripto: number;
  REITS: number;
  BDRs: number;
}

export interface CategoryGroup {
  category: AssetCategory;
  assets: Asset[];
  totalValue: number;
  totalExpected: number;
  variation: number;
  walletPercent: number;
  targetPercent: number;
}

export type WalletType = "previdenciaria" | "swingtrade";

import type { Asset, AssetCategory } from "./asset-types";
import type { CategoryTargets } from "./wallet-types";

export type { Asset, AssetCategory, CategoryTargets };

export interface CategoryGroup {
  category: AssetCategory;
  assets: Asset[];
  totalValue: number;
  totalExpected: number;
  variation: number;
  walletPercent: number;
  targetPercent: number;
}

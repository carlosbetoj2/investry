import type {
  Asset,
  AssetCategory,
  CategoryGroup,
  CategoryTargets,
} from "../types/portfolio-types";

/** Pure domain functions — no React, no side effects. */

export const assetValue = (a: Pick<Asset, "price" | "quantity">): number =>
  a.price * a.quantity;

export const assetInvested = (
  a: Pick<Asset, "averagePrice" | "quantity">,
): number => a.averagePrice * a.quantity;

export const assetProfit = (a: Asset): number =>
  assetValue(a) - assetInvested(a);

export const totalPortfolioValue = (assets: Asset[]): number =>
  assets.reduce((sum, a) => sum + assetValue(a), 0);

export const totalInvested = (assets: Asset[]): number =>
  assets.reduce((sum, a) => sum + assetInvested(a), 0);

export const walletPercent = (asset: Asset, total: number): number =>
  total > 0 ? assetValue(asset) / total : 0;

export const categoryValue = (
  assets: Asset[],
  category: AssetCategory,
): number =>
  assets
    .filter((a) => a.category === category)
    .reduce((s, a) => s + assetValue(a), 0);

export const categoryPercent = (
  assets: Asset[],
  category: AssetCategory,
): number => {
  const total = totalPortfolioValue(assets);
  return total > 0 ? categoryValue(assets, category) / total : 0;
};

/** idealQuantity = (categoryTargetPercent * totalPortfolio) / price
 * Distribuído igualmente entre ativos da categoria.
 */
export const computeIdealQuantity = (
  asset: Asset,
  totalPortfolio: number,
  targetPercent: number,
  assetsInCategory: number,
): number => {
  if (!asset.price || assetsInCategory <= 0) return 0;
  const allocation = (targetPercent * totalPortfolio) / assetsInCategory;
  return Math.round(allocation / asset.price);
};

export const deltaQuantity = (asset: Asset, ideal: number): number =>
  ideal - asset.quantity;

export const shouldBuy = (asset: Asset, ideal: number): boolean =>
  ideal > asset.quantity;

export const groupByCategory = (
  assets: Asset[],
  targets: CategoryTargets,
): CategoryGroup[] => {
  const total = totalPortfolioValue(assets);
  const categories = Array.from(
    new Set(assets.map((a) => a.category)),
  ) as AssetCategory[];

  return categories
    .map<CategoryGroup>((category) => {
      const catAssets = assets.filter((a) => a.category === category);
      const totalValue = catAssets.reduce((s, a) => s + assetValue(a), 0);
      const targetPercent = targets[category] ?? 0;
      const totalExpected = total * targetPercent;
      return {
        category,
        assets: catAssets,
        totalValue,
        totalExpected,
        variation: 0,
        walletPercent: total > 0 ? totalValue / total : 0,
        targetPercent,
      };
    })
    .sort((a, b) => b.totalValue - a.totalValue);
};
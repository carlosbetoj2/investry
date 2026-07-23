import type { Asset } from "./asset-types";

export interface CategoryTargets {
  Ações: number;
  FIIs: number;
  ETFs: number;
}

export interface Wallet {
  id: string;
  nome: string;
  user_id: string;
  assets: Asset[];
  targets: CategoryTargets;
}

export const defaultCategoryTargets: CategoryTargets = {
  Ações: 0,
  FIIs: 0,
  ETFs: 0,
};

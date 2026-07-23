import { memo, useCallback } from "react";
import { ExternalLink, StickyNote, MoreVertical } from "lucide-react";
import type { Asset } from "../../types/portfolio-types";
import { useWallet } from "../../hooks/useWallet";
import { assetValue, deltaQuantity, shouldBuy } from "../../domain/portfolio-calculations";

import TickerCell from "./cells/TickerCell";
import QuantityCell from "./cells/QuantityCell";
import ScoreCell from "./cells/ScoreCell";
import AveragePriceCell from "./cells/AveragePriceCell";

import { brl, pct } from "@/shared/utils/format";
import { cn } from "@/lib/cn";
import { badge, layout, textElement } from "@/styles";
import { actionButtonStyles } from "./styles";

interface PortfolioRowProps {
  asset: Asset;
  totalPortfolio: number;
  idealQuantity: number;
}

const PortfolioRow = ({ asset, totalPortfolio, idealQuantity }: PortfolioRowProps) => {
  const { updateAsset } = useWallet();

  const onPrice = useCallback(
    (v: number) => updateAsset(asset.id, { averagePrice: v }),
    [asset.id, updateAsset],
  );

  const onQty = useCallback(
    (v: number) => updateAsset(asset.id, { quantity: v }),
    [asset.id, updateAsset],
  );

  const onScore = useCallback(
    (v: number) => updateAsset(asset.id, { score: v }),
    [asset.id, updateAsset],
  );

  const delta = deltaQuantity(asset, idealQuantity);
  const buy = shouldBuy(asset, idealQuantity);
  const value = assetValue(asset);

  const walletPct = totalPortfolio > 0 ? value / totalPortfolio : 0;

  const idealPct =
    asset.price * idealQuantity > 0 && totalPortfolio > 0
      ? (asset.price * idealQuantity) / totalPortfolio
      : 0;

  return (
    <div
      className={cn(
        layout({ alignX: "start", alignY: "center", display: "grid", grid: "table" }),
        textElement({ textSize: "sm", textColor: "dark", fontWeight: "medium" }),
        "odd:bg-slate-100/40 even:bg-white",
        "border-b border-border/50 px-5 hover:bg-gray-100/40 ",
      )}
    >
      <div
        className={cn(
          textElement({ textSize: "sm" }),
          layout({ direction: "fixedBox", layer: "up" }),
          "shadow-[6px_0_18px_-14px_rgba(0,0,0,0.35)] py-5",
        )}
      >
        <TickerCell ticker={asset.ticker} icon={asset.icon} market={asset.market} />
      </div>

      <div>
        <AveragePriceCell value={asset.averagePrice ?? 0} onCommit={onPrice} />
      </div>

      <div className={cn(textElement({ textColor: "blackSlate" }))}>{brl(asset.price)}</div>

      <div>
        <QuantityCell quantity={asset.quantity} delta={delta} onChange={onQty} />
      </div>

      <div className={cn(textElement({ textColor: "blackSlate" }))}>{idealQuantity}</div>

      <div>
        <span
          className={cn(
            badge({ boxSize: "secondaryPill" }),
            buy ? "bg-success-soft text-success-foreground" : "bg-muted text-muted-foreground",
          )}
        >
          {buy ? "SIM" : "NÃO"}
        </span>
      </div>

      <div className={cn(textElement({ textColor: "blackSlate" }))}>{pct(walletPct)}</div>

      <div>{pct(idealPct)}</div>

      <div className={cn(textElement({ textColor: "blackSlate" }))}>{brl(value)}</div>

      <div>
        <ScoreCell score={asset.score ?? 0} onChange={onScore} />
      </div>

      <div className="flex items-center gap-2">
        <button className={actionButtonStyles()}>
          <ExternalLink className="h-4 w-4" />
        </button>

        <button className={actionButtonStyles()}>
          <StickyNote className="h-4 w-4" />
        </button>

        <button className={actionButtonStyles()}>
          <MoreVertical className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default memo(PortfolioRow);

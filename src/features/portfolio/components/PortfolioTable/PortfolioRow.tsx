import { memo, useCallback } from "react";
import { ExternalLink, StickyNote, MoreVertical } from "lucide-react";
import type { Asset } from "../../types/portfolio-types";
import { useWallet } from "../../context/WalletContext";
import { assetValue, deltaQuantity, shouldBuy } from "../../domain/portfolio-calculations";
import EditableField from "../EditableField";
import TickerCell from "./cells/TickerCell";
import QuantityCell from "./cells/QuantityCell";
import NoteCell from "./cells/NoteCell";
import { brl, pct } from "@/shared/utils/format";
import { cn } from "@/lib/cn";
import { button, layout, textElement } from "@/styles";

import { portfolioRowStyles, buyBadgeStyles, actionButtonStyles } from "./styles";

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

  const onNote = useCallback(
    (v: number) => updateAsset(asset.id, { note: v }),
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
        layout({ align: "center" }),
        textElement({ textSize: "sm" }),
        button({ variant: "hover" }),
        "grid grid-cols-12 border-b border-border/50 px-6 py-3",
      )}
    >
      <div className="col-span-2">
        <TickerCell ticker={asset.ticker} category={asset.category} />
      </div>

      <div className="col-span-1">
        <EditableField value={asset.averagePrice} onCommit={onPrice} format={brl} />
      </div>

      <div className="col-span-1 text-muted-foreground">{brl(asset.price)}</div>

      <div className="col-span-1">
        <QuantityCell quantity={asset.quantity} delta={delta} onChange={onQty} />
      </div>

      <div className="col-span-1 font-medium">{idealQuantity}</div>

      <div className="col-span-1">
        <span className={buyBadgeStyles({ state: buy ? "buy" : "hold" })}>
          {buy ? "SIM" : "NÃO"}
        </span>
      </div>

      <div className="col-span-1 font-medium">{pct(walletPct)}</div>

      <div className="col-span-1 text-muted-foreground">{pct(idealPct)}</div>

      <div className="col-span-1 font-medium">{brl(value)}</div>

      <div className="col-span-1">
        <NoteCell note={asset.note} onChange={onNote} />
      </div>

      <div className="col-span-1 flex items-center gap-2">
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

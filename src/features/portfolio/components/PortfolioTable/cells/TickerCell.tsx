import { memo } from "react";
import { Bookmark } from "lucide-react";
import type { AssetCategory } from "../../../types/portfolio-types";

interface TickerCellProps {
  ticker: string;
  category: AssetCategory;
}

const colorByCategory: Record<AssetCategory, string> = {
  "Ações": "bg-warning",
  "FIIs": "bg-info",
  "ETFs": "bg-teal",
  "Cripto": "bg-violet",
  "REITS": "bg-success",
  "BDRs": "bg-foreground",
};

const TickerCell = ({ ticker, category }: TickerCellProps) => {
  return (
    <div className="flex items-center gap-3">
      <div
        className={`flex h-9 w-9 items-center justify-center rounded-lg text-[10px] font-bold text-white ${colorByCategory[category]}`}
      >
        {ticker.slice(0, 4)}
      </div>
      <span className="font-semibold text-foreground">{ticker}</span>
      <Bookmark className="h-4 w-4 text-muted-foreground/50 hover:text-info cursor-pointer" />
    </div>
  );
};

export default memo(TickerCell);
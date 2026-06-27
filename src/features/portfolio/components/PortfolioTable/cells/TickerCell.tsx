import { memo } from "react";
import { Bookmark } from "lucide-react";
import type { AssetCategory } from "../../../types/portfolio-types";
import { tickerBadge, tickerContainer, tickerText, tickerBookmark } from "./styles";

interface TickerCellProps {
  ticker: string;
  category: AssetCategory;
}

const TickerCell = ({ ticker, category }: TickerCellProps) => {
  return (
    <div className={tickerContainer()}>
      <div className={tickerBadge({ category })}>{ticker.slice(0, 4)}</div>

      <span className={tickerText()}>{ticker}</span>

      <Bookmark className={tickerBookmark()} />
    </div>
  );
};

export default memo(TickerCell);

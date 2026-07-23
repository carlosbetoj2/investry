import { memo } from "react";
import { Bookmark } from "lucide-react";
import { buttonType, iconStyle, layout, textElement } from "@/styles";
import { cn } from "@/lib/cn";
import MarketFlag from "./MarketFlag";

interface TickerCellProps {
  ticker: string;
  icon: string | null;
  market?: string | null;
}

const TickerCell = ({ ticker, icon, market }: TickerCellProps) => {
  return (
    <div className={cn(layout({ align: "start", alignY: "center", gap: "md" }))}>
      <div className={cn(layout({ align: "center", gap: "sm" }))}>
        <div className={cn(layout({ direction: "fixedBox", display: "relative" }))}>
          {icon ? (
            <img className={cn(buttonType({ width: "xl" }))} src={icon} alt="ícone ativo" />
          ) : (
            <div
              className={cn(
                buttonType({ width: "xl" }),
                layout({ align: "center" }),
                "bg-slate-200 text-slate-500",
              )}
              aria-hidden="true"
            >
              -
            </div>
          )}

          <div className={cn(layout({ display: "absolute" }), "-bottom-0 -right-0")}>
            <MarketFlag market={market} />
          </div>
        </div>

        <span
          className={cn(
            textElement({
              fontWeight: "extrabold",
              textColor: "black",
              spacing: "small",
              textSize: "sm",
            }),
            "truncate",
          )}
        >
          {ticker}
        </span>
      </div>

      <button className={cn(buttonType({ ghostType: "secondaryGhost" }), "shrink-0")}>
        <Bookmark
          className={cn(
            iconStyle({
              iconColor: "primaryColor",
              animation: "zoom",
            }),
            "hover:text-red-400",
          )}
        />
      </button>
    </div>
  );
};

export default memo(TickerCell);

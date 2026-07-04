import { memo } from "react";
import { Bookmark } from "lucide-react";
import { button, iconStyle, layout, textElement } from "@/styles";
import { cn } from "@/lib/cn";

interface TickerCellProps {
  ticker: string;
  icon: string;
}

const TickerCell = ({ ticker, icon }: TickerCellProps) => {
  return (
    <div className={cn(layout({ alignX: "start", alignY: "center", gap: "sm" }))}>
      <div className={cn(layout({ alignX: "center", alignY: "center" }))}>
        <img className={cn(button({ iconSize: "xl" }))} src={icon} alt="ícone ativo" />
      </div>

      <span
        className={cn(
          textElement({
            fontWeight: "extrabold",
            textColor: "black",
            spacing: "medium",
            textSize: "sm",
          }),
        )}
      >
        {ticker}
      </span>

      <div className={cn(layout({ align: "center" }), "w-[39%]")}>
        <button className={cn(button({ buttonType: "secondaryGhost" }))}>
          <Bookmark
            className={cn(
              iconStyle({ iconColor: "primaryColor", animation: "zoom" }),
              "hover:text-red-400",
            )}
          />
        </button>
      </div>
    </div>
  );
};

export default memo(TickerCell);

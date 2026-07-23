import { memo } from "react";
import { cn } from "@/lib/cn";
import { badge, layout } from "@/styles";

interface MarketFlagProps {
  market?: string | null;
}

const MARKET_FLAGS: Record<
  string,
  {
    src: string;
    label: string;
  }
> = {
  BMFBOVESPA: {
    src: "https://vqpyhrvigukezjminghj.supabase.co/storage/v1/object/public/assets/icons/flags/9uxk2.png",
    label: "Brasil",
  },
  NYSE: {
    src: "https://vqpyhrvigukezjminghj.supabase.co/storage/v1/object/public/assets/icons/flags/8xn3q.png",
    label: "Estados Unidos",
  },
  NASDAQ: {
    src: "https://vqpyhrvigukezjminghj.supabase.co/storage/v1/object/public/assets/icons/flags/8xn3q.png",
    label: "Estados Unidos",
  },
};

const MarketFlag = ({ market }: MarketFlagProps) => {
  const normalizedMarket = market?.trim().toUpperCase();

  if (!normalizedMarket || normalizedMarket === "BMFBOVESPA") {
    return null;
  }

  const flag = MARKET_FLAGS[normalizedMarket];

  if (!flag) {
    return null;
  }

  return (
    <span
      className={cn(
        layout({ display: "absolute" }),
        badge({ shadow: "small", width: "sm", bgTone: "white", variant: "flag" }),
      )}
      title={normalizedMarket}
      aria-label={flag.label}
    >
      <img
        className={cn(badge({ width: "full" }), "object-cover")}
        src={flag.src}
        alt={flag.label}
        loading="lazy"
      />
    </span>
  );
};

export default memo(MarketFlag);

import { cva } from "class-variance-authority";

export const noteCellButton = cva(
  "flex h-9 w-12 items-center justify-center rounded-lg text-sm font-bold transition-colors",
  {
    variants: {
      variant: {
        default: "bg-foreground text-background hover:bg-foreground/90",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export const noteCellInput = cva(
  "h-9 w-12 rounded-lg bg-foreground text-center text-sm font-bold text-background outline-none",
);

export const quantityContainer = cva("flex items-center gap-2");

export const quantityDelta = cva("inline-flex items-center text-xs font-semibold", {
  variants: {
    trend: {
      up: "text-success",
      down: "text-destructive",
      neutral: "hidden",
    },
  },
  defaultVariants: {
    trend: "neutral",
  },
});

export const quantityIcon = cva("h-3 w-3");

export const tickerBadge = cva(
  "flex h-9 w-9 items-center justify-center rounded-lg text-[10px] font-bold text-white",
  {
    variants: {
      category: {
        Ações: "bg-warning",
        FIIs: "bg-info",
        ETFs: "bg-teal",
        Cripto: "bg-violet",
        REITS: "bg-success",
        BDRs: "bg-foreground",
      },
    },
    defaultVariants: {
      category: "Ações",
    },
  },
);

export const tickerText = cva("font-semibold text-foreground");

export const tickerContainer = cva("flex items-center gap-3");

export const tickerBookmark = cva(
  "h-4 w-4 text-muted-foreground/50 hover:text-info cursor-pointer transition-colors",
);

import { cva } from "class-variance-authority";

export const portfolioRowStyles = cva(
  "grid grid-cols-[1.75fr_1fr_repeat(9,minmax(0,1fr))] items-center gap-2 border-b border-border/50 px-6 py-3 text-sm ",
  {
    variants: {
      hover: {
        true: "hover:bg-secondary/40",
        false: "",
      },
    },
    defaultVariants: {
      hover: true,
    },
  },
);

export const buyBadgeStyles = cva("rounded-full px-3 py-1 text-xs font-bold", {
  variants: {
    state: {
      buy: "bg-success-soft text-success-foreground",
      hold: "bg-muted text-muted-foreground",
    },
  },
  defaultVariants: {
    state: "hold",
  },
});

export const actionButtonStyles = cva("rounded p-1 transition-colors", {
  variants: {
    variant: {
      default: "hover:bg-secondary text-muted-foreground",
      active: "hover:bg-secondary text-foreground",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export const portfolioTableStyles = cva("flex flex-col gap-3", {
  variants: {
    density: {
      compact: "gap-2",
      normal: "gap-3",
      spacious: "gap-4",
    },
  },
  defaultVariants: {
    density: "normal",
  },
});

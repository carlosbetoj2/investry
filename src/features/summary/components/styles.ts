import { cva } from "class-variance-authority";

export const cardStyles = cva("rounded-2xl border border-border bg-card p-6 shadow-sm", {
  variants: {
    spacing: {
      default: "p-6",
      compact: "p-4",
    },
  },
  defaultVariants: {
    spacing: "default",
  },
});

export const cardHeaderStyles = cva("flex items-start justify-between");

export const titleStyles = cva("text-base font-semibold", {
  variants: {
    tone: {
      info: "text-info",
      success: "text-success",
      default: "text-foreground",
    },
  },
  defaultVariants: {
    tone: "default",
  },
});

export const valueStyles = cva("font-extrabold text-foreground", {
  variants: {
    size: {
      md: "text-2xl",
      lg: "text-3xl",
    },
  },
  defaultVariants: {
    size: "lg",
  },
});

export const metricPositiveStyles = cva(
  "mt-1 flex items-center gap-2 text-sm font-semibold text-success",
);

export const mutedTextStyles = cva("text-sm text-muted-foreground");

export const tabsContainerStyles = cva("flex items-center gap-1 rounded-full bg-secondary p-1");

export const tabButtonStyles = cva(
  "rounded-full px-4 py-1.5 text-xs font-semibold transition-colors",
  {
    variants: {
      active: {
        true: "bg-card text-foreground shadow-sm",
        false: "text-muted-foreground hover:text-foreground",
      },
    },
    defaultVariants: {
      active: false,
    },
  },
);

export const tabContentPlaceholderStyles = cva(
  "flex h-40 items-center justify-center text-sm text-muted-foreground",
);

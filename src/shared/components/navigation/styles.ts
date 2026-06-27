import { cva } from "class-variance-authority";

export const tabButtonStyles = cva("relative px-6 py-4 text-sm font-semibold transition-colors", {
  variants: {
    active: {
      true: "text-foreground",
      false: "text-muted-foreground hover:text-foreground",
    },
  },
  defaultVariants: {
    active: false,
  },
});

export const activeIndicatorStyles = cva(
  "absolute inset-x-0 -bottom-px h-0.5 bg-foreground rounded-full",
);

import { cva } from "class-variance-authority";

export const sectionCardStyles = cva("rounded-2xl border border-border bg-card shadow-sm", {
  variants: {
    padding: {
      default: "",
      none: "",
      sm: "",
      md: "",
      lg: "",
    },
  },
  defaultVariants: {
    padding: "default",
  },
});

export const sectionCardHeaderStyles = cva(
  "flex items-center justify-between border-b border-border px-6 py-4",
);

export const sectionCardTitleStyles = cva(
  "text-sm font-bold uppercase tracking-wider text-foreground/80",
);

export const sectionCardBodyStyles = cva("", {
  variants: {
    padding: {
      default: "p-6",
      none: "p-0",
      sm: "p-3",
      md: "p-4",
      lg: "p-8",
    },
  },
  defaultVariants: {
    padding: "default",
  },
});

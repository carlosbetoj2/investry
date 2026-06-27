import { cva } from "class-variance-authority";

export const pageLayout = cva("flex min-h-screen items-center justify-center bg-background px-4", {
  variants: {
    variant: {
      default: "",
      error: "",
      notFound: "",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export const container = cva("max-w-md text-center", {
  variants: {
    size: {
      sm: "max-w-sm",
      md: "max-w-md",
      lg: "max-w-lg",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export const title = cva("font-semibold tracking-tight text-foreground", {
  variants: {
    variant: {
      error: "text-xl",
      notFound: "text-7xl font-bold",
      default: "text-xl",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export const subtitle = cva("mt-2 text-sm text-muted-foreground");

export const buttonPrimary = cva(
  "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
);

export const buttonSecondary = cva(
  "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
);

export const spacing = cva("", {
  variants: {
    mt: {
      2: "mt-2",
      4: "mt-4",
      6: "mt-6",
    },
    flex: {
      center: "flex flex-wrap justify-center gap-2",
    },
  },
});

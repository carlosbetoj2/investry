import { cva } from "class-variance-authority";

export const dashboardVariants = cva("min-h-screen bg-background");

export const dashboardContainerVariants = cva("mx-auto max-w-[1400px] px-6 py-6");

export const dashboardCardVariants = cva("rounded-2xl border border-border bg-card shadow-sm");

export const dashboardContentVariants = cva("space-y-6 p-6");

export const placeholderVariants = cva(
  "flex h-60 flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-border bg-card",
);

export const placeholderTitleVariants = cva("text-lg font-semibold text-foreground");

export const placeholderTextVariants = cva("text-sm text-muted-foreground");

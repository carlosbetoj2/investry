import { cva } from "class-variance-authority";

export const editableFieldButton = cva(
  "inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-sm font-medium text-foreground transition-colors hover:bg-secondary",
  {
    variants: {
      showPencil: {
        true: "",
        false: "",
      },
    },
    defaultVariants: {
      showPencil: true,
    },
  },
);

export const editableFieldInput = cva(
  "w-24 rounded-md border border-ring bg-card px-2 py-1 text-sm font-medium text-foreground outline-none",
  {
    variants: {
      invalid: {
        true: "border-red-500 focus:ring-red-500",
        false: "",
      },
    },
    defaultVariants: {
      invalid: false,
    },
  },
);

export const drawerContainer = cva("overflow-hidden rounded-xl border border-border");

export const drawerButton = cva(
  "flex w-full items-center gap-4 px-6 py-4 text-left transition-colors",
  {
    variants: {
      active: {
        true: "bg-secondary hover:bg-secondary",
        false: "bg-secondary/40 hover:bg-secondary",
      },
    },
    defaultVariants: {
      active: false,
    },
  },
);

export const drawerHeaderGroup = cva("flex items-center gap-2");

export const drawerTitle = cva("text-base font-bold text-foreground");

export const drawerMetaText = cva("text-xs text-muted-foreground");

export const drawerValueBlock = cva("flex items-center gap-2 text-sm");

export const drawerRightGroup = cva("ml-auto flex items-center gap-6 text-sm");

export const drawerSectionLabel = cva("text-xs uppercase tracking-wider text-muted-foreground");

export const drawerGridHeader = cva(
  "grid grid-cols-12 gap-2 border-b border-border bg-card px-6 py-3 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground",
);

export const iconStyle = cva("h-4 w-4 text-muted-foreground");

export const infoIconStyle = cva("h-3.5 w-3.5 text-muted-foreground");

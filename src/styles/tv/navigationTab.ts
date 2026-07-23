import { tv } from "tailwind-variants";
import { textElement } from "./textElement";

export const navigationTab = tv({
  base: "relative inline-flex items-center justify-center transition-colors cursor-pointer",

  variants: {
    active: {
      true: "text-foreground",
      false: "text-muted-foreground hover:text-foreground",
    },
    indicator: {
      bar: "absolute inset-x-0 -bottom-px h-0.5 bg-foreground rounded-full",
      pill: "absolute rounded-full px-[50%] py-4 shadow-sm",
    },

    textElement,
  },
});

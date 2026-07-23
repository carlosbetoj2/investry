import { tv } from "tailwind-variants";
import { gap, shadow } from "../tokens";
import { width, boxSize } from "../primitives";
import { animation } from "../patterns";

export const badge = tv({
  base: "inline-flex items-center justify-center rounded-lg",

  variants: {
    variant: {
      flag: "bottom-[-6px] left-1/2 -translate-x-1/2 overflow-hidden ring-1 ring-black/5",
    },
    bgTone: {
      info: "bg-info",
      success: "bg-success",
      warning: "bg-warning",
      violet: "bg-violet",
      white: "bg-white",
    },
    textTone: {
      info: "text-info",
      success: "text-success",
    },

    boxSize,
    shadow,
    animation,
    width,
    gap,
  },
});

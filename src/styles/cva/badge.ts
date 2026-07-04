import { tv } from "tailwind-variants";
import { gap, shadow } from "../tokens";
import { iconSize, boxSize } from "../primitives";
import { animation } from "../patterns";

export const badge = tv({
  base: "inline-flex items-center justify-center rounded-lg",

  variants: {
    bgTone: {
      info: "bg-info",
      success: "bg-success",
      warning: "bg-warning",
      violet: "bg-violet",
    },
    textTone: {
      info: "text-info",
      success: "text-success",
    },

    boxSize,
    shadow,
    animation,
    iconSize,
    gap,
  },
});

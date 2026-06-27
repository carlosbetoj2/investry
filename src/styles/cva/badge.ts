import { tv } from "tailwind-variants";
import { gap, shadow } from "../tokens";
import { iconSize, boxSize } from "../primitives";
import { animation } from "../patterns";

export const badge = tv({
  base: "inline-flex items-center justify-center rounded-lg",

  variants: {
    tone: {
      info: "bg-info text-white",
      success: "bg-success text-white",
      warning: "bg-warning text-white",
      violet: "bg-violet text-white",
    },

    boxSize,
    shadow,
    animation,
    iconSize,
    gap,
  },
});

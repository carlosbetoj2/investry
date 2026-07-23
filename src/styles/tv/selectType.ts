import { tv } from "tailwind-variants";
import { fontWeight, spacing, textColor, textSize } from "../tokens";
import { width, height, ghostType, boxSize } from "../primitives";

export const selectType = tv({
  base: "inline-flex items-center justify-center rounded-lg transition cursor-pointer appearance-none",

  variants: {
    variant: {
      primarySelect: "bg-slate-700",
    },
    active: {
      true: "bg-secondary ",
    },

    ghostType,
    boxSize,
    width,
    height,
    spacing,
    fontWeight,
    textSize,
    textColor,
  },
});

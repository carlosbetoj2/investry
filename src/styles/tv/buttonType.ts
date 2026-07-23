import { tv } from "tailwind-variants";
import { width, boxSize, ghostType, height } from "../primitives";
import { animation } from "../patterns";
import { fontWeight, gap, spacing, textColor, textSize } from "../tokens";

export const buttonType = tv({
  base: "inline-flex items-center justify-center rounded-lg transition cursor-pointer",

  variants: {
    variant: {
      outline: "border border-slate-400 hover:bg-white/10",
      submit:
        "bg-blue-600 hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-300 w-full",
    },

    ghostType,
    gap,
    boxSize,
    animation,
    height,
    width,
    textSize,
    textColor,
    fontWeight,
    spacing,
  },
});

import { tv } from "tailwind-variants";
import { fontWeight, spacing, textColor, textSize } from "../tokens";
import { iconSize, buttonSize } from "../primitives";
import { animation } from "../patterns";

export const drawer = tv({
  base: "inline-flex items-center justify-center rounded-lg transition cursor-pointer",

  variants: {
    variant: {
      ghost: "hover:bg-white/10",
      outline: "border border-slate-400 hover:bg-white/10",
      solid: "bg-blue-600 text-white",
    },

    animation,
    buttonSize,
    iconSize,
    spacing,
    fontWeight,
    textSize,
    textColor,
  },
});

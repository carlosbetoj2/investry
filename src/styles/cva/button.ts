import { tv } from "tailwind-variants";
import { iconSize, buttonSize } from "../primitives";
import { animation } from "../patterns";

export const button = tv({
  base: "inline-flex items-center justify-center rounded-lg transition",

  variants: {
    variant: {
      ghost: "hover:bg-white/10 cursor-pointer",
      outline: "border border-slate-400 hover:bg-white/10 cursor-pointer",
      solid: "bg-blue-600 text-white cursor-pointer",
      hover: "hover:bg-secondary/40",
    },

    animation,
    buttonSize,
    iconSize,
  },
});

import { tv } from "tailwind-variants";
import { shadow, textColor } from "../tokens";
import { border } from "../primitives";

export const appearance = tv({
  variants: {
    bg: {
      white: "bg-white",
      primaryColor: "bg-slate-900",
      secundaryColor: "bg-slate-800",
      gray: "bg-secondary/40",
    },
    rounded: {
      large: "rounded-2xl",
      largeTop: "rounded-t-2xl",
      full: "rounded-full",
    },

    border,
    textColor,
    shadow,
  },
});

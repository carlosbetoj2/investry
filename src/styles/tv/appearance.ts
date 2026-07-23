import { tv } from "tailwind-variants";
import { shadow, textColor } from "../tokens";
import { border } from "../primitives";

export const appearance = tv({
  variants: {
    bg: {
      white: "bg-white",
      primaryColor: "bg-slate-900 ",
      secundaryColor: "bg-slate-800",
      gradient: "bg-gradient-to-r from-[#becde5] to-[#edf4ff]",
      gray: "bg-secondary/40",
    },
    bgEffect: {
      blackSlate: "absolute inset-0 bg-slate-800/50",
    },
    rounded: {
      large: "rounded-2xl",
      largeTop: "rounded-t-2xl",
      full: "rounded-full",
    },
    imageStyle: {
      fill: "object-cover w-full h-full",
    },

    border,
    textColor,
    shadow,
  },
});

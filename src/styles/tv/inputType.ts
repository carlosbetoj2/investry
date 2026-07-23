import { tv } from "tailwind-variants";
import { width, boxSize, height } from "../primitives";
import { animation } from "../patterns";
import { gap, textSize, textColor, fontWeight } from "../tokens";

export const inputType = tv({
  // base: "inline-flex items-center justify-center rounded-lg transition cursor-text",
  base: "w-full rounded-lg border border-gray-200 bg-slate-100/40 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500",

  variants: {
    height,
    gap,
    boxSize,
    animation,
    width,
    textSize,
    textColor,
    fontWeight,
  },
});

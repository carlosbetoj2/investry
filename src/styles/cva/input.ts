import { tv } from "tailwind-variants";
import { iconSize, buttonSize, buttonType, boxSize } from "../primitives";
import { animation } from "../patterns";
import { gap, textSize, textColor, fontWeight } from "../tokens";

export const input = tv({
  base: "inline-flex items-center justify-center rounded-lg transition cursor-text",

  variants: {
    gap,
    boxSize,
    buttonType,
    animation,
    buttonSize,
    iconSize,
    textSize,
    textColor,
    fontWeight,
  },
});

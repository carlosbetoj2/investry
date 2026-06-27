import { tv } from "tailwind-variants";
import { shadow, fontWeight, textSize, textColor, spacing } from "../tokens";

export const textElement = tv({
  variants: {
    shadow,
    fontWeight,
    textSize,
    spacing,
    textColor,
  },
});

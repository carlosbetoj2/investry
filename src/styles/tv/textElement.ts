import { tv } from "tailwind-variants";
import { shadow, fontWeight, textSize, textColor, spacing } from "../tokens";

export const textElement = tv({
  variants: {
    variant: {
      link: "text-blue-600 hover:underline",
      error: "text-red-600",
      success: "text-green-600",
    },
    shadowStyle: {
      drop: "drop-shadow-[0_0_7px_black]",
    },

    shadow,
    fontWeight,
    textSize,
    spacing,
    textColor,
  },
});

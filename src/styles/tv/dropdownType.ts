import { tv } from "tailwind-variants";
import { fontWeight, spacing, textColor, textSize } from "../tokens";
import { width, height, ghostType } from "../primitives";

export const dropdownType = tv({
  base: "inline-flex items-center justify-center rounded-lg transition cursor-pointer",

  variants: {
    dropdownType: {
      primaryDropdown: "bg-secondary/40 hover:bg-secondary",
    },
    active: {
      true: "bg-secondary ",
    },

    ghostType,
    width,
    height,
    spacing,
    fontWeight,
    textSize,
    textColor,
  },
});

import { tv } from "tailwind-variants";
import { fontWeight, spacing, textColor, textSize } from "../tokens";
import { iconSize, buttonSize, buttonType } from "../primitives";
import { animation } from "../patterns";

export const drawer = tv({
  base: "inline-flex items-center justify-center rounded-lg transition cursor-pointer",

  variants: {
    drawerType: {
      primaryDrawer: "hover:bg-white/10",
      secondaryDrawer: "bg-secondary/40 hover:bg-secondary",
    },
    active: {
      true: "bg-secondary ",
    },

    buttonType,
    animation,
    buttonSize,
    iconSize,
    spacing,
    fontWeight,
    textSize,
    textColor,
  },
});

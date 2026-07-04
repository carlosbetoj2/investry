import { tv } from "tailwind-variants";
import { iconColor, iconSize } from "../primitives";
import { animation } from "../patterns";

export const iconStyle = tv({
  base: "inline-flex items-center justify-center",

  variants: {
    animation,
    iconColor,
    iconSize,
  },
});

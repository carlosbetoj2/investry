import { tv } from "tailwind-variants";
import { iconSize } from "../primitives";
import { animation } from "../patterns";

export const iconStyle = tv({
  base: "inline-flex items-center justify-center",

  variants: {
    animation,
    iconSize,
  },
});

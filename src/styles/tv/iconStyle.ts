import { tv } from "tailwind-variants";
import { iconColor, width } from "../primitives";
import { animation } from "../patterns";

export const iconStyle = tv({
  base: "",

  variants: {
    variant: {
      inBox: "items-center justify-center",
      inLabel: "absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2",
    },

    animation,
    iconColor,
    width,
  },
});

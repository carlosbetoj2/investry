import { tv } from "tailwind-variants";
import { shadow } from "../tokens";
import { animation } from "../patterns";

export const cardType = tv({
  base: "w-full overflow-hidden rounded-2xl bg-white",

  variants: {
    widht: {
      medium: "max-w-6xl",
    },

    shadow,
    animation,
  },
});

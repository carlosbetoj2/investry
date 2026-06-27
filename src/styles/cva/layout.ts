import { tv } from "tailwind-variants";
import { gap } from "../tokens";

export const layout = tv({
  base: "flex transition-colors",

  variants: {
    align: {
      start: "items-start justify-start",
      center: "items-center justify-center",
      between: "items-between justify-between",
    },
    direction: {
      row: "flex-row",
      col: "flex-col",
      responsive: "flex-wrap md:flex-nowrap mx-auto",
    },
    // maxWidth: {
    //   xl: "max-w-[74%] mx-auto",
    //   lg: "max-w-[44%] mx-auto",
    // },

    gap,
  },
});

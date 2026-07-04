import { tv } from "tailwind-variants";
import { gap } from "../tokens";
import { display } from "../patterns";

export const layout = tv({
  variants: {
    align: {
      between: "justify-between",
      around: "justify-around",
      center: "items-center justify-center",
      start: "items-start justify-start",
    },
    alignX: {
      start: "flexjustify-start",
      center: "justify-center",
    },
    alignY: {
      start: "items-start",
      center: "items-center",
      end: "items-end",
    },
    direction: {
      row: "flex-row flex-nowrap overflow-auto scrollbar-hide overflow-y-hidden",
      responsiveRow:
        "flex-col md:flex-row md:flex-nowrap overflow-auto scrollbar-hide overflow-y-hidden",
      col: "flex-col",
      fixedSize: "shrink-0",
      fixedBox:
        "sticky left-0 bg-inherit backdrop-blur-[2px] before:absolute before:inset-0 before:bg-inherit before:z-[-1]",
    },
    screen: {
      full: "w-[100%]",
    },
    layer: {
      down: "z-10",
      center: "z-20",
      up: "z-30",
    },

    display,
    gap,
  },
  defaultVariants: {
    display: "flex",
  },
});

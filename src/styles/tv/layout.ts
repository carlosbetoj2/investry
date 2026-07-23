import { tv } from "tailwind-variants";
import { gap } from "../tokens";
import { display } from "../patterns";

export const layout = tv({
  variants: {
    align: {
      between: "flex justify-between",
      around: "flex justify-around",
      center: "flex items-center justify-center",
      start: "flex items-start justify-start",
    },
    alignX: {
      start: "flex justify-start",
      center: "flex justify-center",
    },
    alignY: {
      start: "flex items-start",
      center: "flex items-center",
      end: "flex items-end",
    },
    direction: {
      row: "flex flex-row flex-nowrap overflow-auto scrollbar-hide overflow-y-hidden whitespace-nowrap",
      responsiveRow:
        "flex flex-col md:flex-row md:flex-nowrap overflow-auto scrollbar-hide overflow-y-hidden",
      col: "flex flex-col",
      fixedSize: "shrink-0",
      fixedBox:
        "sticky left-0 bg-inherit backdrop-blur-[2px] before:absolute before:inset-0 before:bg-inherit before:z-[-1]",
    },
    screen: {
      onlyMobile: "flex lg:hidden",
      onlyDesktop: "hidden lg:flex",
    },
    layer: {
      down: "z-10",
      center: "z-20",
      up: "z-30",
    },
    grid: {
      table: "grid-cols-[1.41fr_1.37fr_1fr_1.37fr_repeat(7,minmax(0,1fr))]",
    },

    display,
    gap,
  },
});

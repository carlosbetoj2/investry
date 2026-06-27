import { tv } from "tailwind-variants";

export const zIndex = tv({
  base: "relative",

  variants: {
    layer: {
      baixo: "z-10",
      meio: "z-20",
      cima: "z-30",
    },
  },
});

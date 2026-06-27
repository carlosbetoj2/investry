import { tv } from "tailwind-variants";
import { shadow, textColor } from "../tokens";

export const appearance = tv({
  variants: {
    bg: {
      white: "bg-white",
      primaryColor: "bg-[#2e3746]",
      secundaryColor: "bg-[#404a57]",
    },

    textColor,
    shadow,
  },
});

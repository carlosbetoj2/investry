import { cn } from "@/lib/cn";
import type { ReactNode } from "react";
import { appearance, layout } from "@/styles";

interface SectionCardProps {
  title?: string;
  action?: ReactNode;
  className?: string;
  bodyClassName?: string;
  bodyPadding?: "default" | "none" | "sm" | "md" | "lg";
  children: ReactNode;
}

const SectionCard = ({ title, action, children }: SectionCardProps) => {
  return (
    <section className={cn(appearance({ rounded: "large", border: "full", shadow: "small" }))}>
      {(title || action) && (
        <header
          className={cn(
            layout({
              align: "around",
              alignY: "center",
              direction: "responsiveRow",
            }),
            appearance({ border: "lower" }),
            "py-5",
          )}
        >
          {/* {title && (
            <h3
              className={cn(
                textElement({
                  textSize: "lg",
                  fontWeight: "bold",
                  spacing: "medium",
                  textColor: "dark",
                }),
                "uppercase",
              )}
            >
              {title}
            </h3>
          )} */}
          <div>{action}</div>
        </header>
      )}

      <div className="p-3 md:p-4">{children}</div>
    </section>
  );
};

export default SectionCard;

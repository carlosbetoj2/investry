import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

import {
  sectionCardStyles,
  sectionCardHeaderStyles,
  sectionCardTitleStyles,
  sectionCardBodyStyles,
} from "./styles";
import { appearance, layout, textElement } from "@/styles";

interface SectionCardProps {
  title?: string;
  action?: ReactNode;
  className?: string;
  bodyClassName?: string;
  bodyPadding?: "default" | "none" | "sm" | "md" | "lg";
  children: ReactNode;
}

const SectionCard = ({
  title,
  action,
  className,
  bodyClassName,
  bodyPadding = "default",
  children,
}: SectionCardProps) => {
  return (
    <section className={cn(appearance({ rounded: "large", border: "full", shadow: "large" }))}>
      {(title || action) && (
        <header
          className={cn(
            layout({
              align: "around",
              alignY: "center",
              direction: "responsiveRow",
              display: "grid",
            }),
            appearance({ border: "lower" }),
            "px-2 py-5",
          )}
        >
          {/* {title && (
            <h3
              className={cn(
                textElement({
                  textSize: "lg",
                  fontWeight: "bold",
                  spacing: "large",
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

      <div className="p-3">{children}</div>
    </section>
  );
};

export default SectionCard;

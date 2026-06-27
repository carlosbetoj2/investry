import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

import {
  sectionCardStyles,
  sectionCardHeaderStyles,
  sectionCardTitleStyles,
  sectionCardBodyStyles,
} from "./styles";

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
    <section className={cn(sectionCardStyles(), className)}>
      {(title || action) && (
        <header className={cn(sectionCardHeaderStyles())}>
          {title && <h3 className={cn(sectionCardTitleStyles())}>{title}</h3>}
          {action}
        </header>
      )}

      <div className={cn(sectionCardBodyStyles({ padding: bodyPadding }), bodyClassName)}>
        {children}
      </div>
    </section>
  );
};

export default SectionCard;

import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface SectionCardProps {
  title?: string;
  action?: ReactNode;
  className?: string;
  bodyClassName?: string;
  children: ReactNode;
}

const SectionCard = ({
  title,
  action,
  className,
  bodyClassName,
  children,
}: SectionCardProps) => (
  <section
    className={cn(
      "rounded-2xl border border-border bg-card shadow-sm",
      className,
    )}
  >
    {(title || action) && (
      <header className="flex items-center justify-between border-b border-border px-6 py-4">
        {title && (
          <h3 className="text-sm font-bold uppercase tracking-wider text-foreground/80">
            {title}
          </h3>
        )}
        {action}
      </header>
    )}
    <div className={cn("p-6", bodyClassName)}>{children}</div>
  </section>
);

export default SectionCard;
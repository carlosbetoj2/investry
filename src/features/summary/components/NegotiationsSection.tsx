import { useState } from "react";
import SectionCard from "@/shared/components/cards/SectionCard";
import PortfolioTable from "@/features/portfolio/components/PortfolioTable/PortfolioTable";
import { cn } from "@/lib/utils";

const subTabs = ["Carteira", "Rentabilidade", "Composição"];

const NegotiationsSection = () => {
  const [tab, setTab] = useState("Carteira");

  return (
    <SectionCard
      title="Negociações"
      action={
        <div className="flex items-center gap-1 rounded-full bg-secondary p-1">
          {subTabs.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={cn(
                "rounded-full px-4 py-1.5 text-xs font-semibold transition-colors",
                tab === t
                  ? "bg-card text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {t}
            </button>
          ))}
        </div>
      }
      bodyClassName="p-4"
    >
      {tab === "Carteira" && <PortfolioTable />}
      {tab !== "Carteira" && (
        <div className="flex h-40 items-center justify-center text-sm text-muted-foreground">
          {tab} em desenvolvimento
        </div>
      )}
    </SectionCard>
  );
};

export default NegotiationsSection;
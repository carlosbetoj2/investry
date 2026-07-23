import { useState } from "react";
import SectionCard from "@/shared/components/cards/SectionCard";
import PortfolioTable from "@/features/portfolio/components/PortfolioTable/PortfolioTable";
import { cn } from "@/lib/cn";

import { layout, navigationTab, textElement } from "@/styles";
import { tabContentPlaceholderStyles } from "./styles";

const subTabs = ["Carteira", "Rentabilidade", "Composição"] as const;
type Tab = (typeof subTabs)[number];

const NegotiationsSection = () => {
  const [tab, setTab] = useState<Tab>("Carteira");

  return (
    <SectionCard
      title="Negociações"
      action={
        <div className={cn(layout({}))}>
          {subTabs.map((t) => {
            const isActive = tab === t;

            return (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={cn(
                  navigationTab({ active: isActive }),
                  textElement({ textSize: "xs", fontWeight: "semibold" }),
                  "px-3 md:px-5 relative",
                )}
              >
                {t}

                {isActive && <span className={navigationTab({ indicator: "pill" })} />}
              </button>
            );
          })}
        </div>
      }
      bodyClassName="p-3"
    >
      {tab === "Carteira" && <PortfolioTable />}

      {tab !== "Carteira" && (
        <div className={tabContentPlaceholderStyles()}>{tab} em desenvolvimento</div>
      )}
    </SectionCard>
  );
};

export default NegotiationsSection;

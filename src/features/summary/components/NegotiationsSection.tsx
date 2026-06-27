import { useState } from "react";
import SectionCard from "@/shared/components/cards/SectionCard";
import PortfolioTable from "@/features/portfolio/components/PortfolioTable/PortfolioTable";
import { cn } from "@/lib/utils";

import { tabsContainerStyles, tabButtonStyles, tabContentPlaceholderStyles } from "./styles";

const subTabs = ["Carteira", "Rentabilidade", "Composição"] as const;

type Tab = (typeof subTabs)[number];

const NegotiationsSection = () => {
  const [tab, setTab] = useState<Tab>("Carteira");

  return (
    <SectionCard
      title="Negociações"
      action={
        <div className={tabsContainerStyles()}>
          {subTabs.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={tabButtonStyles({ active: tab === t })}
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
        <div className={tabContentPlaceholderStyles()}>{tab} em desenvolvimento</div>
      )}
    </SectionCard>
  );
};

export default NegotiationsSection;

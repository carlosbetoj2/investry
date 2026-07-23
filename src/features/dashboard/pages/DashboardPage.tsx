import { useState } from "react";
import TabNavigation from "@/shared/components/navigation/TabNavigation";
import DashboardHeader from "../components/DashboardHeader";
import FinancialSummary from "@/features/summary/components/FinancialSummary";
import NegotiationsSection from "@/features/summary/components/NegotiationsSection";
import { cn } from "@/lib/cn";

import { appearance, layout, textElement } from "@/styles";

const tabs = ["Resumo", "Proventos", "Patrimônio", "Lançamentos", "IRPF"];

const Placeholder = ({ title }: { title: string }) => {
  return (
    <div className={cn(layout({ align: "center", direction: "col", gap: "sm" }), "h-60")}>
      <h3
        className={cn(textElement({ textSize: "lg", fontWeight: "semibold", textColor: "dark" }))}
      >
        {title}
      </h3>
      <p className={cn(textElement({ textSize: "sm", textColor: "blackSlate" }))}>
        Funcionalidade em desenvolvimento
      </p>
    </div>
  );
};

const DashboardPage = () => {
  const [active, setActive] = useState("Resumo");

  return (
    <div>
      <DashboardHeader />

      <main className="mx-auto max-w-[100%] md:w-[69%] py-6">
        <div
          className={cn(
            appearance({ rounded: "large", border: "full", shadow: "small", bg: "white" }),
          )}
        >
          <TabNavigation tabs={tabs} activeTab={active} onTabChange={setActive} />

          <div className="space-y-6 p-3 md:p-6">
            {active === "Resumo" && (
              <>
                <FinancialSummary />
                <NegotiationsSection />
              </>
            )}

            {active === "Proventos" && <Placeholder title="Proventos" />}
            {active === "Patrimônio" && <Placeholder title="Patrimônio" />}
            {active === "Lançamentos" && <Placeholder title="Lançamentos" />}
            {active === "IRPF" && <Placeholder title="IRPF" />}
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;

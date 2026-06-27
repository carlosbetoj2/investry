import { useState } from "react";
import TabNavigation from "@/shared/components/navigation/TabNavigation";
import DashboardHeader from "../components/DashboardHeader";
import FinancialSummary from "@/features/summary/components/FinancialSummary";
import NegotiationsSection from "@/features/summary/components/NegotiationsSection";

import {
  dashboardVariants,
  dashboardContainerVariants,
  dashboardCardVariants,
  dashboardContentVariants,
  placeholderVariants,
  placeholderTitleVariants,
  placeholderTextVariants,
} from "./styles";

const tabs = ["Resumo", "Proventos", "Patrimônio", "Lançamentos", "IRPF"];

const Placeholder = ({ title }: { title: string }) => {
  return (
    <div className={placeholderVariants()}>
      <h3 className={placeholderTitleVariants()}>{title}</h3>
      <p className={placeholderTextVariants()}>Funcionalidade em desenvolvimento</p>
    </div>
  );
};

const DashboardPage = () => {
  const [active, setActive] = useState("Resumo");

  return (
    <div className={dashboardVariants()}>
      <DashboardHeader />

      <main className={dashboardContainerVariants()}>
        <div className={dashboardCardVariants()}>
          <TabNavigation tabs={tabs} activeTab={active} onTabChange={setActive} />

          <div className={dashboardContentVariants()}>
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

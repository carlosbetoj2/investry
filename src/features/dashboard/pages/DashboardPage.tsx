import { useState } from "react";
import TabNavigation from "@/shared/components/navigation/TabNavigation";
import DashboardHeader from "../components/DashboardHeader";
import FinancialSummary from "@/features/summary/components/FinancialSummary";
import NegotiationsSection from "@/features/summary/components/NegotiationsSection";

const tabs = ["Resumo", "Proventos", "Patrimônio", "Lançamentos", "IRPF"];

const Placeholder = ({ title }: { title: string }) => (
  <div className="flex h-60 flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-border bg-card">
    <h3 className="text-lg font-semibold text-foreground">{title}</h3>
    <p className="text-sm text-muted-foreground">Funcionalidade em desenvolvimento</p>
  </div>
);

const DashboardPage = () => {
  const [active, setActive] = useState("Resumo");

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      <main className="mx-auto max-w-[1400px] px-6 py-6">
        <div className="rounded-2xl border border-border bg-card shadow-sm">
          <TabNavigation tabs={tabs} activeTab={active} onTabChange={setActive} />
          <div className="space-y-6 p-6">
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
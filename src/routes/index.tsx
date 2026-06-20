import { createFileRoute } from "@tanstack/react-router";
import { WalletProvider } from "@/features/portfolio/context/WalletContext";
import DashboardPage from "@/features/dashboard/pages/DashboardPage";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Investry — Dashboard de Investimentos" },
      { name: "description", content: "Dashboard financeiro modular para gestão de carteira de investimentos." },
      { property: "og:title", content: "Investry" },
      { property: "og:description", content: "Gestão de carteira, alocação por categoria e rebalanceamento automático." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <WalletProvider>
      <DashboardPage />
    </WalletProvider>
  );
}

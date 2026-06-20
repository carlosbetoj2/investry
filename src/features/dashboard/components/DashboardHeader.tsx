import { ChevronDown, Menu, Plus } from "lucide-react";
import logo from "@/assets/logo/investry-icon.webp";
import { useWallet } from "@/features/portfolio/context/WalletContext";
import MetricsBar from "./MetricsBar";

const walletLabel: Record<string, string> = {
  previdenciaria: "Previdenciária",
  swingtrade: "Swing Trade",
};

const DashboardHeader = () => {
  const { wallet, setWallet } = useWallet();

  return (
    <header className="bg-header text-header-foreground">
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-4">
        <div className="flex items-center gap-4">
          <img src={logo} alt="Investry" className="h-9 w-9" />
          <span className="text-xl font-extrabold tracking-tight">Investry</span>
          <button
            onClick={() =>
              setWallet(wallet === "previdenciaria" ? "swingtrade" : "previdenciaria")
            }
            className="ml-4 flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm font-semibold hover:bg-white/10"
          >
            {walletLabel[wallet]}
            <ChevronDown className="h-4 w-4" />
          </button>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 rounded-lg border border-white/15 px-3 py-2 text-sm font-semibold hover:bg-white/10">
            <span className="flex h-6 w-6 items-center justify-center rounded-md bg-info text-[10px] font-bold">B³</span>
            Importar B3
          </button>
          <button className="flex items-center gap-2 rounded-lg bg-white/10 px-4 py-2 text-sm font-semibold hover:bg-white/20">
            <Plus className="h-4 w-4" /> Adicionar Ativo
          </button>
          <button className="flex items-center gap-2 rounded-full bg-white/10 px-3 py-2 hover:bg-white/20">
            <Menu className="h-4 w-4" />
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-info text-xs font-bold">RO</span>
          </button>
        </div>
      </div>
      <div className="mx-auto max-w-[1400px] px-6 pb-6">
        <MetricsBar />
      </div>
    </header>
  );
};

export default DashboardHeader;
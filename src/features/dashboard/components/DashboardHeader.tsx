import { Eye, Menu, MoreVertical } from "lucide-react";
import logo from "@/assets/logo/investry-icon.webp";
import { useWallet } from "@/features/portfolio/context/WalletContext";
import MetricsBar from "./MetricsBar";
import { UpArrowIcon, PlusIcon, B3Icon } from "@/assets/svg";
import { cn } from "@/lib/cn";

import { button, appearance, layout, iconStyle, textElement, drawer, zIndex } from "@/styles";
import { visibility } from "@/styles/patterns";

const walletLabel: Record<string, string> = {
  previdenciaria: "Previdenciária",
  swingtrade: "Swing Trade",
};

const DashboardHeader = () => {
  const { wallet, setWallet } = useWallet();

  return (
    <header className={cn(appearance({ bg: "primaryColor", shadow: "md", textColor: "white" }))}>
      <div
        className={cn(
          layout({ align: "between", direction: "responsive" }),
          "py-[9px] max-w-[94%] lg:max-w-[74%]",
        )}
      >
        <div className={cn(layout({ align: "center" }), "order-1  mr-3 md:order-1 md:mr-4")}>
          <button className={cn(button({ animation: "zoom" }))}>
            <img src={logo} alt="logo investry" className={cn(iconStyle({ iconSize: "xl" }))} />
            <span
              className={cn(
                textElement({
                  textSize: "xxl",
                  spacing: "large",
                  fontWeight: "semibold",
                }),
                "ml-3",
              )}
            >
              Investry
            </span>
          </button>
        </div>

        <div
          className={cn(layout(), "order-5 md:order-2 md:ml-4 md:mr-4", visibility.hiddenMobile)}
        >
          <button
            onClick={() => setWallet(wallet === "previdenciaria" ? "swingtrade" : "previdenciaria")}
            className={cn(
              drawer({
                variant: "ghost",
                buttonSize: "sm",
                textSize: "md",
                fontWeight: "semibold",
                spacing: "medium",
              }),
            )}
          >
            {walletLabel[wallet]}
            <UpArrowIcon
              aria-label="seta para cima"
              className={cn(iconStyle({ iconSize: "sm" }), "ml-3")}
            />
          </button>
        </div>

        <div className="order-2 pr-0 md:order-3 ml-auto md:-ml-3">
          <button className={cn(button({ variant: "ghost", buttonSize: "lg" }))}>
            <Eye className={cn(iconStyle({ iconSize: "md", animation: "zoom" }))} />
          </button>
        </div>

        <div className={cn(layout({ align: "center" }), "md:order-6 md:ml-10")}>
          <button
            className={cn(
              button({ buttonSize: "lg" }),
              "rounded-full relative pr-12 md:border md:border-slate-400",
            )}
          >
            <Menu className={cn(iconStyle({ animation: "zoom", iconSize: "md" }))} />

            <span
              className={cn(
                layout({ align: "center" }),
                "absolute right-0 inset-y-0 aspect-square rounded-full bg-blue-600",
                visibility.hiddenMobile,
              )}
            >
              RO
            </span>
          </button>
        </div>

        <div className="order-4 md:hidden">
          <button
            className={cn(button({ variant: "ghost", buttonSize: "lg" }), visibility.onlyMobile)}
          >
            <MoreVertical className={cn(iconStyle({ animation: "zoom", iconSize: "md" }))} />
          </button>
        </div>

        <div
          className={cn(layout({ gap: "md", direction: "row" }), "order-6 md:order-4 md:ml-auto")}
        >
          <button
            className={cn(button({ variant: "ghost", buttonSize: "lg" }), visibility.hiddenMobile)}
          >
            <B3Icon
              aria-label="símbolo da B3"
              className={cn(iconStyle({ iconSize: "md", animation: "zoom" }))}
            />
            <span
              className={cn(
                textElement({
                  textSize: "md",
                  fontWeight: "semibold",
                  spacing: "medium",
                }),
                "ml-3",
              )}
            >
              Importar B3
            </span>
          </button>

          <button
            className={cn(button({ variant: "ghost", buttonSize: "lg" }), visibility.hiddenMobile)}
          >
            <PlusIcon
              arial-label="símbolo adição de ativo"
              className={cn(iconStyle({ animation: "zoom", iconSize: "md" }))}
            />
            <span
              className={cn(
                textElement({
                  textSize: "md",
                  fontWeight: "semibold",
                  spacing: "medium",
                }),
                "ml-3",
              )}
            >
              Adicionar Ativo
            </span>
          </button>
        </div>
      </div>

      <div className={(cn(zIndex({ layer: "cima" })), "-mt-2 md:-mt-3")}>
        <div
          className={cn(appearance({ bg: "white", shadow: "md" }), "overflow-hidden rounded-t-3xl")}
        >
          <div
            className={cn(
              appearance({ bg: "secundaryColor" }),
              "divide-x divide-slate-500",
              visibility.onlyMobile,
            )}
          >
            <div className={cn(layout({ align: "center", direction: "row" }), "flex-1")}>
              <button
                onClick={() =>
                  setWallet(wallet === "previdenciaria" ? "swingtrade" : "previdenciaria")
                }
                className={cn(
                  drawer({
                    variant: "ghost",
                    buttonSize: "sm",
                    textSize: "md",
                    fontWeight: "semibold",
                    spacing: "medium",
                  }),
                )}
              >
                {walletLabel[wallet]}

                <UpArrowIcon
                  aria-label="seta para cima"
                  className={cn(iconStyle({ iconSize: "sm" }), "ml-3")}
                />
              </button>
            </div>
            <button className={cn(button({ variant: "ghost" }), "flex-1")}>
              <PlusIcon
                arial-label="símbolo adição de ativo"
                className={cn(iconStyle({ animation: "zoom", iconSize: "md" }))}
              />
              <span
                className={cn(
                  textElement({
                    textSize: "md",
                    fontWeight: "semibold",
                    spacing: "medium",
                  }),
                  "ml-3",
                )}
              >
                Adicionar Ativo
              </span>
            </button>
          </div>

          <MetricsBar />
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;

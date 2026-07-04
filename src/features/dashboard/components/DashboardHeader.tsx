import { Eye, Menu } from "lucide-react";

import logo from "@/assets/logo/investry-icon.webp";

import { useWallet } from "@/features/portfolio/context/WalletContext";

import MetricsBar from "./MetricsBar";

import { UpArrowIcon, PlusIcon, B3Icon } from "@/assets/svg";

import { cn } from "@/lib/cn";

import { button, appearance, layout, iconStyle, textElement, drawer } from "@/styles";
const marginLeft = "ml-3";

const walletLabel: Record<string, string> = {
  previdenciaria: "Previdenciária",
  swingtrade: "Swing Trade",
};

const DashboardHeader = () => {
  const { wallet, setWallet } = useWallet();

  return (
    <header className={cn(appearance({ bg: "primaryColor", textColor: "white" }))}>
      <div
        className={cn(
          layout({ align: "between", direction: "row" }),
          "mx-auto md:py-[9px] py-0 max-w-[94%] lg:max-w-[74%]",
        )}
      >
        <div className={cn(layout({ align: "center" }), "order-1 md:order-1 md:mr-8")}>
          <button
            className={cn(button({ animation: "zoom" }))}
            onClick={() => window.location.reload()}
          >
            <img src={logo} alt="logo investry" className={cn(iconStyle({ iconSize: "logo" }))} />
            <span
              className={cn(
                textElement({
                  textSize: "xxl",
                  spacing: "large",
                  fontWeight: "semibold",
                }),
                marginLeft,
              )}
            >
              Investry
            </span>
          </button>
        </div>

        <div className={cn(layout({ display: "onlyDesktop" }), "order-5 md:order-2")}>
          <button
            onClick={() => setWallet(wallet === "previdenciaria" ? "swingtrade" : "previdenciaria")}
            className={cn(
              drawer({
                drawerType: "primaryDrawer",
                buttonSize: "pill",
                textSize: "md",
                fontWeight: "semibold",
                spacing: "medium",
              }),
            )}
          >
            {walletLabel[wallet]}
            <UpArrowIcon
              aria-label="seta para cima"
              className={cn(iconStyle({ iconSize: "xs" }), marginLeft)}
            />
          </button>
        </div>

        <div className="order-2 pr-0 md:order-3 md:ml-1 ml-auto">
          <button className={cn(button({ buttonType: "primaryGhost", buttonSize: "pill" }))}>
            <Eye className={cn(iconStyle({ iconSize: "xl", animation: "zoom" }))} />
          </button>
        </div>

        <div className="md:order-6 md:ml-10">
          <button
            className={cn(
              button({ buttonSize: "pill" }),
              layout({ display: "onlyDesktop" }),
              appearance({ rounded: "full" }),
              "relative md:border pr-12 md:border-slate-400",
            )}
          >
            <Menu className={cn(iconStyle({ animation: "zoom", iconSize: "xl" }))} />

            <span
              className={cn(
                layout({ align: "center" }),
                appearance({ rounded: "full" }),
                "absolute right-0 inset-y-0 aspect-square bg-blue-600",
              )}
            >
              RO
            </span>
          </button>

          <button
            className={cn(
              layout({ display: "onlyMobile" }),
              button({ buttonSize: "pill" }),
              "mr-3 ",
            )}
          >
            <Menu className={cn(iconStyle({ animation: "zoom", iconSize: "xl" }))} />
          </button>
        </div>

        <div
          className={cn(layout({ gap: "lg", direction: "row" }), "order-6 md:order-4 md:ml-auto")}
        >
          <button
            className={cn(
              button({ buttonType: "primaryGhost", buttonSize: "pill" }),
              layout({ display: "onlyDesktop" }),
            )}
          >
            <B3Icon
              aria-label="símbolo da B3"
              className={cn(iconStyle({ iconSize: "lg", animation: "zoom" }))}
            />
            <span
              className={cn(
                textElement({
                  textSize: "sm",
                  fontWeight: "semibold",
                  spacing: "medium",
                }),
                marginLeft,
              )}
            >
              Importar B3
            </span>
          </button>

          <button
            className={cn(
              button({ buttonType: "primaryGhost", buttonSize: "pill" }),
              layout({ display: "onlyDesktop" }),
            )}
          >
            <PlusIcon
              arial-label="símbolo adição de ativo"
              className={cn(iconStyle({ animation: "zoom", iconSize: "lg" }))}
            />
            <span
              className={cn(
                textElement({
                  textSize: "sm",
                  fontWeight: "semibold",
                  spacing: "medium",
                }),
                marginLeft,
              )}
            >
              Adicionar Ativo
            </span>
          </button>
        </div>
      </div>

      <div
        className={cn(
          appearance({ bg: "white", shadow: "large", rounded: "largeTop" }),
          layout({ layer: "up", direction: "col" }),
          "-mt-2 md:-mt-3 ",
        )}
      >
        <div
          className={cn(
            appearance({ bg: "secundaryColor", border: "divider", rounded: "largeTop" }),
            layout({ display: "onlyMobile" }),
          )}
        >
          <div className={cn(layout({ align: "center" }), "flex-1")}>
            <button
              onClick={() =>
                setWallet(wallet === "previdenciaria" ? "swingtrade" : "previdenciaria")
              }
              className={cn(
                drawer({
                  buttonType: "primaryGhost",
                  textSize: "sm",
                  fontWeight: "semibold",
                  spacing: "medium",
                }),
                "my-4",
              )}
            >
              {walletLabel[wallet]}

              <UpArrowIcon
                aria-label="seta para cima"
                className={cn(iconStyle({ iconSize: "lg" }), marginLeft)}
              />
            </button>
          </div>
          <button className={cn(button(), "flex-1")}>
            <PlusIcon
              arial-label="símbolo adição de ativo"
              className={cn(iconStyle({ animation: "zoom", iconSize: "lg" }))}
            />
            <span
              className={cn(
                textElement({
                  textSize: "sm",
                  fontWeight: "semibold",
                  spacing: "medium",
                }),
                marginLeft,
              )}
            >
              Adicionar Ativo
            </span>
          </button>
        </div>

        <MetricsBar />
      </div>
    </header>
  );
};

export default DashboardHeader;

import { Eye, Menu } from "lucide-react";

import { investryIcon } from "@/assets/images";

import { useWallet } from "@/features/portfolio/hooks/useWallet";

import MetricsBar from "./MetricsBar";

import { PlusIcon, B3Icon } from "@/assets/svg";

import { cn } from "@/lib/cn";

import { buttonType, appearance, layout, iconStyle, textElement } from "@/styles";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { selectType } from "@/styles/tv/selectType";
const marginLeft = "ml-3";

const DashboardHeader = () => {
  const { wallet, wallets, setWallet, loading } = useWallet();

  return (
    <header className={cn(appearance({ bg: "primaryColor", textColor: "white" }))}>
      <div
        className={cn(
          layout({ align: "between", direction: "row" }),
          "mx-auto px-2 md:py-[9px] max-w-[94%] lg:max-w-[75%] h-23",
        )}
      >
        <div className={cn(layout({ align: "center" }), "order-1 md:order-1 md:mr-8")}>
          <button
            className={cn(buttonType({ animation: "zoom" }))}
            onClick={() => window.location.reload()}
          >
            <img
              src={investryIcon}
              alt="logo investry"
              className={cn(iconStyle({ width: "logo" }))}
            />
            <span
              className={cn(
                textElement({
                  textSize: "logo",
                  spacing: "medium",
                  fontWeight: "semibold",
                }),
                marginLeft,
              )}
            >
              Investry
            </span>
          </button>
        </div>

        <div
          className={cn(layout({ screen: "onlyDesktop", alignY: "center" }), "order-5 md:order-2")}
        >
          <Select value={wallet?.id ?? ""} onValueChange={setWallet} disabled={loading}>
            <SelectTrigger
              className={cn(
                selectType({
                  ghostType: "primaryGhost",
                  boxSize: "secondaryPill",
                  textSize: "md",
                  fontWeight: "semibold",
                  spacing: "small",
                  height: "xl",
                }),
              )}
            >
              <SelectValue
                placeholder={loading ? "Carregando carteiras" : "Selecione a carteira"}
              />
            </SelectTrigger>

            <SelectContent className="">
              {wallets.map((wallet) => (
                <SelectItem key={wallet.id} value={wallet.id}>
                  {wallet.nome}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div
          className={cn(layout({ alignY: "center" }), "order-2 pr-0 md:order-3 md:ml-2 ml-auto")}
        >
          <button
            className={cn(buttonType({ ghostType: "primaryGhost", boxSize: "secondaryPill" }))}
          >
            <Eye className={cn(iconStyle({ width: "xl", animation: "zoom" }))} />
          </button>
        </div>

        <div className={cn(layout({ alignY: "center" }), "md:order-6 md:ml-10")}>
          <button
            className={cn(
              buttonType({ boxSize: "secondaryPill" }),
              layout({ screen: "onlyDesktop" }),
              appearance({ rounded: "full" }),
              "relative md:border pr-12 md:border-slate-400",
            )}
          >
            <Menu className={cn(iconStyle({ animation: "zoom", width: "xl" }))} />

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
              layout({ screen: "onlyMobile" }),
              buttonType({ boxSize: "secondaryPill" }),
              "mr-3 ",
            )}
          >
            <Menu className={cn(iconStyle({ animation: "zoom", width: "xl" }))} />
          </button>
        </div>

        <div
          className={cn(
            layout({ gap: "lg", direction: "row", alignY: "center" }),
            "order-6 md:order-4 md:ml-auto",
          )}
        >
          <button
            className={cn(
              buttonType({ ghostType: "primaryGhost", boxSize: "secondaryPill" }),
              layout({ screen: "onlyDesktop" }),
            )}
          >
            <B3Icon
              aria-label="símbolo da B3"
              className={cn(iconStyle({ width: "lg", animation: "zoom" }))}
            />
            <span
              className={cn(
                textElement({
                  textSize: "sm",
                  fontWeight: "semibold",
                  spacing: "small",
                }),
                marginLeft,
              )}
            >
              Importar B3
            </span>
          </button>

          <button
            className={cn(
              buttonType({ ghostType: "primaryGhost", boxSize: "secondaryPill" }),
              layout({ screen: "onlyDesktop" }),
            )}
          >
            <PlusIcon
              arial-label="símbolo adição de ativo"
              className={cn(iconStyle({ animation: "zoom", width: "lg" }))}
            />
            <span
              className={cn(
                textElement({
                  textSize: "sm",
                  fontWeight: "semibold",
                  spacing: "small",
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
          appearance({ bg: "white", shadow: "small", rounded: "largeTop" }),
          layout({ layer: "up", direction: "col" }),
          "-mt-2 md:-mt-3",
        )}
      >
        <div
          className={cn(
            appearance({ bg: "secundaryColor", border: "divider", rounded: "largeTop" }),
            layout({ screen: "onlyMobile" }),
            "py-4",
          )}
        >
          <div className={cn(layout({ align: "center" }), "flex-1")}>
            <Select value={wallet?.id ?? ""} onValueChange={setWallet} disabled={loading}>
              <SelectTrigger
                className={cn(
                  buttonType({
                    ghostType: "primaryGhost",
                    textSize: "sm",
                    fontWeight: "semibold",
                    spacing: "small",
                  }),
                )}
              >
                <SelectValue
                  placeholder={loading ? "Carregando carteiras" : "Selecione a carteira"}
                />
              </SelectTrigger>

              <SelectContent>
                {wallets.map((wallet) => (
                  <SelectItem key={wallet.id} value={wallet.id}>
                    {wallet.nome}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <button className={cn(buttonType(), "flex-1")}>
            <PlusIcon
              arial-label="símbolo adição de ativo"
              className={cn(iconStyle({ animation: "zoom", width: "lg" }))}
            />
            <span
              className={cn(
                textElement({
                  textSize: "sm",
                  fontWeight: "semibold",
                  spacing: "small",
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

import { appearance, layout, textElement } from "@/styles";
import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { cardType } from "@/styles/tv/cardType";

const AUTH_IMAGE_URL =
  "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80";

interface AuthLayoutProps {
  title: string;
  subtitle: string;
  footerText: string;
  footerLinkText: string;
  footerLinkHref: string;
  children: ReactNode;
}

const marginTop03 = "mt-3";
const marginTop04 = "mt-4";

export function AuthLayout({
  title,
  subtitle,
  footerText,
  footerLinkText,
  footerLinkHref,
  children,
}: AuthLayoutProps) {
  return (
    <div
      className={cn(layout({ align: "center" }), appearance({ bg: "gradient" }), "min-h-screen")}
    >
      <div className={cn(cardType({ widht: "medium", shadow: "extraLarge", animation: "fadeIn" }))}>
        <div className={cn(layout({ direction: "responsiveRow" }))}>
          <div className={cn(layout({ display: "relative" }), "h-80 md:h-auto md:w-1/2")}>
            <img
              src={AUTH_IMAGE_URL}
              alt="Área de login"
              className={cn(appearance({ imageStyle: "fill" }))}
            />
            <div className={cn(appearance({ bgEffect: "blackSlate" }))} />
            <div
              className={cn(
                layout({ align: "center", direction: "col" }),
                textElement({ textColor: "white", textSize: "sm", shadowStyle: "drop" }),
                "absolute inset-0 text-center md:text-lg px-2",
              )}
            >
              <p
                className={cn(
                  textElement({
                    spacing: "extraLarge",
                    textColor: "blueSky",
                  }),
                )}
              >
                Seu patrimônio. Sua estratégia. Sua identidade.
              </p>
              <h1
                className={cn(
                  textElement({ fontWeight: "bold", textSize: "xxl" }),
                  [marginTop04],
                  "md:text-5xl md:leading-14",
                )}
              >
                Bem-vindo(a)
                <br />
                de volta
              </h1>
              <p
                className={cn(
                  textElement({ textColor: "lightSlate" }),
                  [marginTop04],
                  "max-w-sm leading-6",
                )}
              >
                Gerencie sua carteira pessoal com foco em liberdade e disciplina financeira.
              </p>
            </div>
          </div>

          <div className={cn(layout({ direction: "col" }), "flex-1 p-10 sm:p-12")}>
            <div className={cn(textElement({ textSize: "sm", textColor: "dark" }))}>
              <p
                className={cn(
                  textElement({
                    textColor: "slate",
                    spacing: "large",
                    fontWeight: "semibold",
                  }),
                  "uppercase",
                )}
              >
                Investry. seu portfólio.
              </p>
              <h2
                className={cn(textElement({ textSize: "xxl", fontWeight: "bold" }), [marginTop03])}
              >
                {title}
              </h2>
              <p className="mt-1">{subtitle}</p>
            </div>

            <div className={marginTop03}>{children}</div>

            <p className={cn(layout({ align: "center" }), textElement({ textSize: "sm" }), "mt-6")}>
              {footerText}{" "}
              <Link
                to={footerLinkHref}
                className={cn(textElement({ fontWeight: "medium", variant: "link" }), "ml-1")}
              >
                {footerLinkText}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

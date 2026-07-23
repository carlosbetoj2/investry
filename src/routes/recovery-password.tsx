import { createFileRoute } from "@tanstack/react-router";
import RecoveryPasswordPage from "@/features/auth/pages/RecoveryPasswordPage";

export const Route = createFileRoute("/recovery-password")({
  head: () => ({
    meta: [
      { title: "Investry — Recuperar Senha" },
      { name: "description", content: "Recupere sua senha Investry com instruções por email." },
    ],
  }),
  component: RecoveryPasswordPage,
});

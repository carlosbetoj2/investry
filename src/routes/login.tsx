import { createFileRoute } from "@tanstack/react-router";
import LoginPage from "@/features/auth/pages/LoginPage";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Investry — Login" },
      { name: "description", content: "Acesse a sua conta Investry e gerencie suas finanças." },
    ],
  }),
  component: LoginPage,
});

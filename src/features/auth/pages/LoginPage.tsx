import LoginForm from "@/features/auth/components/LoginForm";
import { AuthLayout } from "@/features/auth/components/AuthLayout";

export default function LoginPage() {
  return (
    <AuthLayout
      title="LOGIN"
      subtitle="Entre com suas informações pessoais"
      footerText="Ainda não tem conta?"
      footerLinkText="Cadastre-se!"
      footerLinkHref="/register"
    >
      <LoginForm />
    </AuthLayout>
  );
}

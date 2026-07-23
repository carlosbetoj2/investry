import RegisterForm from "@/features/auth/components/RegisterForm";
import { AuthLayout } from "@/features/auth/components/AuthLayout";

export default function RegisterPage() {
  return (
    <AuthLayout
      title="CRIAR CONTA"
      subtitle="Preencha os dados para criar sua conta"
      footerText="Já tem uma conta?"
      footerLinkText="Faça login"
      footerLinkHref="/login"
    >
      <RegisterForm />
    </AuthLayout>
  );
}

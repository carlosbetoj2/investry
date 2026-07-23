import RecoveryPasswordForm from "@/features/auth/components/RecoveryPasswordForm";
import { AuthLayout } from "@/features/auth/components/AuthLayout";

export default function RecoveryPasswordPage() {
  return (
    <AuthLayout
      title="RECUPERAR SENHA"
      subtitle="Envie seu email para receber instruções de recuperação"
      footerText="Lembrou a senha?"
      footerLinkText="Faça login"
      footerLinkHref="/login"
    >
      <RecoveryPasswordForm />
    </AuthLayout>
  );
}

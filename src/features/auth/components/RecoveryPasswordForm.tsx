import { useEffect, useState, type FormEvent } from "react";
import { Link } from "@tanstack/react-router";
import { Mail } from "lucide-react";
import { getSession, resetPassword } from "@/features/auth/services/auth-service";
import { layout, textElement, iconStyle, inputType, buttonType } from "@/styles";
import { cn } from "@/lib/cn";
import { appHomeHref } from "@/lib/base-path";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function RecoveryPasswordForm() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [formError, setFormError] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    let active = true;

    getSession().then(({ data }) => {
      if (!active) {
        return;
      }

      if (data.session?.user) {
        window.location.assign(appHomeHref());
      }
    });

    return () => {
      active = false;
    };
  }, []);

  function validate() {
    setEmailError("");
    setFormError("");

    if (!email.trim()) {
      setEmailError("O email é obrigatório.");
      return false;
    }

    if (!EMAIL_PATTERN.test(email)) {
      setEmailError("Informe um email válido.");
      return false;
    }

    return true;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!validate()) {
      return;
    }

    setLoading(true);
    const { error } = await resetPassword(email);
    setLoading(false);

    if (error) {
      setFormError("Não foi possível enviar as instruções. Verifique o email e tente novamente.");
      return;
    }

    setSent(true);
    setMessage("Enviamos um email com instruções para recuperar sua senha.");
  }

  async function handleResend() {
    if (!validate()) {
      return;
    }

    setLoading(true);
    const { error } = await resetPassword(email);
    setLoading(false);

    if (error) {
      setFormError("Não foi possível reenviar as instruções. Tente novamente mais tarde.");
      return;
    }

    setMessage("Reenviamos as instruções para o mesmo email.");
  }

  return (
    <div className="space-y-6">
      {sent ? (
        <div className="space-y-4 rounded-2xl border border-blue-100 bg-blue-50 p-6">
          <p className="text-sm font-semibold text-slate-700">Pronto!</p>
          <p className="text-sm text-slate-600">{message}</p>
          <button
            type="button"
            onClick={handleResend}
            disabled={loading}
            className="w-full h-12 rounded-lg bg-blue-600 text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-300"
          >
            {loading ? "Reenviando..." : "Reenviar instruções"}
          </button>
          <Link to="/login" className="block text-center text-sm text-blue-600 hover:underline">
            Voltar ao login
          </Link>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className={cn(textElement({ textSize: "sm" }), "space-y-6")}>
          {formError ? <p className={cn(textElement({ variant: "error" }))}>{formError}</p> : null}

          <div>
            <label
              className={cn(textElement({ fontWeight: "medium" }), layout({ display: "block" }))}
              htmlFor="login-email"
            >
              Email
            </label>
            <div
              className={cn(layout({ display: "relative" }), textElement({ textColor: "slate" }))}
            >
              <Mail className={cn(iconStyle({ variant: "inLabel" }))} />
              <input
                id="login-email"
                type="email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className={cn(inputType({ height: "xxl" }), "pl-12 mt-1")}
                placeholder="E-mail"
              />
            </div>
            {emailError ? (
              <p className={cn(textElement({ variant: "error" }), "mt-2")}>{emailError}</p>
            ) : null}
          </div>

          <button
            type="submit"
            disabled={loading}
            className={cn(
              buttonType({ variant: "submit", height: "xxl" }),
              textElement({ textColor: "white" }),
            )}
          >
            {loading ? "Enviando..." : "Enviar instruções"}
          </button>

          <Link
            to="/login"
            className={cn(
              layout({ display: "block" }),
              textElement({ variant: "link" }),
              "text-center",
            )}
          >
            Voltar ao login
          </Link>
        </form>
      )}
    </div>
  );
}

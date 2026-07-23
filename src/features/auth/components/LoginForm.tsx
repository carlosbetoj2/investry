import { useState, type FormEvent } from "react";
import { Link } from "@tanstack/react-router";
import { Mail, Lock } from "lucide-react";
import { signIn } from "@/features/auth/services/auth-service";
import { textElement, layout, inputType, iconStyle, buttonType } from "@/styles";
import { cn } from "@/lib/cn";
import { appHomeHref } from "@/lib/base-path";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [formError, setFormError] = useState("");

  function validate() {
    let valid = true;
    setEmailError("");
    setPasswordError("");
    setFormError("");

    if (!email.trim()) {
      setEmailError("O email é obrigatório.");
      valid = false;
    } else if (!EMAIL_PATTERN.test(email)) {
      setEmailError("Informe um email válido.");
      valid = false;
    }

    if (!password) {
      setPasswordError("A senha é obrigatória.");
      valid = false;
    } else if (password.length < 6) {
      setPasswordError("A senha deve ter pelo menos 6 caracteres.");
      valid = false;
    }

    return valid;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!validate()) return;

    setLoading(true);

    const { error } = await signIn(email, password);

    setLoading(false);

    if (error) {
      setFormError("Não foi possível entrar. Verifique seu email e senha e tente novamente.");
      return;
    }

    window.location.assign(appHomeHref());
  }

  return (
    <form onSubmit={handleSubmit} className={cn(textElement({ textSize: "sm" }), "space-y-6")}>
      {formError ? <p className={cn(textElement({ variant: "error" }))}>{formError}</p> : null}

      <div>
        <label
          className={cn(textElement({ fontWeight: "medium" }), layout({ display: "block" }))}
          htmlFor="login-email"
        >
          Email
        </label>
        <div className={cn(layout({ display: "relative" }), textElement({ textColor: "slate" }))}>
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

      <div>
        <label
          className={cn(textElement({ fontWeight: "medium" }), layout({ display: "block" }))}
          htmlFor="login-password"
        >
          Senha
        </label>
        <div className={cn(layout({ display: "relative" }), textElement({ textColor: "slate" }))}>
          <Lock className={cn(iconStyle({ variant: "inLabel" }))} />
          <input
            id="login-password"
            type="password"
            required
            minLength={6}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className={cn(inputType({ height: "xxl" }), "pl-12 mt-1")}
            placeholder="Senha"
          />
        </div>
        {passwordError ? (
          <p className={cn(textElement({ variant: "error" }), "mt-2")}>{passwordError}</p>
        ) : null}
      </div>

      <div className={cn(layout({ direction: "responsiveRow" }), "gap-4 md:justify-between")}>
        <label
          className={cn(
            layout({ display: "inline" }),
            textElement({ textColor: "blackSlate" }),
            "gap-2",
          )}
        >
          <input type="checkbox" className={cn(buttonType({ width: "sm", variant: "outline" }))} />
          Lembre-se de mim
        </label>

        <Link to="/recovery-password" className={cn(textElement({ variant: "link" }))}>
          Esqueceu a senha?
        </Link>
      </div>

      <button
        type="submit"
        disabled={loading}
        className={cn(
          buttonType({ variant: "submit", height: "xxl" }),
          textElement({ textColor: "white" }),
        )}
      >
        {loading ? "Entrando..." : "Entrar"}
      </button>
    </form>
  );
}

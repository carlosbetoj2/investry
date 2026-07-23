import { useRef, useState, type FormEvent } from "react";
import { User, Mail, Lock } from "lucide-react";
import { signUp } from "@/features/auth/services/auth-service";
import { textElement, layout, inputType, iconStyle, buttonType } from "@/styles";
import { cn } from "@/lib/cn";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function RegisterForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const [formError, setFormError] = useState("");
  const [formSuccess, setFormSuccess] = useState("");
  const submittingRef = useRef(false);

  function validate() {
    let valid = true;

    setNameError("");
    setEmailError("");
    setPasswordError("");
    setConfirmPasswordError("");
    setFormError("");
    setFormSuccess("");

    if (!name.trim()) {
      setNameError("O nome é obrigatório.");
      valid = false;
    }

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

    if (!confirmPassword) {
      setConfirmPasswordError("A confirmação é obrigatória.");
      valid = false;
    } else if (password !== confirmPassword) {
      setConfirmPasswordError("As senhas não coincidem.");
      valid = false;
    }

    return valid;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (submittingRef.current) {
      return;
    }

    if (!validate()) {
      return;
    }

    submittingRef.current = true;
    setLoading(true);

    console.debug("RegisterForm: handleSubmit fired", {
      email,
      name,
    });

    const { data, error } = await signUp(email, password, name);

    setLoading(false);
    submittingRef.current = false;

    if (error) {
      console.warn("RegisterForm: signup error", error);

      const message =
        error.status === 429
          ? "Muitas tentativas de cadastro. Aguarde alguns instantes e tente novamente."
          : error.message.includes("already registered")
            ? "Este email já possui uma conta cadastrada."
            : "Não foi possível criar a conta. Verifique seus dados e tente novamente.";

      setFormError(message);
      return;
    }

    if (!data.user) {
      setFormError("Não foi possível criar sua conta. Tente novamente.");
      return;
    }

    setFormSuccess("Conta criada com sucesso! Verifique seu email para confirmar o cadastro.");

    setName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  }

  return (
    <form onSubmit={handleSubmit} className={cn(textElement({ textSize: "sm" }), "space-y-6")}>
      {formError ? <p className={cn(textElement({ variant: "error" }))}>{formError}</p> : null}
      {formSuccess ? (
        <p className={cn(textElement({ variant: "success" }))}>{formSuccess}</p>
      ) : null}

      <div>
        <label
          className={cn(textElement({ fontWeight: "medium" }), layout({ display: "block" }))}
          htmlFor="register-name"
        >
          Nome
        </label>

        <div className={cn(layout({ display: "relative" }), textElement({ textColor: "slate" }))}>
          <User className={cn(iconStyle({ variant: "inLabel" }))} />

          <input
            id="register-name"
            type="text"
            required
            value={name}
            onChange={(event) => setName(event.target.value)}
            className={cn(inputType({ height: "xxl" }), "pl-12 mt-1")}
            placeholder="Nome"
          />
        </div>

        {nameError ? (
          <p className={cn(textElement({ variant: "error" }), "mt-2")}>{nameError}</p>
        ) : null}
      </div>

      <div>
        <label
          className={cn(textElement({ fontWeight: "medium" }), layout({ display: "block" }))}
          htmlFor="register-email"
        >
          Email
        </label>

        <div className={cn(layout({ display: "relative" }), textElement({ textColor: "slate" }))}>
          <Mail className={cn(iconStyle({ variant: "inLabel" }))} />

          <input
            id="register-email"
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
          htmlFor="register-password"
        >
          Senha
        </label>

        <div className={cn(layout({ display: "relative" }), textElement({ textColor: "slate" }))}>
          <Lock className={cn(iconStyle({ variant: "inLabel" }))} />

          <input
            id="register-password"
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

      <div>
        <label
          className={cn(textElement({ fontWeight: "medium" }), layout({ display: "block" }))}
          htmlFor="register-confirm-password"
        >
          Confirmar senha
        </label>

        <div className={cn(layout({ display: "relative" }), textElement({ textColor: "slate" }))}>
          <Lock className={cn(iconStyle({ variant: "inLabel" }))} />

          <input
            id="register-confirm-password"
            type="password"
            required
            minLength={6}
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
            className={cn(inputType({ height: "xxl" }), "pl-12 mt-1")}
            placeholder="Confirmar senha"
          />
        </div>

        {confirmPasswordError ? (
          <p className={cn(textElement({ variant: "error" }), "mt-2")}>{confirmPasswordError}</p>
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
        {loading ? "Criando conta..." : "Criar conta"}
      </button>
    </form>
  );
}

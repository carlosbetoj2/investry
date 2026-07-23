import { supabase } from "../../../lib/supabase/client";

export async function signUp(email: string, password: string, nome: string) {
  return supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        display_name: nome,
      },
    },
  });
}

export async function signIn(email: string, password: string) {
  return supabase.auth.signInWithPassword({
    email,
    password,
  });
}

export async function signOut() {
  return supabase.auth.signOut();
}

export async function getSession() {
  return supabase.auth.getSession();
}

export function onAuthStateChange(callback: Parameters<typeof supabase.auth.onAuthStateChange>[0]) {
  return supabase.auth.onAuthStateChange(callback);
}

export async function resetPassword(email: string) {
  return supabase.auth.resetPasswordForEmail(email, {
    redirectTo: window.location.origin + "/recovery-password",
  });
}

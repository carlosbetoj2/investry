import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { Session, User } from "@supabase/supabase-js";
import {
  getSession,
  onAuthStateChange,
  resetPassword,
  signIn,
  signUp,
  signOut,
} from "../services/auth-service";

export type AuthResponse =
  | Awaited<ReturnType<typeof signUp>>
  | Awaited<ReturnType<typeof signIn>>
  | Awaited<ReturnType<typeof resetPassword>>;

export interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<AuthResponse>;
  signUp: (email: string, password: string) => Promise<AuthResponse>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<AuthResponse>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  async function handleSignOut() {
    const { error } = await signOut();

    if (error) {
      throw error;
    }
  }

  useEffect(() => {
    let mounted = true;
    let unsubscribe: (() => void) | undefined;

    async function initialize() {
      const { data, error } = await getSession();

      if (!mounted) {
        return;
      }

      if (!error) {
        setSession(data.session);
        setUser(data.session?.user ?? null);
      } else {
        setSession(null);
        setUser(null);
      }

      setLoading(false);

      const response = onAuthStateChange(async (_, newSession) => {
        if (!mounted) {
          return;
        }

        setSession(newSession);
        setUser(newSession?.user ?? null);
      });

      unsubscribe = response.data?.subscription?.unsubscribe;
    }

    initialize();

    return () => {
      mounted = false;
      unsubscribe?.();
    };
  }, []);

  const value: AuthContextType = {
    user,
    session,
    loading,
    signIn,
    signUp,
    signOut: handleSignOut,
    resetPassword,
  };

  if (loading) {
    return null;
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}

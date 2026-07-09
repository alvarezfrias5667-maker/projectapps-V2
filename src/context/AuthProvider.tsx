import React, { createContext, useContext, useEffect, useState } from "react";
import { User, Session } from "@supabase/supabase-js";
import { authService } from "../services/authService";
import { buyerService } from "../services/buyerService";
import { BuyerProfile } from "../types/supabase";

interface AuthContextType {
  user: User | null;
  session: Session | null;
  profile: BuyerProfile | null;
  loading: boolean;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<BuyerProfile | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async (userId: string, email: string) => {
    try {
      const prof = await buyerService.ensureProfile(userId, email);
      setProfile(prof);
    } catch (err) {
      console.error("Error loading profile:", err);
    }
  };

  const refreshProfile = async () => {
    if (user) {
      await fetchProfile(user.id, user.email || "");
    }
  };

  useEffect(() => {
    // Check active session on mount
    authService.getSession().then((activeSession) => {
      setSession(activeSession);
      const activeUser = activeSession?.user ?? null;
      setUser(activeUser);
      
      if (activeUser) {
        // Safe check for local storage migration if needed
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("userEmail", activeUser.email || "");
        fetchProfile(activeUser.id, activeUser.email || "").finally(() => {
          setLoading(false);
        });
      } else {
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("userEmail");
        setProfile(null);
        setLoading(false);
      }
    }).catch(() => {
      setLoading(false);
    });

    // Listen for auth changes
    const unsubscribe = authService.onAuthStateChange((currentSession) => {
      setSession(currentSession);
      const currentUser = currentSession?.user ?? null;
      setUser(currentUser);

      if (currentUser) {
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("userEmail", currentUser.email || "");
        fetchProfile(currentUser.id, currentUser.email || "");
      } else {
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("userEmail");
        setProfile(null);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const signOut = async () => {
    setLoading(true);
    try {
      await authService.signOut();
      setUser(null);
      setSession(null);
      setProfile(null);
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("userEmail");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, session, profile, loading, signOut, refreshProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
};

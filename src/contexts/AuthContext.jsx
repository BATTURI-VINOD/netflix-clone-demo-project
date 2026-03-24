import { createContext, useContext, useEffect, useMemo, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = window.localStorage.getItem("netflixCloneUser");
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch {
        window.localStorage.removeItem("netflixCloneUser");
      }
    }
    setLoading(false);
  }, []);

  const value = useMemo(
    () => ({
      user,
      loading,
      login: (data) => {
        setUser(data);
        window.localStorage.setItem("netflixCloneUser", JSON.stringify(data));
      },
      logout: () => {
        setUser(null);
        window.localStorage.removeItem("netflixCloneUser");
      },
    }),
    [user, loading],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return ctx;
}

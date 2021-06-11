import { createContext, useEffect, useState } from "react";
import { useRouter } from "next/router";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);

  const router = useRouter();

  useEffect(() => userLoggedIn(), []);

  const register = async (user) => {
    setLoading(true);

    const res = await fetch("/api/auth/reg", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: user.username,
        email: user.email,
        password: user.password,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      setLoading(false);
      setError(data);
    } else {
      setLoading(false);
      setSuccess(data);
    }
  };

  const login = async (user) => {
    setLoading(true);

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: user.email,
        password: user.password,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      setLoading(false);
      setError(data);
    } else {
      setLoading(false);
      setSuccess(data);
    }
  };

  const logout = async () => {
    setLoading(true);

    const res = await fetch("/api/auth/logout", {
      method: "POST",
    });

    if (res.ok) {
      setLoading(false);
      setUser(null);
      window.location.reload();
    }
  };

  const userLoggedIn = async () => {
    const res = await fetch("/api/auth/user", {
      method: "GET",
    });

    const data = await res.json();

    if (res.ok) {
      setUser(data);
    } else {
      setError(data.msg);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        error,
        success,
        loading,
        register,
        login,
        logout,
        userLoggedIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

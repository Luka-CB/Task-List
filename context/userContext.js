import { createContext, useEffect, useState } from "react";
import { useRouter } from "next/router";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [error, setError] = useState(null);
  const [updError, setUpdError] = useState(null);
  const [delError, setDelError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [updSuccess, setUpdSuccess] = useState(null);
  const [delSuccess, setDelSuccess] = useState(null);

  const router = useRouter();

  useEffect(() => userLoggedIn(), [updSuccess]);

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

  const updateAccount = async (username, email, password) => {
    setLoading(true);

    const res = await fetch("/api/auth/update", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      setLoading(false);
      setUpdError(data);
    } else {
      setLoading(false);
      setUpdSuccess(data);
    }
  };

  const deleteAccount = async () => {
    setLoading(true);

    const res = await fetch("/api/auth/deleteaccount", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });

    const data = await res.json();

    if (!res.ok) {
      setLoading(false);
      setDelError(data);
    } else {
      setLoading(false);
      setDelSuccess(data);
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
        updateAccount,
        updError,
        updSuccess,
        deleteAccount,
        delError,
        delSuccess,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

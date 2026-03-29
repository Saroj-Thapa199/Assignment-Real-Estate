"use client";

import { axiosInstance } from "@/lib/axiosInstance";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

type AuthContextType = {
  user: User | null;
  loading: boolean;
  error: string;
  register: (data: {
    fullName: string;
    email: string;
    password: string;
  }) => Promise<void>;
  login: (data: { email: string; password: string }) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const router = useRouter();

  const fetchUser = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get("/api/v1/auth/me");
      setUser(res.data.data.user);
    } catch (error) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const register = async (data: {
    fullName: string;
    email: string;
    password: string;
  }) => {
    try {
      setLoading(true);
      const { data: resData } = await axiosInstance.post<AuthApiResponse>(
        "/api/v1/auth/register",
        data,
      );
      setUser(resData.data.user);
      setError("");
      router.replace("/");
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.status == 429) {
          setError(error.response?.data);
          return;
        }
        setError(error.response?.data.message);
      } else {
        setError("An error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const login = async (data: { email: string; password: string }) => {
    try {
      setLoading(true);
      const { data: resData } = await axiosInstance.post<AuthApiResponse>(
        "/api/v1/auth/login",
        data,
      );
      setUser(resData.data.user);
      setError("");
      router.replace("/");
    } catch (err) {
      if (err instanceof AxiosError) {
        if (err.status == 429) {
          setError(err.response?.data);
          return;
        }
        setError(err.response?.data.message);
      } else {
        setError("An error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    await axiosInstance.post("/api/v1/auth/logout");
    setUser(null);
    router.push("/login");
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, register, login, logout, error }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return context;
};

// src/hooks/Auth/useLogin.tsx
import { useState } from "react";
import { getKeycloakToken } from "../../Services/Authentication/AuthService";

export const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);

  const login = async (username: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    setLoginError(null);
    setShowSuccess(false);

    try {
      const token = await getKeycloakToken(username, password);
      if (token) {
        localStorage.setItem("access_token", token.access_token);
        localStorage.setItem("refresh_token", token.refresh_token);
        setShowSuccess(true);
        return true;
      } else {
        setLoginError("Credenciales inválidas");
        return false;
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      setLoginError("Error en el servidor. Intenta nuevamente.");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    login,
    isLoading,
    loginError,
    showSuccess,
    setShowSuccess,
  };
};

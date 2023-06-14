import { useEffect, useState } from "react";
import axios from "axios";

function useAuth() {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);
  useEffect(() => {
    // Check if there's an access token in local storage
    const storedAccessToken = localStorage.getItem("access_token");
    if (storedAccessToken) {
      setAccessToken(storedAccessToken);
    }

    // Check if there's a refresh token in local storage
    const storedRefreshToken = localStorage.getItem("refresh_token");
    if (storedRefreshToken) {
      setRefreshToken(storedRefreshToken);
    }
  }, []);

  async function login(email: string, password: string): Promise<void> {
    try {
      const response = await axios.post("/api/login", { email, password });
      const { access_token, refresh_token, expires_in } = response.data;
      setAccessToken(access_token);
      localStorage.setItem("access_token", access_token);
      setRefreshToken(refresh_token);
      localStorage.setItem("refresh_token", refresh_token);
      // Store the expiration time for the access token
      const expiresAt = new Date(Date.now() + expires_in * 1000);
      localStorage.setItem("expires_at", `${expiresAt.getTime()}`);
    } catch (error) {
      console.error(error);
      // Handle the error, e.g. by displaying an error message
    }
  }
  async function logout(): Promise<void> {
    try {
      await axios.post("/api/logout", { refresh_token: refreshToken });
    } catch (error) {
      console.error(error);
    }
    setAccessToken(null);
    localStorage.removeItem("access_token");
    setRefreshToken(null);
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("expires_at");
  }

  return { accessToken, refreshToken, login, logout };
}

function useAccessToken() {
  const { accessToken, refreshToken, login, logout } = useAuth();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Check if there's an access token in local storage
    const storedAccessToken = localStorage.getItem("access_token");
    const storedExpiresAt = localStorage.getItem("expires_at");
    async function refreshAccessToken(): Promise<void> {
      try {
        const response = await axios.post("/api/token/refresh", {
          refresh_token: refreshToken,
        });
        const { access_token, expires_in } = response.data;
        // setAccessToken(access_token);
        localStorage.setItem("access_token", access_token);
        // Store the expiration time for the access token
        const expiresAt = new Date(Date.now() + expires_in * 1000);
        localStorage.setItem("expires_at", `${expiresAt.getTime()}`);
      } catch (error) {
        console.error(error);
        logout();
      }
      setLoading(false);
    }
    if (storedAccessToken && storedExpiresAt) {
      const expiresAt = new Date(parseInt(storedExpiresAt));
      if (expiresAt > new Date()) {
        // The access token is still valid
        // setAccessToken(storedAccessToken);
        setLoading(false);
      } else if (refreshToken) {
        // The access token has expired, but there's a refresh token

        refreshAccessToken();
      } else {
        // No access token or refresh token, so the user is logged out
        setLoading(false);
      }
    }
  }, [accessToken, refreshToken, login, logout]);

  return { accessToken, loading };
}
export default useAccessToken;

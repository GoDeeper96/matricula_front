import { create } from 'zustand';
import { getKeycloakToken } from '../../Services/Authentication/AuthService';

interface AuthState {
  token: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  loginError: string;
  showSuccess: boolean;

  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  setShowSuccess: (value: boolean) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: localStorage.getItem('access_token'),
  refreshToken: localStorage.getItem('refresh_token'),
  isAuthenticated: !!localStorage.getItem('access_token'),
  isLoading: false,
  loginError: '',
  showSuccess: false,

  login: async (username, password) => {
    set({ isLoading: true, loginError: '', showSuccess: false });

    try {
      const response = await getKeycloakToken(username, password);
      if (response) {
        localStorage.setItem('access_token', response.access_token);
        localStorage.setItem('refresh_token', response.refresh_token);

        set({
          token: response.access_token,
          refreshToken: response.refresh_token,
          isAuthenticated: true,
          isLoading: false,
          showSuccess: true
        });

        return true;
      } else {
        set({ isLoading: false, loginError: 'Credenciales inválidas' });
        return false;
      }
    } catch (error) {
      console.error("❌ Login error:", error);
      set({
        isLoading: false,
        loginError: 'Error de autenticación'
      });
      return false;
    }
  },

  logout: () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    set({
      token: null,
      refreshToken: null,
      isAuthenticated: false,
      loginError: '',
      showSuccess: false
    });
    window.location.href = '/login';
  },

  setShowSuccess: (value) => set({ showSuccess: value }),
}));

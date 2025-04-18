import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
  isAdmin: boolean;
  login: (password: string) => boolean;
  logout: () => void;
}

// In a real app, this would be handled securely through Supabase Auth
// This is a simplified version for the MVP
export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAdmin: false,
      
      login: (password: string) => {
        // Very basic admin authentication - would use Supabase Auth in production
        if (password === 'admin123') {
          set({ isAdmin: true });
          return true;
        }
        return false;
      },
      
      logout: () => {
        set({ isAdmin: false });
      }
    }),
    {
      name: 'fresh-harvest-auth'
    }
  )
);
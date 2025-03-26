
import { toast } from "@/components/ui/use-toast";

export type UserRole = 'hospital' | 'doctor' | 'patient' | 'intern';

export interface User {
  email: string;
  name: string;
  role: UserRole;
}

// This will be replaced with Supabase authentication later
export const getCurrentUser = (): User | null => {
  const userJson = localStorage.getItem('hms_user');
  if (!userJson) return null;
  
  try {
    return JSON.parse(userJson) as User;
  } catch (error) {
    console.error('Error parsing user data', error);
    return null;
  }
};

export const isAuthenticated = (): boolean => {
  return !!getCurrentUser();
};

export const logout = (): void => {
  localStorage.removeItem('hms_user');
  toast({
    title: "Logged out",
    description: "You have been successfully logged out.",
  });
};

export const login = (user: User): void => {
  localStorage.setItem('hms_user', JSON.stringify(user));
};


import { toast } from "@/components/ui/use-toast";

export type UserRole = 'hospital' | 'doctor' | 'patient' | 'intern' | 'super';

export interface User {
  email: string;
  name: string;
  role: UserRole;
  id?: string;
  avatar?: string;
}

// Mock data for super users
export const superUsers: User[] = [
  {
    id: 'super1',
    email: 'admin@hospital.com',
    name: 'Admin User',
    role: 'super',
    avatar: 'https://api.dicebear.com/7.x/personas/svg?seed=admin'
  },
  {
    id: 'super2',
    email: 'system@hospital.com',
    name: 'System Admin',
    role: 'super',
    avatar: 'https://api.dicebear.com/7.x/personas/svg?seed=system'
  },
  {
    id: 'super3',
    email: 'tech@hospital.com',
    name: 'Tech Support',
    role: 'super',
    avatar: 'https://api.dicebear.com/7.x/personas/svg?seed=tech'
  }
];

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

export const isSuperUser = (user: User | null): boolean => {
  if (!user) return false;
  return user.role === 'super';
};

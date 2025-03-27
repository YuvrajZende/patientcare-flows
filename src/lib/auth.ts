
import { toast } from "@/components/ui/use-toast";

export type UserRole = 'hospital' | 'doctor' | 'patient' | 'intern' | 'super';

export interface User {
  email: string;
  name: string;
  role: UserRole;
  id?: string;
  avatar?: string;
}

// Super users for all roles
export const superUsers: User[] = [
  // Super admin users
  {
    id: 'super1',
    email: 'admin@hospital.com',
    name: 'Admin User',
    role: 'super',
    avatar: 'https://api.dicebear.com/7.x/personas/svg?seed=admin'
  },
  // Hospital super users
  {
    id: 'hospital1',
    email: 'manager@hospital.com',
    name: 'Hospital Manager',
    role: 'hospital',
    avatar: 'https://api.dicebear.com/7.x/personas/svg?seed=hospital'
  },
  // Doctor super users
  {
    id: 'doctor1',
    email: 'doctor@hospital.com',
    name: 'Dr. Johnson',
    role: 'doctor',
    avatar: 'https://api.dicebear.com/7.x/personas/svg?seed=doctor'
  },
  // Patient super users
  {
    id: 'patient1',
    email: 'patient@example.com',
    name: 'Jane Smith',
    role: 'patient',
    avatar: 'https://api.dicebear.com/7.x/personas/svg?seed=patient'
  },
  // Intern super users
  {
    id: 'intern1',
    email: 'intern@hospital.com',
    name: 'Medical Intern',
    role: 'intern',
    avatar: 'https://api.dicebear.com/7.x/personas/svg?seed=intern'
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


import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Building2, Users, UserRound, GraduationCap, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from '@/components/ui/use-toast';
import MainLayout from '@/components/Layout/MainLayout';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import SuperUsersList from '@/components/Login/SuperUsersList';
import { UserRole } from '@/lib/auth';

// We'll store these in Supabase once integrated
interface LoginFormData {
  email: string;
  password: string;
  role: UserRole;
}

const Login = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
    role: 'hospital'
  });
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      setRememberMe(checked);
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleRoleChange = (role: UserRole) => {
    setFormData(prev => ({
      ...prev,
      role
    }));
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate login - will replace with Supabase auth
    setTimeout(() => {
      setIsLoading(false);
      
      if (formData.email && formData.password) {
        // Store user data in localStorage for now (will use Supabase session later)
        localStorage.setItem('hms_user', JSON.stringify({
          email: formData.email,
          role: formData.role,
          name: formData.email.split('@')[0]
        }));
        
        toast({
          title: "Login successful",
          description: `Welcome back! You are now logged in as a ${formData.role}.`,
        });
        navigate('/dashboard');
      } else {
        toast({
          title: "Login failed",
          description: "Please fill in all required fields.",
          variant: "destructive",
        });
      }
    }, 1500);
  };

  const roleOptions: {
    id: UserRole;
    name: string;
    icon: React.ReactNode;
    color: string;
  }[] = [
    {
      id: 'hospital',
      name: 'Hospital',
      icon: <Building2 size={isMobile ? 20 : 24} />,
      color: 'bg-hms-hospital'
    },
    {
      id: 'doctor',
      name: 'Doctor',
      icon: <Users size={isMobile ? 20 : 24} />,
      color: 'bg-hms-doctor'
    },
    {
      id: 'patient',
      name: 'Patient',
      icon: <UserRound size={isMobile ? 20 : 24} />,
      color: 'bg-hms-patient'
    },
    {
      id: 'intern',
      name: 'Intern',
      icon: <GraduationCap size={isMobile ? 20 : 24} />,
      color: 'bg-hms-intern'
    }
  ];

  return (
    <MainLayout>
      <div className="min-h-screen pt-20 pb-16 flex flex-col justify-center">
        <div className="container px-4 mx-auto">
          <div className="w-full max-w-md mx-auto">
            <div className="glass-panel p-6 sm:p-8 animate-scale-in">
              <div className="text-center mb-6 sm:mb-8">
                <h1 className="text-xl sm:text-2xl font-bold mb-2">Welcome back</h1>
                <p className="text-sm sm:text-base text-gray-600">Sign in to your account</p>
              </div>

              <Tabs 
                defaultValue="hospital" 
                className="mb-6 sm:mb-8"
                onValueChange={(value) => handleRoleChange(value as UserRole)}
              >
                <TabsList className="grid grid-cols-4 mb-4 sm:mb-6">
                  {roleOptions.map((role) => (
                    <TabsTrigger 
                      key={role.id} 
                      value={role.id}
                      className="flex flex-col items-center py-2 sm:py-3 px-1 gap-1 data-[state=active]:shadow-sm"
                    >
                      <span className={cn(
                        "w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-white mb-1",
                        role.color
                      )}>
                        {role.icon}
                      </span>
                      <span className="text-xs">{role.name}</span>
                    </TabsTrigger>
                  ))}
                </TabsList>

                <TabsContent value={formData.role} className="animate-fade-in">
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full"
                        autoComplete="email"
                      />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="password">Password</Label>
                        <a href="#" className="text-xs sm:text-sm text-hms-primary hover:underline">
                          Forgot password?
                        </a>
                      </div>
                      <Input
                        id="password"
                        name="password"
                        type="password"
                        placeholder="••••••••"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full"
                        autoComplete="current-password"
                      />
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="remember"
                        name="remember"
                        checked={rememberMe}
                        onChange={handleChange}
                        className="rounded text-hms-primary focus:ring-hms-primary"
                      />
                      <Label htmlFor="remember" className="text-sm text-gray-600">Remember me</Label>
                    </div>
                    <Button 
                      type="submit" 
                      className="w-full bg-hms-primary hover:bg-hms-primary/90"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Signing in...
                        </>
                      ) : "Sign in"}
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>

              <SuperUsersList />

              <div className="text-center text-sm mt-6">
                <p className="text-gray-600">
                  Don't have an account?{" "}
                  <a href="#" className="text-hms-primary hover:underline">
                    Create account
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Login;

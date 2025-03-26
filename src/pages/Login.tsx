
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Building2, Users, UserRound, GraduationCap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from '@/components/ui/use-toast';
import MainLayout from '@/components/Layout/MainLayout';
import { cn } from '@/lib/utils';

type UserRole = 'hospital' | 'doctor' | 'patient' | 'intern';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState<UserRole>('hospital');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate login
    setTimeout(() => {
      setIsLoading(false);
      
      if (email && password) {
        toast({
          title: "Login successful",
          description: `Welcome back! You are now logged in as a ${selectedRole}.`,
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
      icon: <Building2 size={24} />,
      color: 'bg-hms-hospital'
    },
    {
      id: 'doctor',
      name: 'Doctor',
      icon: <Users size={24} />,
      color: 'bg-hms-doctor'
    },
    {
      id: 'patient',
      name: 'Patient',
      icon: <UserRound size={24} />,
      color: 'bg-hms-patient'
    },
    {
      id: 'intern',
      name: 'Intern',
      icon: <GraduationCap size={24} />,
      color: 'bg-hms-intern'
    }
  ];

  return (
    <MainLayout>
      <div className="min-h-screen pt-24 pb-16 flex flex-col justify-center">
        <div className="container px-4 mx-auto">
          <div className="max-w-md mx-auto">
            <div className="glass-panel p-8 animate-scale-in">
              <div className="text-center mb-8">
                <h1 className="text-2xl font-bold mb-2">Welcome back</h1>
                <p className="text-gray-600">Sign in to your account</p>
              </div>

              <Tabs 
                defaultValue="hospital" 
                className="mb-8"
                onValueChange={(value) => setSelectedRole(value as UserRole)}
              >
                <TabsList className="grid grid-cols-4 mb-6">
                  {roleOptions.map((role) => (
                    <TabsTrigger 
                      key={role.id} 
                      value={role.id}
                      className="flex flex-col items-center py-3 px-1 gap-1 data-[state=active]:shadow-sm"
                    >
                      <span className={cn(
                        "w-8 h-8 rounded-full flex items-center justify-center text-white mb-1",
                        role.color
                      )}>
                        {role.icon}
                      </span>
                      <span className="text-xs">{role.name}</span>
                    </TabsTrigger>
                  ))}
                </TabsList>

                {roleOptions.map((role) => (
                  <TabsContent key={role.id} value={role.id} className="animate-fade-in">
                    <form onSubmit={handleLogin} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="Enter your email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full"
                        />
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="password">Password</Label>
                          <a href="#" className="text-sm text-hms-primary hover:underline">
                            Forgot password?
                          </a>
                        </div>
                        <Input
                          id="password"
                          type="password"
                          placeholder="••••••••"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="w-full"
                        />
                      </div>
                      <Button 
                        type="submit" 
                        className="w-full bg-hms-primary hover:bg-hms-primary/90"
                        disabled={isLoading}
                      >
                        {isLoading ? "Signing in..." : "Sign in"}
                      </Button>
                    </form>
                  </TabsContent>
                ))}
              </Tabs>

              <div className="text-center text-sm">
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

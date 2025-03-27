
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Building2, Users, UserRound, GraduationCap, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from '@/components/ui/use-toast';
import { Checkbox } from '@/components/ui/checkbox';
import MainLayout from '@/components/Layout/MainLayout';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { UserRole, login } from '@/lib/auth';
import { useAuth } from '@/contexts/AuthContext';

interface RegisterFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: UserRole;
  acceptTerms: boolean;
}

const Register = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const { updateUser } = useAuth();
  const [formData, setFormData] = useState<RegisterFormData>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'patient',
    acceptTerms: false
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      setFormData(prev => ({
        ...prev,
        [name]: checked
      }));
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

  const validateForm = () => {
    if (!formData.name) {
      toast({
        title: "Name is required",
        description: "Please enter your name.",
        variant: "destructive",
      });
      return false;
    }
    
    if (!formData.email) {
      toast({
        title: "Email is required",
        description: "Please enter your email address.",
        variant: "destructive",
      });
      return false;
    }
    
    if (!formData.password) {
      toast({
        title: "Password is required",
        description: "Please enter a password.",
        variant: "destructive",
      });
      return false;
    }
    
    if (formData.password.length < 6) {
      toast({
        title: "Password too short",
        description: "Password must be at least 6 characters long.",
        variant: "destructive",
      });
      return false;
    }
    
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "Please make sure your passwords match.",
        variant: "destructive",
      });
      return false;
    }
    
    if (!formData.acceptTerms) {
      toast({
        title: "Terms not accepted",
        description: "Please accept the terms and conditions.",
        variant: "destructive",
      });
      return false;
    }
    
    return true;
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    // Simulate registration - will replace with Supabase auth
    setTimeout(() => {
      setIsLoading(false);
      
      // Create user object
      const user = {
        email: formData.email,
        name: formData.name,
        role: formData.role,
      };
      
      // Store user data and update context
      login(user);
      updateUser(user);
      
      toast({
        title: "Registration successful",
        description: `Welcome ${formData.name}! Your account has been created.`,
      });
      navigate('/dashboard');
    }, 1500);
  };

  const roleOptions: {
    id: UserRole;
    name: string;
    icon: React.ReactNode;
    color: string;
    description: string;
  }[] = [
    {
      id: 'patient',
      name: 'Patient',
      icon: <UserRound size={isMobile ? 20 : 24} />,
      color: 'bg-hms-patient',
      description: 'Register as a patient to book appointments and access your medical records.'
    },
    {
      id: 'doctor',
      name: 'Doctor',
      icon: <Users size={isMobile ? 20 : 24} />,
      color: 'bg-hms-doctor',
      description: 'Register as a healthcare provider to manage patients and appointments.'
    },
    {
      id: 'intern',
      name: 'Intern',
      icon: <GraduationCap size={isMobile ? 20 : 24} />,
      color: 'bg-hms-intern',
      description: 'Register as a medical intern to assist doctors and learn from them.'
    },
    {
      id: 'hospital',
      name: 'Hospital',
      icon: <Building2 size={isMobile ? 20 : 24} />,
      color: 'bg-hms-hospital',
      description: 'Register as a hospital administrator to manage facilities and staff.'
    }
  ];

  return (
    <MainLayout>
      <div className="min-h-screen pt-20 pb-16 flex flex-col justify-center">
        <div className="container px-4 mx-auto">
          <div className="w-full max-w-md mx-auto">
            <div className="bg-white p-6 sm:p-8 rounded-xl shadow-subtle animate-scale-in">
              <div className="text-center mb-6 sm:mb-8">
                <h1 className="text-xl sm:text-2xl font-bold mb-2">Create your account</h1>
                <p className="text-sm sm:text-base text-gray-600">Join our healthcare platform</p>
              </div>

              <Tabs 
                defaultValue="patient" 
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
                  <p className="text-sm text-gray-600 mb-4">{roleOptions.find(r => r.id === formData.role)?.description}</p>
                  
                  <form onSubmit={handleRegister} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        placeholder="Enter your full name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full"
                        autoComplete="name"
                      />
                    </div>
                    
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
                      <Label htmlFor="password">Password</Label>
                      <Input
                        id="password"
                        name="password"
                        type="password"
                        placeholder="Create a password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full"
                        autoComplete="new-password"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirm Password</Label>
                      <Input
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        placeholder="Confirm your password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className="w-full"
                        autoComplete="new-password"
                      />
                    </div>
                    
                    <div className="flex items-start space-x-2 pt-2">
                      <Checkbox
                        id="acceptTerms"
                        name="acceptTerms" 
                        checked={formData.acceptTerms}
                        onCheckedChange={(checked) => 
                          setFormData(prev => ({ ...prev, acceptTerms: checked as boolean }))
                        }
                      />
                      <Label 
                        htmlFor="acceptTerms" 
                        className="text-sm text-gray-600 font-normal leading-tight"
                      >
                        I agree to the <a href="#" className="text-hms-primary hover:underline">Terms of Service</a> and <a href="#" className="text-hms-primary hover:underline">Privacy Policy</a>
                      </Label>
                    </div>
                    
                    <Button 
                      type="submit" 
                      className="w-full bg-hms-primary hover:bg-hms-primary/90"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Creating Account...
                        </>
                      ) : "Create Account"}
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>

              <div className="text-center text-sm mt-6">
                <p className="text-gray-600">
                  Already have an account?{" "}
                  <a href="/login" className="text-hms-primary hover:underline">
                    Sign in
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

export default Register;

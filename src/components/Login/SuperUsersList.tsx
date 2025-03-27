
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { User, superUsers, login } from '@/lib/auth';
import { toast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { ShieldCheck } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

interface SuperUsersListProps {
  className?: string;
}

const SuperUsersList: React.FC<SuperUsersListProps> = ({ className }) => {
  const navigate = useNavigate();
  const { updateUser } = useAuth(); // Get updateUser from context

  const handleQuickLogin = (user: User) => {
    // First login using the auth module
    login(user);
    
    // Then update the auth context directly to ensure it has the latest user data
    updateUser(user);
    
    toast({
      title: `${user.role.charAt(0).toUpperCase() + user.role.slice(1)} user login`,
      description: `Logged in as ${user.name} with ${user.role} privileges.`,
    });
    
    console.log("Logging in with role:", user.role);
    navigate('/dashboard');
  };

  return (
    <div className={`mt-6 p-4 bg-slate-50 rounded-lg border border-slate-200 ${className}`}>
      <div className="flex items-center gap-2 mb-3">
        <ShieldCheck className="h-5 w-5 text-amber-500" />
        <h3 className="font-medium text-sm">Quick Access (Demo Users)</h3>
      </div>
      
      <div className="grid gap-2">
        {superUsers.map((user) => (
          <div key={user.id} className="flex items-center gap-3 p-2 hover:bg-slate-100 rounded-md transition-colors">
            <img 
              src={user.avatar} 
              alt={user.name} 
              className="w-8 h-8 rounded-full"
            />
            <div className="flex-1 min-w-0">
              <p className="font-medium text-sm truncate">{user.name}</p>
              <p className="text-xs text-slate-500 truncate">
                {user.email} • <span className="capitalize">{user.role}</span>
              </p>
            </div>
            <Button 
              size="sm" 
              variant="outline"
              className="text-xs"
              onClick={() => handleQuickLogin(user)}
            >
              Login
            </Button>
          </div>
        ))}
      </div>
      
      <p className="text-xs text-slate-500 mt-3">
        Use these demo accounts to explore different role-based features.
      </p>
    </div>
  );
};

export default SuperUsersList;

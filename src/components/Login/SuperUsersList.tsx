
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { User, superUsers, login } from '@/lib/auth';
import { toast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { ShieldCheck } from 'lucide-react';

interface SuperUsersListProps {
  className?: string;
}

const SuperUsersList: React.FC<SuperUsersListProps> = ({ className }) => {
  const navigate = useNavigate();

  const handleQuickLogin = (user: User) => {
    login(user);
    toast({
      title: "Super user login",
      description: `Logged in as ${user.name} with super user privileges.`,
    });
    navigate('/dashboard');
  };

  return (
    <div className={`mt-6 p-4 bg-slate-50 rounded-lg border border-slate-200 ${className}`}>
      <div className="flex items-center gap-2 mb-3">
        <ShieldCheck className="h-5 w-5 text-amber-500" />
        <h3 className="font-medium text-sm">Quick Access (Super Users)</h3>
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
              <p className="text-xs text-slate-500 truncate">{user.email}</p>
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
        Super users have elevated privileges for system administration.
      </p>
    </div>
  );
};

export default SuperUsersList;

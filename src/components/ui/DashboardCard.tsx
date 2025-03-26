
import React from 'react';
import { cn } from '@/lib/utils';
import { ChevronRight } from 'lucide-react';

type UserType = 'hospital' | 'doctor' | 'patient' | 'intern';

interface DashboardCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  userType: UserType;
  onClick?: () => void;
}

const DashboardCard: React.FC<DashboardCardProps> = ({
  title,
  description,
  icon,
  userType,
  onClick
}) => {
  return (
    <div 
      className={cn(
        'dash-card cursor-pointer group',
        `dash-card-${userType}`
      )}
      onClick={onClick}
    >
      <div className="p-6">
        <div className="mb-4">
          {icon}
        </div>
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-sm text-gray-600 mb-4">{description}</p>
        <div className="flex items-center text-sm text-hms-primary font-medium">
          <span>Enter Dashboard</span>
          <ChevronRight size={16} className="ml-1 transform group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </div>
  );
};

export default DashboardCard;

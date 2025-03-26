
import React from 'react';
import { cn } from '@/lib/utils';
import { ChevronRight } from 'lucide-react';
import './DashboardCard.css';

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
        'dashboard-card',
        `dash-card-${userType}`
      )}
      onClick={onClick}
    >
      <div className="dashboard-card-content">
        <div className="dashboard-card-icon">
          {icon}
        </div>
        <h3 className="dashboard-card-title">{title}</h3>
        <p className="dashboard-card-description">{description}</p>
        <div className="dashboard-card-link">
          <span>Enter Dashboard</span>
          <ChevronRight size={16} className="dashboard-card-link-icon" />
        </div>
      </div>
    </div>
  );
};

export default DashboardCard;

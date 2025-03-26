
import React from 'react';
import { cn } from '@/lib/utils';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  title,
  description,
  icon,
  className,
  onClick
}) => {
  return (
    <div 
      className={cn(
        'glass-card p-5 sm:p-6 rounded-xl border border-gray-100 transition-all duration-300 hover:shadow-medium animate-fade-in',
        onClick && 'cursor-pointer hover:-translate-y-1',
        className
      )}
      onClick={onClick}
    >
      <div className="mb-3 sm:mb-4 text-hms-primary">
        {icon}
      </div>
      <h3 className="text-base sm:text-lg font-semibold mb-1 sm:mb-2">{title}</h3>
      <p className="text-xs sm:text-sm text-gray-600">{description}</p>
    </div>
  );
};

export default FeatureCard;


import React from 'react';
import { cn } from '@/lib/utils';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  className?: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  title,
  description,
  icon,
  className
}) => {
  return (
    <div className={cn(
      'glass-card p-6 rounded-xl border border-gray-100 transition-all duration-300 hover:shadow-medium animate-fade-in',
      className
    )}>
      <div className="mb-4 text-hms-primary">
        {icon}
      </div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  );
};

export default FeatureCard;

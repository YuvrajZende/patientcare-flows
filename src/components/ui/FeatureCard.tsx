
import React from 'react';
import { cn } from '@/lib/utils';
import './FeatureCard.css';

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
        'feature-card',
        onClick && 'feature-card-clickable',
        className
      )}
      onClick={onClick}
    >
      <div className="feature-card-icon">
        {icon}
      </div>
      <h3 className="feature-card-title">{title}</h3>
      <p className="feature-card-description">{description}</p>
    </div>
  );
};

export default FeatureCard;

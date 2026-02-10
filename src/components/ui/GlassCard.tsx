import React from 'react';
import { cn } from '../../lib/utils';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'strong' | 'light';
  hover?: boolean;
  glow?: boolean;
  [key: string]: unknown;
}

const GlassCard = React.forwardRef<HTMLDivElement, GlassCardProps>(
  ({ children, className, variant = 'default', hover = true, glow = false, ...props }, ref) => {
    const variants = {
      default: 'glass-card',
      strong: 'glass-strong',
      light: 'glass-light',
    };

    return (
      <div
        ref={ref}
        className={cn(
          'rounded-2xl transition-all duration-300',
          variants[variant],
          hover && 'hover:border-accent/30 hover:shadow-xl hover:shadow-accent/5',
          glow && 'glow-accent',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

GlassCard.displayName = 'GlassCard';

export default GlassCard;

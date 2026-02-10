import React from 'react';
import { cn } from '../../lib/utils';

interface GradientTextProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'amber' | 'muted';
  [key: string]: unknown;
}

/**
 * GradientText Component
 * 
 * NOTE: This component now uses a single accent color (amber) instead of rainbow gradients
 * for a more cohesive, professional design following UI/UX best practices.
 * 
 * The previous rainbow gradient (amber -> gold -> purple) has been replaced with
 * a solid accent color to maintain visual consistency.
 */
const GradientText: React.FC<GradientTextProps> = ({
  children,
  className,
  variant = 'default',
  ...props
}) => {
  // Using single accent color instead of gradients for cohesive design
  const variants = {
    default: 'text-accent',
    amber: 'text-accent',
    muted: 'text-foreground-secondary',
  };

  return (
    <span
      className={cn(variants[variant], className)}
      {...props}
    >
      {children}
    </span>
  );
};

export default GradientText;

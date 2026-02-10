import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { cn } from '../../lib/utils';

interface ThemeToggleProps {
  className?: string;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ className }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={cn(
        'relative inline-flex h-9 w-16 items-center rounded-full transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
        theme === 'dark' 
          ? 'bg-slate-700' 
          : 'bg-slate-200',
        className
      )}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      <span className="sr-only">Toggle theme</span>
      <span
        className={cn(
          'inline-flex h-7 w-7 items-center justify-center rounded-full transition-transform duration-300 shadow-sm',
          theme === 'dark' 
            ? 'translate-x-8 bg-slate-900 text-amber-400' 
            : 'translate-x-1 bg-white text-amber-500'
        )}
      >
        {theme === 'dark' ? (
          <Moon className="h-4 w-4" />
        ) : (
          <Sun className="h-4 w-4" />
        )}
      </span>
    </button>
  );
};

export default ThemeToggle;

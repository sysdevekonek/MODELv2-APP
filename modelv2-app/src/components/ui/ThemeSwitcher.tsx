'use client';

import { useTheme } from '@/components/ui/ThemeProvider';
import { Sun, Moon, SunMoonIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  const options = [
    { label: 'light', icon: <Sun size={16} /> },
    { label: 'system', icon: <SunMoonIcon size={16} /> },
    { label: 'dark', icon: <Moon size={16} /> },
  ] as const;

  return (
    <div className="relative group">
      <div className="flex items-center gap-1 bg-themebutton1 h-10 rounded-full shadow-sm overflow-hidden transition-all duration-200 group-hover:px-2">
        {options.map(({ label, icon }) => {
          const isActive = theme === label;

          return (
            <button
              key={label}
              onClick={() => setTheme(label)}
              aria-label={`Switch to ${label} theme`}
              className={cn(
                'w-10 h-10 flex items-center justify-center rounded-full text-gray-500 transition-colors duration-150 transition',
                isActive
                  ? 'bg-themebutton2 text-white'
                  : 'hidden group-hover:flex hover:bg-accent/60 hover:text-white'
              )}
            >
              {icon}
            </button>
          );
        })}
      </div>
    </div>
  );
}

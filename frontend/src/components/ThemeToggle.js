import React from 'react';
import { Button } from './ui/button';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const ThemeToggle = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={toggleTheme}
      className={`${
        isDark 
          ? 'border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white' 
          : 'border-gray-300 text-gray-700 hover:bg-gray-100'
      }`}
    >
      {isDark ? (
        <>
          <Sun className="h-4 w-4 mr-2" />
          Light
        </>
      ) : (
        <>
          <Moon className="h-4 w-4 mr-2" />
          Dark
        </>
      )}
    </Button>
  );
};

export default ThemeToggle;
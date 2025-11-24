import { createContext, useContext, useEffect } from 'react';
import useLocalStorage from '../../hooks/useLocalStorage';

const ThemeContext = createContext();

// Provider component that manages theme state for the entire app
export function ThemeProvider({ children }) {
  const [theme, setTheme] = useLocalStorage('theme', 'light');

  // Apply theme class to body element whenever it changes
  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  // Switch between light and dark themes
  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  const value = {
    theme,
    toggleTheme,
    isDark: theme === 'dark'
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

// Hook to access theme context in any component
export function useTheme() {
  const context = useContext(ThemeContext);
  
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  
  return context;
}

export default ThemeContext;


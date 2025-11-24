import { useTheme } from '../../context/ThemeContext';
import styles from './ThemeToggle.module.css';

// Button to toggle between light and dark themes
function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button 
      className={styles.themeToggle}
      onClick={toggleTheme}
      aria-label="Toggle theme"
      title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      {theme === 'light' ? 'Dark' : 'Light'}
    </button>
  );
}

export default ThemeToggle;

import styles from './AppHeader.module.css';

// Component for application header
function AppHeader() {
  return (
    <header className={styles.appHeader}>
      <h1 className={styles.title}>Users List</h1>
      <p className={styles.subtitle}>API & State Management Exercise</p>
    </header>
  );
}

export default AppHeader;

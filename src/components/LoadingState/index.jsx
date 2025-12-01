import styles from './LoadingState.module.css';

// Component to display loading state
function LoadingState() {
  return (
    <div className={styles.loading}>
      <p>Loading...</p>
    </div>
  );
}

export default LoadingState;

import styles from './ErrorState.module.css';

// Component to display error state
function ErrorState({ error, onRetry }) {
  return (
    <div className={styles.error}>
      <p>Error: {error}</p>
      <button onClick={onRetry} className={styles.retryBtn}>
        Try Again
      </button>
    </div>
  );
}

export default ErrorState;

import { memo } from 'react';
import styles from './TodoStats.module.css';

// Statistics panel showing task counts and progress
const TodoStats = memo(function TodoStats({ total, active, completed, onClearCompleted }) {
  if (total === 0) return null;

  // Calculate completion percentage
  const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <div className={styles.todoStats}>
      <div className={styles.statsGrid}>
        <div className={styles.statItem}>
          <span className={styles.statLabel}>Total</span>
          <span className={styles.statValue}>{total}</span>
        </div>
        <div className={styles.statItem}>
          <span className={styles.statLabel}>Active</span>
          <span className={`${styles.statValue} ${styles.active}`}>{active}</span>
        </div>
        <div className={styles.statItem}>
          <span className={styles.statLabel}>Completed</span>
          <span className={`${styles.statValue} ${styles.completed}`}>{completed}</span>
        </div>
        <div className={styles.statItem}>
          <span className={styles.statLabel}>Progress</span>
          <span className={styles.statValue}>{completionRate}%</span>
        </div>
      </div>

      <div className={styles.progressBar}>
        <div 
          className={styles.progressFill}
          style={{ width: `${completionRate}%` }}
        />
      </div>

      {completed > 0 && (
        <button
          onClick={onClearCompleted}
          className={styles.clearButton}
        >
          Clear Completed ({completed})
        </button>
      )}
    </div>
  );
});

export default TodoStats;

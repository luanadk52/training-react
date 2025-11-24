import { memo } from 'react';
import styles from './TodoFilter.module.css';

// Filter buttons to show all/active/completed tasks
const TodoFilter = memo(function TodoFilter({ currentFilter, onFilterChange, counts }) {
  const filters = [
    { value: 'all', label: 'All', count: counts.all },
    { value: 'active', label: 'Active', count: counts.active },
    { value: 'completed', label: 'Completed', count: counts.completed }
  ];

  return (
    <div className={styles.todoFilter}>
      {filters.map(filter => (
        <button
          key={filter.value}
          onClick={() => onFilterChange(filter.value)}
          className={`${styles.filterButton} ${currentFilter === filter.value ? styles.active : ''}`}
        >
          {filter.label}
          <span className={styles.count}>{filter.count}</span>
        </button>
      ))}
    </div>
  );
});

export default TodoFilter;

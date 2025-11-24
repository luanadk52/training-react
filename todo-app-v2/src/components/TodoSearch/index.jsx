import { memo } from 'react';
import styles from './TodoSearch.module.css';

// Search input for filtering tasks by text
const TodoSearch = memo(function TodoSearch({ searchQuery, onSearchChange }) {
  return (
    <div className={styles.todoSearch}>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Search tasks..."
        className={styles.searchInput}
      />
      {searchQuery && (
        <button
          onClick={() => onSearchChange('')}
          className={styles.clearButton}
          title="Clear search"
        >
          x
        </button>
      )}
    </div>
  );
});

export default TodoSearch;

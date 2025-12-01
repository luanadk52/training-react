import { memo } from 'react';
import styles from './SearchInput.module.css';

// Component for searching users
const SearchInput = memo(function SearchInput({ searchQuery, onSearchChange, resultCount }) {
  return (
    <div className={styles.searchSection}>
      <input
        type="text"
        placeholder="Search users by name..."
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        className={styles.searchInput}
      />
      {searchQuery && (
        <p className={styles.searchResult}>
          Found {resultCount} results for "{searchQuery}"
        </p>
      )}
    </div>
  );
});

export default SearchInput;

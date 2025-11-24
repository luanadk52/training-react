import { useMemo } from 'react';

// Generic hook for filtering arrays with automatic memoization
// Only recalculates when items or filterFn changes
function useFilter(items, filterFn) {
  const filteredItems = useMemo(() => {
    if (!filterFn || typeof filterFn !== 'function') {
      return items;
    }
    return items.filter(filterFn);
  }, [items, filterFn]);

  return filteredItems;
}

export default useFilter;


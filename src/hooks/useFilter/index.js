import { useMemo } from 'react';

// Custom hook to filter items based on search query
function useFilter(items, searchQuery) {
  const filteredItems = useMemo(() => {
    if (!searchQuery.trim()) {
      return items;
    }
    
    return items.filter(item =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [items, searchQuery]);

  return filteredItems;
}

export default useFilter;

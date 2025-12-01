import { useState, useEffect, useCallback } from 'react';
import useUsers from './hooks/useUsers';
import useFilter from './hooks/useFilter';
import AppHeader from './components/AppHeader';
import SearchInput from './components/SearchInput';
import LoadingState from './components/LoadingState';
import ErrorState from './components/ErrorState';
import UsersList from './components/UsersList';
import './App.css';

// Main application component that orchestrates all functionality
function App() {
  // Custom hook for user data management
  const { users, isLoading, error, fetchUsers } = useUsers();
  
  // Local state for UI interactions
  const [searchQuery, setSearchQuery] = useState('');
  const [showDetailsFor, setShowDetailsFor] = useState(null);

  // Custom hook for filtering users
  const filteredUsers = useFilter(users, searchQuery);

  // Fetch users when component mounts
  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  // Handle search input changes
  const handleSearchChange = useCallback((query) => {
    setSearchQuery(query);
  }, []);

  // Handle toggle user details
  const handleToggleDetails = useCallback((userId) => {
    setShowDetailsFor(prevId => prevId === userId ? null : userId);
  }, []);

  return (
    <div className="app">
      <AppHeader />
      
      <SearchInput 
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
        resultCount={filteredUsers.length}
      />

      {isLoading && <LoadingState />}
      
      {error && (
        <ErrorState 
          error={error} 
          onRetry={fetchUsers} 
        />
      )}

      {!isLoading && !error && (
        <UsersList
          users={filteredUsers}
          onToggleDetails={handleToggleDetails}
          showDetailsFor={showDetailsFor}
        />
      )}
    </div>
  );
}

export default App;

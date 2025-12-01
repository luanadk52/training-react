import { useState, useCallback } from 'react';
import { userAPI } from '../../services/api';

// Custom hook to manage all user-related operations
function useUsers() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Fetch users from API using axios
  const fetchUsers = useCallback(async () => {
    setIsLoading(true);
    setError('');
    
    try {
      // Add delay to see loading state
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const response = await userAPI.getAllUsers();
      setUsers(response.data);
    } catch (err) {
      // Handle axios error properly
      if (err.response) {
        // Server responded with error status
        setError(`Server Error: ${err.response.status} - ${err.response.statusText}`);
      } else if (err.request) {
        // Request was made but no response received
        setError('Network Error: Unable to connect to server');
      } else {
        // Something else happened
        setError(`Error: ${err.message}`);
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    users,
    isLoading,
    error,
    fetchUsers
  };
}

export default useUsers;

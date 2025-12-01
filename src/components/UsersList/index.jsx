import { memo } from 'react';
import UserCard from '../UserCard';
import styles from './UsersList.module.css';

// Component to display list of users
const UsersList = memo(function UsersList({ users, onToggleDetails, showDetailsFor }) {
  if (users.length === 0) {
    return (
      <div className={styles.noResults}>
        <p>No users found</p>
      </div>
    );
  }

  return (
    <div className={styles.usersList}>
      {users.map(user => (
        <UserCard
          key={user.id}
          user={user}
          onToggleDetails={onToggleDetails}
          showDetails={showDetailsFor === user.id}
        />
      ))}
    </div>
  );
});

export default UsersList;

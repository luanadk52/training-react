import { memo } from 'react';
import styles from './UserCard.module.css';

// Component to display individual user information
const UserCard = memo(function UserCard({ user, onToggleDetails, showDetails }) {
  return (
    <div className={styles.userCard}>
      <div className={styles.userBasic}>
        <h3 className={styles.userName}>{user.name}</h3>
        <p className={styles.userInfo}>Email: {user.email}</p>
        <p className={styles.userInfo}>Phone: {user.phone}</p>
        <p className={styles.userInfo}>Company: {user.company.name}</p>
        
        <button 
          onClick={() => onToggleDetails(user.id)}
          className={styles.detailsBtn}
        >
          {showDetails ? 'Hide Details' : 'Show Details'}
        </button>
      </div>

      {showDetails && (
        <div className={styles.userDetails}>
          <h4 className={styles.detailsTitle}>Address:</h4>
          <p className={styles.detailsInfo}>{user.address.street}, {user.address.city}</p>
          <p className={styles.detailsInfo}>Zipcode: {user.address.zipcode}</p>
          <p className={styles.detailsInfo}>
            Website: <a href={`http://${user.website}`} target="_blank" rel="noopener noreferrer" className={styles.websiteLink}>{user.website}</a>
          </p>
        </div>
      )}
    </div>
  );
});

export default UserCard;

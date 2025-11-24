import { useState, useRef, useEffect, memo } from 'react';
import styles from './TodoItem.module.css';

// Individual task item with inline editing support
// Memoized to prevent unnecessary re-renders
const TodoItem = memo(function TodoItem({ task, onToggle, onDelete, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.text);
  const editInputRef = useRef(null);

  // Auto-focus and select text when entering edit mode
  useEffect(() => {
    if (isEditing && editInputRef.current) {
      editInputRef.current.focus();
      editInputRef.current.select();
    }
  }, [isEditing]);

  const handleEdit = () => {
    setIsEditing(true);
    setEditText(task.text);
  };

  const handleSave = () => {
    if (editText.trim() && editText !== task.text) {
      onUpdate(task.id, editText);
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditText(task.text);
    setIsEditing(false);
  };

  // Handle keyboard shortcuts in edit mode
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  // Show edit input when in edit mode
  if (isEditing) {
    return (
      <div className={styles.todoItem}>
        <input
          ref={editInputRef}
          type="text"
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={handleSave}
          className={styles.editInput}
        />
      </div>
    );
  }

  return (
    <div className={`${styles.todoItem} ${task.completed ? styles.completed : ''}`}>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggle(task.id)}
        className={styles.checkbox}
      />
      
      <span 
        className={styles.text}
        onDoubleClick={handleEdit}
        title="Double click to edit"
      >
        {task.text}
      </span>

      <div className={styles.actions}>
        <button
          onClick={handleEdit}
          className={`${styles.button} ${styles.editButton}`}
          title="Edit task"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(task.id)}
          className={`${styles.button} ${styles.deleteButton}`}
          title="Delete task"
        >
          Delete
        </button>
      </div>
    </div>
  );
});

export default TodoItem;

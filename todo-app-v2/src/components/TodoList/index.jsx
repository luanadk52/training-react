import { memo } from 'react';
import TodoItem from '../TodoItem';
import styles from './TodoList.module.css';

// Container component that renders the list of tasks
// Memoized to avoid re-rendering when parent updates
const TodoList = memo(function TodoList({ tasks, onToggle, onDelete, onUpdate }) {
  // Show empty state when no tasks
  if (tasks.length === 0) {
    return (
      <div className={styles.emptyState}>
        <p>No tasks yet</p>
        <p className={styles.emptyHint}>Add a task to get started</p>
      </div>
    );
  }

  return (
    <div className={styles.todoList}>
      {tasks.map(task => (
        <TodoItem
          key={task.id}
          task={task}
          onToggle={onToggle}
          onDelete={onDelete}
          onUpdate={onUpdate}
        />
      ))}
    </div>
  );
});

export default TodoList;

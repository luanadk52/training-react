import { useState, useMemo, useCallback } from 'react';
import useTasks from '../../hooks/useTasks';
import useFilter from '../../hooks/useFilter';
import useLocalStorage from '../../hooks/useLocalStorage';
import TodoInput from '../TodoInput';
import TodoList from '../TodoList';
import TodoFilter from '../TodoFilter';
import TodoSearch from '../TodoSearch';
import TodoStats from '../TodoStats';
import ThemeToggle from '../ThemeToggle';
import styles from './TodoApp.module.css';

// Main application component that coordinates all todo functionality
function TodoApp() {
  // Get task operations from custom hook
  const { 
    tasks, 
    addTask, 
    deleteTask, 
    toggleTask, 
    updateTask,
    clearCompleted 
  } = useTasks();

  // Filter and search state
  const [filterType, setFilterType] = useLocalStorage('filter', 'all');
  const [searchQuery, setSearchQuery] = useState('');

  // Calculate task counts for stats display
  const counts = useMemo(() => {
    const active = tasks.filter(task => !task.completed).length;
    const completed = tasks.filter(task => task.completed).length;
    
    return {
      all: tasks.length,
      active,
      completed
    };
  }, [tasks]);

  // Create a filter function that combines status filter and search
  const getFilterFunction = useCallback(() => {
    return (task) => {
      // Check status filter (all/active/completed)
      let matchesFilter = true;
      if (filterType === 'active') {
        matchesFilter = !task.completed;
      } else if (filterType === 'completed') {
        matchesFilter = task.completed;
      }

      // Check search query
      let matchesSearch = true;
      if (searchQuery.trim()) {
        matchesSearch = task.text.toLowerCase().includes(searchQuery.toLowerCase());
      }

      return matchesFilter && matchesSearch;
    };
  }, [filterType, searchQuery]);

  // Apply filtering to tasks list
  const filteredTasks = useFilter(tasks, getFilterFunction());

  const handleAddTask = useCallback((text) => {
    addTask(text);
  }, [addTask]);

  const handleToggleTask = useCallback((taskId) => {
    toggleTask(taskId);
  }, [toggleTask]);

  const handleDeleteTask = useCallback((taskId) => {
    deleteTask(taskId);
  }, [deleteTask]);

  const handleUpdateTask = useCallback((taskId, newText) => {
    updateTask(taskId, newText);
  }, [updateTask]);

  const handleFilterChange = useCallback((newFilter) => {
    setFilterType(newFilter);
  }, [setFilterType]);

  const handleSearchChange = useCallback((query) => {
    setSearchQuery(query);
  }, []);

  const handleClearCompleted = useCallback(() => {
    if (window.confirm('Are you sure you want to delete all completed tasks?')) {
      clearCompleted();
    }
  }, [clearCompleted]);

  return (
    <div className={styles.container}>
      <ThemeToggle />
      
      <div className={styles.todoApp}>
        <header className={styles.header}>
          <h1 className={styles.title}>Todo App</h1>
          <p className={styles.subtitle}>Organize your tasks efficiently</p>
        </header>

        <TodoInput onAdd={handleAddTask} />

        <TodoStats
          total={counts.all}
          active={counts.active}
          completed={counts.completed}
          onClearCompleted={handleClearCompleted}
        />

        <TodoSearch
          searchQuery={searchQuery}
          onSearchChange={handleSearchChange}
        />

        <TodoFilter
          currentFilter={filterType}
          onFilterChange={handleFilterChange}
          counts={counts}
        />

        <TodoList
          tasks={filteredTasks}
          onToggle={handleToggleTask}
          onDelete={handleDeleteTask}
          onUpdate={handleUpdateTask}
        />

        {searchQuery && filteredTasks.length === 0 && (
          <div className={styles.noResults}>
            <p>No tasks found matching "{searchQuery}"</p>
            <button onClick={() => setSearchQuery('')} className={styles.clearSearchButton}>
              Clear Search
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default TodoApp;


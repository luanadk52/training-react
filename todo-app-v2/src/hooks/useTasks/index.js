import { useCallback } from 'react';
import useLocalStorage from '../useLocalStorage';

// Encapsulates all task CRUD operations and automatically persists to localStorage
function useTasks() {
  const [tasks, setTasks] = useLocalStorage('todos', []);

  // Add a new task to the list
  const addTask = useCallback((text) => {
    if (!text || text.trim() === '') return;
    
    const newTask = {
      id: Date.now(),
      text: text.trim(),
      completed: false,
      createdAt: new Date().toISOString()
    };
    
    setTasks(prevTasks => [...prevTasks, newTask]);
  }, [setTasks]);

  // Remove a task by id
  const deleteTask = useCallback((taskId) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
  }, [setTasks]);

  // Toggle the completed status of a task
  const toggleTask = useCallback((taskId) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  }, [setTasks]);

  // Update the text of an existing task
  const updateTask = useCallback((taskId, newText) => {
    if (!newText || newText.trim() === '') return;
    
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId
          ? { ...task, text: newText.trim() }
          : task
      )
    );
  }, [setTasks]);

  // Remove all completed tasks from the list
  const clearCompleted = useCallback(() => {
    setTasks(prevTasks => prevTasks.filter(task => !task.completed));
  }, [setTasks]);

  // Mark all tasks as completed or incomplete
  const toggleAll = useCallback((completed) => {
    setTasks(prevTasks =>
      prevTasks.map(task => ({ ...task, completed }))
    );
  }, [setTasks]);

  return {
    tasks,
    addTask,
    deleteTask,
    toggleTask,
    updateTask,
    clearCompleted,
    toggleAll
  };
}

export default useTasks;


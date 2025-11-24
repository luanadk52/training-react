import { useState, useRef, useEffect } from 'react';
import styles from './TodoInput.module.css';

// Input component for adding new tasks with auto-focus
function TodoInput({ onAdd }) {
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef(null);

  // Focus input on mount for better UX
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (inputValue.trim()) {
      onAdd(inputValue);
      setInputValue('');
      
      // Keep focus in input after adding
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }
  };

  return (
    <form className={styles.todoInput} onSubmit={handleSubmit}>
      <input
        ref={inputRef}
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="What needs to be done?"
        className={styles.input}
      />
      <button 
        type="submit" 
        className={styles.addButton}
        disabled={!inputValue.trim()}
      >
        Add Task
      </button>
    </form>
  );
}

export default TodoInput;

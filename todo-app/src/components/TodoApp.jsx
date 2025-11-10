import { useState, useEffect } from 'react';
import styles from './TodoApp.module.css';

function TodoApp() {
  // My todo list
  const [todoList, setTodoList] = useState([]);
  // What user types in input
  const [newTodo, setNewTodo] = useState('');
  // Which todo is being edited
  const [editingTodo, setEditingTodo] = useState(null);
  // Text when editing
  const [editText, setEditText] = useState('');
  // Track if we loaded from localStorage yet
  const [hasLoaded, setHasLoaded] = useState(false);

  // Get todos from browser storage when page loads
  useEffect(() => {
    const saved = localStorage.getItem('myTodos');
    if (saved) {
      try {
        const parsedTodos = JSON.parse(saved);
        setTodoList(parsedTodos);
      } catch (error) {
        console.log('Error loading todos:', error);
      }
    }
    setHasLoaded(true); // Mark that we've tried to load
  }, []);

  // Save todos to browser storage when list changes
  // Only save after we've loaded initially
  useEffect(() => {
    if (hasLoaded) {
      localStorage.setItem('myTodos', JSON.stringify(todoList));
    }
  }, [todoList, hasLoaded]);

  // Function to add new todo
  function addNewTodo() {
    if (newTodo !== '') {
      const todo = {
        id: Date.now(), // simple ID using timestamp
        text: newTodo,
        done: false
      };
      setTodoList([...todoList, todo]);
      setNewTodo(''); // clear input
    }
  }

  // Function to delete todo
  function deleteTodo(todoId) {
    const newList = todoList.filter(todo => todo.id !== todoId);
    setTodoList(newList);
  }

  // Function to mark todo as done/undone
  function toggleDone(todoId) {
    const newList = todoList.map(todo => {
      if (todo.id === todoId) {
        return { ...todo, done: !todo.done };
      }
      return todo;
    });
    setTodoList(newList);
  }

  // Start editing todo
  function startEdit(todoId, todoText) {
    setEditingTodo(todoId);
    setEditText(todoText);
  }

  // Save edited todo
  function saveEdit(todoId) {
    if (editText !== '') {
      const newList = todoList.map(todo => {
        if (todo.id === todoId) {
          return { ...todo, text: editText };
        }
        return todo;
      });
      setTodoList(newList);
    }
    setEditingTodo(null);
    setEditText('');
  }

  // Cancel editing
  function cancelEdit() {
    setEditingTodo(null);
    setEditText('');
  }

  // Handle Enter key
  function handleEnter(e, action, id) {
    if (e.key === 'Enter') {
      if (action === 'add') {
        addNewTodo();
      } else if (action === 'save') {
        saveEdit(id);
      }
    }
  }

  // Count todos
  const totalTodos = todoList.length;
  const doneTodos = todoList.filter(todo => todo.done === true).length;
  const notDoneTodos = totalTodos - doneTodos;

  return (
    <div className={styles.todoApp}>
      <h1>My Todo List</h1>
      <p>Simple todo app made with React</p>

      {/* Input to add new todo */}
      <div className={styles.addSection}>
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          onKeyPress={(e) => handleEnter(e, 'add')}
          placeholder="Enter a new todo..."
        />
        <button onClick={addNewTodo}>Add Todo</button>
      </div>

      {/* Show stats if we have todos */}
      {totalTodos > 0 && (
        <div className={styles.stats}>
          <p>Total: {totalTodos}</p>
          <p>Not Done: {notDoneTodos}</p>
          <p>Done: {doneTodos}</p>
        </div>
      )}

      {/* List of todos */}
      <div className={styles.todoList}>
        {todoList.length === 0 ? (
          <p>No todos yet. Add your first todo!</p>
        ) : (
          todoList.map((todo) => (
            <div key={todo.id} className={styles.todoItem}>
              <input
                type="checkbox"
                checked={todo.done}
                onChange={() => toggleDone(todo.id)}
              />
              
              {editingTodo === todo.id ? (
                <div>
                  <input
                    type="text"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    onKeyPress={(e) => handleEnter(e, 'save', todo.id)}
                  />
                  <button onClick={() => saveEdit(todo.id)}>Save</button>
                  <button onClick={cancelEdit}>Cancel</button>
                </div>
              ) : (
                <div>
                  <span 
                    className={todo.done ? styles.done : ''}
                    onDoubleClick={() => startEdit(todo.id, todo.text)}
                  >
                    {todo.text}
                  </span>
                  <button onClick={() => startEdit(todo.id, todo.text)}>Edit</button>
                  <button onClick={() => deleteTodo(todo.id)}>Delete</button>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default TodoApp;

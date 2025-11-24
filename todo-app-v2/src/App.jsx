import { ThemeProvider } from './context/ThemeContext';
import TodoApp from './components/TodoApp';
import './App.css';

function App() {
  return (
    <ThemeProvider>
      <TodoApp />
    </ThemeProvider>
  );
}

export default App;

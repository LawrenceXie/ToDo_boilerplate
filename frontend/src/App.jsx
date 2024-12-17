import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ToDoList from './pages/TodoList';

function App() {
  return (
    <Routes>
      <Route path="/" element={<ToDoList />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  );
}

export default App;
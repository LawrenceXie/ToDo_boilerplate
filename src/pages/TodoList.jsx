import { useState, useEffect, useContext } from 'react';
import { fetchTodos, createTodo, updateTodo, deleteTodo } from '../services/api';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function ToDoList() {
  const [todos, setTodos] = useState([]);
  const [newTitle, setNewTitle] = useState('');
  const [error, setError] = useState('');
  
  // State for editing
  const [editingId, setEditingId] = useState(null);
  const [editingTitle, setEditingTitle] = useState('');
  
  const { authData, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!authData || !authData.tokens) {
      navigate('/login');
      return;
    }

    const loadTodos = async () => {
      try {
        const response = await fetchTodos(authData.tokens.access);
        setTodos(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    loadTodos();
  }, [authData, navigate]);

  const handleAddTodo = async (e) => {
    e.preventDefault();
    if (!newTitle.trim()) {
      setError('To-Do item cannot be empty.');
      return;
    }

    try {
      await createTodo(authData.tokens.access, { title: newTitle });
      setNewTitle('');
      setError('');

      const response = await fetchTodos(authData.tokens.access);
      setTodos(response.data);
    } catch (err) {
      setError('Error adding todo. Please try again.');
    }
  };

  const handleEditClick = (id, currentTitle) => {
    setEditingId(id);
    setEditingTitle(currentTitle);
  };

  const handleSaveEdit = async (id) => {
    if (!editingTitle.trim()) {
      setError('To-Do item cannot be empty.');
      return;
    }

    try {
      await updateTodo(authData.tokens.access, id, { title: editingTitle });
      // Refresh todos
      const response = await fetchTodos(authData.tokens.access);
      setTodos(response.data);
      // Reset editing state
      setEditingId(null);
      setEditingTitle('');
      setError('');
    } catch (err) {
      setError('Error updating todo. Please try again.');
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTodo(authData.tokens.access, id);
      // Refresh todos
      const response = await fetchTodos(authData.tokens.access);
      setTodos(response.data);
    } catch (err) {
      setError('Error deleting todo. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-semibold">My To-Do List</h1>
          <button onClick={logout} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
            Logout
          </button>
        </div>

        <form onSubmit={handleAddTodo} className="flex mb-4">
          <input
            type="text"
            className="flex-1 border border-gray-300 rounded-l p-2"
            placeholder="Add a new to-do..."
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
          />
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-r hover:bg-blue-700">
            Add
          </button>
        </form>
        {error && <div className="mb-4 text-red-600">{error}</div>}

        <ul className="space-y-2">
          {todos.map((todo) => (
            <li
              key={todo.id}
              className={`flex justify-between items-center bg-white p-4 rounded shadow ${todo.completed ? 'opacity-75' : ''}`}
            >
              {editingId === todo.id ? (
                <input
                  type="text"
                  className="border p-1 flex-1 mr-2"
                  value={editingTitle}
                  onChange={(e) => setEditingTitle(e.target.value)}
                />
              ) : (
                <span className={todo.completed ? 'line-through flex-1' : 'flex-1'}>{todo.title}</span>
              )}

              <div className="flex space-x-2">
                {editingId === todo.id ? (
                  <>
                    <button
                      onClick={() => handleSaveEdit(todo.id)}
                      className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => {
                        setEditingId(null);
                        setEditingTitle('');
                        setError('');
                      }}
                      className="bg-gray-300 text-black px-2 py-1 rounded hover:bg-gray-400"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => handleEditClick(todo.id, todo.title)}
                    className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                )}

                <button
                  onClick={() => handleDelete(todo.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ToDoList;

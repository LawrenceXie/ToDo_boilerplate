import { useState, useContext } from 'react';
import { login } from '../services/api';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { setAuthData } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login(username, password); 
      // response.data typically has { access: '...', refresh: '...' }
      console.log(response)
      // Store tokens AND username
      const authInfo = {
        tokens: response.data,
        username: username
      };
      setAuthData(authInfo);
      
      
      navigate('/');
    } catch (error) {
      setError('Invalid credentials. Please try again.');
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="w-full max-w-sm bg-white p-8 rounded shadow-md">
        <h2 className="text-2xl font-semibold mb-6 text-center">Login</h2>
        {error && <div className="mb-4 text-red-600">{error}</div>}
        <div className="mb-4">
          <label className="block mb-1 font-semibold" htmlFor="username">Username</label>
          <input
            id="username"
            className="w-full border border-gray-300 rounded p-2"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="mb-6">
          <label className="block mb-1 font-semibold" htmlFor="password">Password</label>
          <input
            id="password"
            className="w-full border border-gray-300 rounded p-2"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button 
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Login
        </button>
        <p className="mt-4 text-center text-sm">
          Don't have an account? <a className="text-blue-600 hover:underline" href="/signup">Sign up here</a>.
        </p>
      </form>
    </div>
  );
}

export default Login;

import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL;

const API = axios.create({
  baseURL: apiUrl
});

export const signup = (username, password) => API.post('users/', { username, password });
export const login = (username, password) => API.post('token/', { username, password });
export const fetchTodos = (token) =>
  API.get('todos/', { headers: { Authorization: `Bearer ${token}` } });
export const createTodo = (token, data) =>
  API.post('todos/', data, { headers: { Authorization: `Bearer ${token}` } });

export const updateTodo = (token, id, data) =>
  API.put(`todos/${id}/`, data, { headers: { Authorization: `Bearer ${token}` } });

export const deleteTodo = (token, id) =>
  API.delete(`todos/${id}/`, { headers: { Authorization: `Bearer ${token}` } });

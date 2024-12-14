import { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const existingData = JSON.parse(localStorage.getItem('authData'));
  const [authData, setAuthData] = useState(existingData);

  const saveAuthData = (data) => {
    setAuthData(data);
    localStorage.setItem('authData', JSON.stringify(data));
  };

  const logout = () => {
    setAuthData(null);
    localStorage.removeItem('authData');
  };

  return (
    <AuthContext.Provider value={{ authData, setAuthData: saveAuthData, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

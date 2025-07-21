import { createContext } from 'react';

const AuthContext = createContext({
  isLoggedIn: false,
  handleLogin: () => {},
  handleLogout: () => {}
});

export default AuthContext;
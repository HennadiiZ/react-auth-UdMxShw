import React, { useState } from 'react';

const AuthContext = React.createContext({
  token: '',
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {}
});

export const AuthContextProviders = (props) => {
  const [token, setToken] = useState(null);

  const userIsLoggedIn = !!token;

  const loginHandler = (token) => {
    setToken(token);
  };

  const logoutHandler = () => {
    setToken(null);
  };

  const contextValue = {
    token, 
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler, 
  }
  
  return (
    <AuthContext.Provider value={contextValue}>
      { props.children }
    </AuthContext.Provider>);
};

export default AuthContext;
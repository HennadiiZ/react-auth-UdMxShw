import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const AuthContext = React.createContext({
  token: '',
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {}
});

const calculateRemainingTime = (expirationTime) => {
  const currentTime = new Date().getTime();
  const adjExpirationTime = new Date(expirationTime).getTime();

  const remainingDuration = adjExpirationTime - currentTime;

  return remainingDuration;
};

export const AuthContextProviders = (props) => {
  const initialToken = localStorage.getItem('token');
  const [token, setToken] = useState(initialToken);

  const userIsLoggedIn = !!token;
//   let remainingTimeTimer;

  const logoutHandler = () => {
    setToken(null);
    localStorage.removeItem('token');
    // clearTimeout(remainingTimeTimer);
  };

  const loginHandler = (token, expirationTime) => {
    setToken(token);
    localStorage.setItem('token', token);
    const remainingTime = calculateRemainingTime(expirationTime);

    setTimeout(logoutHandler, remainingTime);
    // remainingTimeTimer = setTimeout(logoutHandler, remainingTime);
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
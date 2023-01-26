import React, { useState, useEffect, useCallback } from 'react';

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

const retrieveStoreToken = () => {
  const storedToken = localStorage.getItem('token');
  const storedExpirationDate = localStorage.getItem('expirationTime');

  const remainingTime = calculateRemainingTime(+storedExpirationDate);

  if (remainingTime <= 60000) {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationTime');
    return null;
  }

  // return storedToken;

  return {
    token: storedToken,
    duration: remainingTime
  }
};

export const AuthContextProviders = (props) => {
  const tokenData = retrieveStoreToken();
  let initialToken;
  if (tokenData) {
    initialToken = tokenData.token;
  }
  
  // const initialToken = localStorage.getItem('token');
  const [token, setToken] = useState(initialToken);

  const userIsLoggedIn = !!token;
  let logoutTimer;

  const logoutHandler = useCallback(() => {
    setToken(null);
    localStorage.removeItem('token');

    if (logoutTimer) {
      clearTimeout(logoutTimer);
    }
  }, [logoutTimer]);

//   const logoutHandler = () => {
//     setToken(null);
//     localStorage.removeItem('token');
//     localStorage.removeItem('expirationTime');

//     if (logoutTimer) {
//       clearTimeout(logoutTimer);
//     }
//   };

  const loginHandler = (token, expirationTime) => {
    setToken(token);
    localStorage.setItem('token', token);
    localStorage.setItem('expirationTime', +expirationTime);

    const remainingTime = calculateRemainingTime(expirationTime);

    logoutTimer = setTimeout(logoutHandler, remainingTime);
  };

  useEffect(() => {
    if (tokenData) {
      console.log(tokenData.duration);
      setTimeout(logoutHandler, tokenData.duration);
    }
  }, [tokenData, logoutHandler]);

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
import { useState, useRef } from 'react';

import classes from './AuthForm.module.css';

const AuthForm = () => {
  const SIGN_UP = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=';
  const SIGN_IN = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=';
  const API_KEY = 'AIzaSyDdCTqoWnSZH4er7TEcuHrrKO4aKo9PMTI';

  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    console.log(enteredEmail, enteredPassword);

    setIsLoading(true);
    let url;
    if (isLogin) {
      url = SIGN_IN;
    } else { 
      url = SIGN_UP;
    }
      fetch(`${url}${API_KEY}`, 
        {
          method: 'POST',
          body: JSON.stringify({
            email: enteredEmail ,
            password: enteredPassword,	
            returnSecureToken: true,
          }),
          headers: {
            'Content-Type': 'application/json'
          }
        }
      ).then(async res => {
        setIsLoading(false);
        if (res.ok) {
          return res.json();
        } else {
          // const data = await res.json();
          // console.log(data.error.message); // show error;
          let errorMessage = 'Authentication failed!';
          // if (data && data.error && data.error.message) {
          //   errorMessage = data.error.message;
          // }
          throw new Error(errorMessage);
        }
      })
      .then(data => {
        console.log(data);
      })
      .catch(err => {
        alert(err.message);
      });
  };

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' required ref={emailInputRef}/>
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input type='password' id='password' required ref={passwordInputRef}/>
        </div>
        <div className={classes.actions}>
         { !isLoading && <button>{isLogin ? 'Login' : 'Create Account'}</button>}
         { isLoading && <p>Sending request...</p>}
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;


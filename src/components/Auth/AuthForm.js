// import { useState, useRef } from 'react';

// import classes from './AuthForm.module.css';

// const AuthForm = () => {
//   const SIGN_UP = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=';
//   const API_KEY = 'AIzaSyDdCTqoWnSZH4er7TEcuHrrKO4aKo9PMTI';

//   const emailInputRef = useRef();
//   const passwordInputRef = useRef();

//   const [isLogin, setIsLogin] = useState(true);

//   const switchAuthModeHandler = () => {
//     setIsLogin((prevState) => !prevState);
//   };

//   const submitHandler = (e) => {
//     e.preventDefault();

//     const enteredEmail = emailInputRef.current.value;
//     const enteredPassword = passwordInputRef.current.value;

//     console.log(enteredEmail, enteredPassword);

//     if (isLogin) {
//       return;
//     } else { 
//       fetch(`${SIGN_UP}${API_KEY}`, 
//         {
//           method: 'POST',
//           body: JSON.stringify({
//             email: enteredEmail ,
//             password: enteredPassword,	
//             returnSecureToken: true,
//           }),
//           headers: {
//             'Content-Type': 'application/json'
//           }
//         }
//       ).then(res => {
//         if (res.ok) {

//         } else {
//           return res.json().then(data => {
//             console.log(data); // show error;
//           });
//         }
//       });
//     }
//   };

//   return (
//     <section className={classes.auth}>
//       <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
//       <form onSubmit={submitHandler}>
//         <div className={classes.control}>
//           <label htmlFor='email'>Your Email</label>
//           <input type='email' id='email' required ref={emailInputRef}/>
//         </div>
//         <div className={classes.control}>
//           <label htmlFor='password'>Your Password</label>
//           <input type='password' id='password' required ref={passwordInputRef}/>
//         </div>
//         <div className={classes.actions}>
//           <button>{isLogin ? 'Login' : 'Create Account'}</button>
//           <button
//             type='button'
//             className={classes.toggle}
//             onClick={switchAuthModeHandler}
//           >
//             {isLogin ? 'Create new account' : 'Login with existing account'}
//           </button>
//         </div>
//       </form>
//     </section>
//   );
// };

// export default AuthForm;


import { useState } from 'react';

import classes from './AuthForm.module.css';

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form>
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' required />
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input type='password' id='password' required />
        </div>
        <div className={classes.actions}>
          <button>{isLogin ? 'Login' : 'Create Account'}</button>
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

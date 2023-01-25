import classes from './ProfileForm.module.css';
import { useRef, useContext } from 'react';

import AuthContext from '../../store/auth-context';

const API_KEY = 'AIzaSyDdCTqoWnSZH4er7TEcuHrrKO4aKo9PMTI';
const CHANGE_PASS = 'https://identitytoolkit.googleapis.com/v1/accounts:update?key=';

const ProfileForm = () => {

  const newPasswordInputRef = useRef();
  const authCtx = useContext(AuthContext);

  const submitHandler = (e) => {
    e.preventDefault();

    const enteredNewPassword = newPasswordInputRef.current.value;
    console.log(enteredNewPassword);

    // add validation 

    fetch(`${CHANGE_PASS}${API_KEY}`,{
      method: 'POST',
      body: JSON.stringify({  // Request Body Payload
        idToken:  authCtx.token,
        password: enteredNewPassword,	
        returnSecureToken: false,
      }),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer abc',
      }
    }).then(res => {

    })
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input type='password' id='new-password' minLength="7" ref={newPasswordInputRef}/>
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;

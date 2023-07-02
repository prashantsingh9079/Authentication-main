import { useState, useRef } from 'react';

import classes from './AuthForm.module.css';

const AuthForm = () => {

  const emailRef = useRef();
  const passwordRef = useRef();

  const [isLogin, setIsLogin] = useState(true);
  const [req, setReq] = useState(false)
  const [e,setE] = useState(null);
  var msg=''

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = async (event) => {
    setE(null)
    event.preventDefault();
    const enteredEmail = emailRef.current.value;
    const enteredPassword = passwordRef.current.value;
    

    if (isLogin) {

    }
    else {
      setReq(true);
      try {
        const response = await fetch("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyD-LkVptadQXkNSeaonyQu95YCgw4tnlEk",
          {
            method: 'POST',
            body: JSON.stringify(
              {
                email: enteredEmail,
                password: enteredPassword,
                returnSecureToken: true
              }
            ),
            headers: {
              'Content-Type': 'application/json'
            }
          }
        );
          if(response.status ===false)
          {
            throw Error("something went wrong...")
          }
          else
          {
             const detailByServer  = await response.json()
             console.log(detailByServer)
          }
        
      }
      catch(error)
      {
        setE(true)
        console.log(error.message)
        msg = error.message;
      }
      setReq(false)
  }
  }


  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' required ref={emailRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input
            type='password'
            id='password'
            ref={passwordRef}
            required
          />
          {req?'sending request...':''}
          {e ? {msg}:''}
        </div>
        <div className={classes.actions}>
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
          <button type='submit'>Save</button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;

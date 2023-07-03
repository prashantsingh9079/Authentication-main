import { useContext, useRef } from 'react';
import classes from './ProfileForm.module.css';
import AuthContext from '../../store/auth-context';

const ProfileForm = () => {
  const authCtx = useContext(AuthContext)
  const passwordRef = useRef();

  function submitHandler(e)
  {
    e.preventDefault();
    
    fetch("https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyD-LkVptadQXkNSeaonyQu95YCgw4tnlEk",
    {
      method:'POST',
      body:JSON.stringify(
        {
          idToken:authCtx.token,
          password:passwordRef.current.value,
          returnSecureToken:true
        }
      ),
      headers:{
        'Content-Type':'application/json'
      }
    }
    ).then((res) =>{
      console.log(res)
    })
  }

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input type='password' id='new-password' minLength='7' ref={passwordRef} />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;

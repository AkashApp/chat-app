import React, { useState } from 'react';
import './Login.css';
import assets from '../../assets/assets';
import { signup, login, restPass } from '../../config/firebase';

const Login = () => {

  const [currState, setCurrState] = useState("Sign Up");
  const [UserName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = (event) =>{
    event.preventDefault();
    if(currState === "Sign Up"){
      signup(UserName, email, password);
    }
    else{
      login(email, password);
    }
  }

  return (
    <div className='login'>
      <img src={assets.logo_big} alt="" className="logo" />
      <form onSubmit={onSubmitHandler} className="login-form">
        <h2>{currState}</h2>
        {currState === "Sign Up" ? <input onChange={(e) => setUserName(e.target.value)} value={UserName} type="text" className="form-input" placeholder='Username' required /> : null}
        <input onChange={(e) => setEmail(e.target.value)} value={email} type="email" className="form-input" placeholder='Email Address' required />
        <input onChange={(e) => setPassword(e.target.value)} value={password} type="password" className="form-input" placeholder='Password' required />
        <button type='submit'>{currState === "Sign Up" ? "Create Account" : "Login now"}</button>
        <div className="login-term">
          <input type="checkbox" />
          <p>I agree to the terms and conditions</p>
        </div>
        <div className="login-forgot">
          {
            currState === "Sign Up"
              ?
              <p className="login-toggle">Already have an account? <span onClick={() => setCurrState("Login")}> Login here</span></p>
              :
              <p className="login-toggle">Create an account? <span onClick={() => setCurrState("Sign Up")}> Click here</span></p>
          }
          {currState === "Login" ? 
          <p className="login-toggle">Forgot password ? <span onClick={() => restPass(email)}> reset here</span></p>:
        null}
        </div>
      </form>
    </div>
  )
}

export default Login
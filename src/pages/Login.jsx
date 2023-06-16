import React from "react";
import styles from "../styles/Login.module.css"
import { useState } from "react";
const Login = () => {
  const [authData,setAuthData]=useState({email:'',password:''})
  const handleChange=(e)=>{
    const {name,value}=e.target
    console.log(name,value)
    setAuthData({...authData,[name]:value})
  }
  const handleSubmit=(e)=>{
    e.preventDefault();
    console.log(authData)
  }
  return (
    <div className={styles.loginDiv} >
      <h3>Login</h3>
      <form onSubmit={handleSubmit} >
        <label htmlFor="email">
          Email
          <input
            type="email"
            id="email"
            placeholder="Enter email"
            name="email"
            onChange={handleChange}
          />
        </label>
        <br/>
        <label htmlFor="password">
          Password
          <input
            type="password"
            id="password"
            placeholder="Enter password"
            name="password"
            onChange={handleChange}
          />
        </label>
        <button type="submit" >Login</button>
      </form>
    </div>
  );
};

export default Login;

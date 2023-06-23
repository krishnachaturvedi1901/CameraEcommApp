import React from "react";
import styles from "../styles/Login.module.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/Authcontext";
import { sendLoginRequest } from "../redux/LoginSignupState/actions";
import { useDispatch, useSelector } from "react-redux";
const Login = () => {
  const dispatch=useDispatch()
  const {loading,payload,error}=useSelector((state)=>state.LoginState)
  const {isAuth,toggleAuth}=useContext(AuthContext)
  const [authData, setAuthData] = useState({ email: "", password: "" });

  console.log("login payload-",loading,payload,error)

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setAuthData({ ...authData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("login data after submit click in login",authData);
    dispatch(sendLoginRequest(authData))

  };
  return (
    <div className={styles.loginSignupDiv}>
      <div className={styles.loginDiv}>
        <h1>Customer Login</h1>
        <h4>REGISTERED CUSTOMERS</h4>
        <hr />
        <p>
          If you have an account, sign in with your email address. In case of
          any signing issue, please use Forgot Password link.
        </p>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">
            Email:
          </label>
          <br />
            <input
              type="email"
              id="email"
              placeholder="Enter email"
              name="email"
              required
              onChange={handleChange}
            />
          <label htmlFor="password">
            Password:
          </label>
          <br/>
            <input
              type="password"
              id="password"
              placeholder="Enter password"
              name="password"
              required
              onChange={handleChange}
            />
          <button id={styles.loginBtn} type="submit">Login</button>
          <button id={styles.forgetPasswordBtn} >Forget password ?</button>
        </form>
      </div>
      <div className={styles.signupDiv}>
        <h4>NEW CUSTOMERS</h4>
        <hr/>
        <p>
          Creating an account has many benefits: check out faster, keep more
          than one address, track orders and more.
        </p>
        <Link to={'/signup'} ><button className={styles.moveToSignupBtn} >Create an account</button></Link>
      </div>
    </div>
  );
};

export default Login;

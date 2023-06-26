import React, { useEffect } from "react";
import styles from "../styles/Login.module.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AiOutlineEyeInvisible } from "react-icons/ai";
import { AiOutlineEye } from "react-icons/ai";
import { AuthContext } from "../context/Authcontext";
import {
  sendLoginRequest,
  sendLogoutRequest,
} from "../redux/LoginSignupState/actions";
import { useDispatch, useSelector } from "react-redux";
const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [logoutExecuted,setLogoutExecuted]=useState(false)
  const { loading, isLogin, payload, error } = useSelector(
    (state) => state.LoginState
  );
  const { isAuth, toggleAuth } = useContext(AuthContext);
  const [authData, setAuthData] = useState({ email: "", password: "" });

  console.log("login state res-", loading, isLogin, payload, error);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAuthData({ ...authData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(sendLoginRequest(authData));
  };

  const handleLogout = () => {
    dispatch(sendLogoutRequest(payload.id));
    setLogoutExecuted(true)
  };

  useEffect(() => {
    if (payload && isLogin ) {
      localStorage.setItem("isLoggedIn",true)
      localStorage.setItem("loginUser",JSON.stringify(payload))
    }
    else if(!isLogin && logoutExecuted){
      localStorage.removeItem("isLoggedIn")
      localStorage.removeItem("loginUser")
      setLogoutExecuted(false)
    }
  }, [payload,logoutExecuted]);

  return (
    <div className={styles.loginSignupDiv}>
      <div className={styles.loginDiv}>
        <h1>Customer Login</h1>
        <h4>REGISTERED CUSTOMERS</h4>
        <hr />
        {
          isLogin? <p>Hlw, {payload.firstname} login successfull want to logout.</p>:
        <p>
          If you have an account, sign in with your email address. In case of
          any signing issue, please use Forgot Password link.
        </p>
}
        {isLogin ? (
          <button id={styles.logoutBtn} onClick={() => handleLogout()}>
            Logout
          </button>
        ) : (
          <form onSubmit={handleSubmit}>
            {error ? (
              <p id={styles.errorWarningPTag}>
                User with give email or password not found! Try using right
                email and password.
              </p>
            ) : null}
            {loading ? <h4>Loading ...</h4> : null}
            <label htmlFor="email">Email:</label>
            <br />
            <input
              type="email"
              id="email"
              placeholder="Enter email"
              name="email"
              required
              onChange={handleChange}
            />
            <div className={styles.loginPasswordDiv}>
              <label htmlFor="password">Password:</label>
              <br />
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="Enter password"
                name="password"
                required
                onChange={handleChange}
              />
              <div
                className={styles.showPassEyeDiv}
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
              </div>
            </div>
            {!isLogin ? (
              <button id={styles.loginBtn} type="submit">
                Login
              </button>
            ) : null}
            <button id={styles.forgetPasswordBtn}>Forget password ?</button>
          </form>
        )}
      </div>

      <div className={styles.signupDiv}>
        <h4>NEW CUSTOMERS</h4>
        <hr />
        <p>
          Creating an account has many benefits: check out faster, keep more
          than one address, track orders and more.
        </p>
        <Link to={"/signup"}>
          <button disabled={isLogin} className={styles.moveToSignupBtn} style={isLogin?{opacity:"0.5"}:null} >Create an account</button>
        </Link>
      </div>
    </div>
  );
};

export default Login;

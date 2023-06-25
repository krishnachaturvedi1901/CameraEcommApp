import React, { useEffect, useState } from "react";
import styles from "../styles/Signup.module.css";
import { AiOutlineEyeInvisible } from "react-icons/ai";
import { AiOutlineEye } from "react-icons/ai";
import { RiInformationLine } from "react-icons/ri";
import cameraManImg from "../static/signupImg.jpg";
import { useDispatch } from "react-redux";
import { sendSignupRequest } from "../redux/LoginSignupState/actions";
const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);
  const [passwordMatchError, setPasswordMatchError] = useState(false);
  const [showPassInfoDiv, setShowPassInfoDiv] = useState(false);
  const dispatch = useDispatch();

  const [signupData, setSignupData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    mobile: 0,
    password: "",
    repassword: "",
    login: false,
  });

  const handleSigupFormChange = (e) => {
    const { name, value } = e.target;
    name === "mobile"
      ? setSignupData({ ...signupData, [name]: +value })
      : setSignupData({ ...signupData, [name]: value });
  };

  useEffect(() => {
    if (signupData.password === signupData.repassword) {
      setPasswordMatchError(false);
    } else setPasswordMatchError(true);
  }, [signupData]);

  const handleSignupFormSubmit = (e) => {
    e.preventDefault();
    if (signupData.password !== signupData.repassword) {
      setPasswordMatchError(true);
    } else {
      dispatch(sendSignupRequest(signupData));
    }
  };

  console.log("signupdata", signupData);
  return (
    <div className={styles.signupAmdImgTopDiv}>
      <div className={styles.signupMainDiv}>
        <h2>CREATE NEW CUSTOMER ACCOUNT</h2>
        <h4>Personal & Login Information</h4>
        <div className={styles.hrLineDiv}>
          <hr className={styles.hrLine} />
        </div>
        <form
          id={styles.signupForm}
          onSubmit={(e) => handleSignupFormSubmit(e)}
        >
          <p id={styles.passwordErrorPTag}>
            {passwordMatchError ? "Password not match" : null}
          </p>
          <label>First name:</label>
          <br />
          <input
            type="text"
            id="firstname"
            name="firstname"
            placeholder="Enter first name..."
            required
            onChange={(e) => handleSigupFormChange(e)}
          />

          <label>Second name:</label>
          <br />
          <input
            type="text"
            id="lastname"
            name="lastname"
            placeholder="Enter last name..."
            required
            onChange={(e) => handleSigupFormChange(e)}
          />

          <label>Email:</label>
          <br />
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter email..."
            required
            onChange={(e) => handleSigupFormChange(e)}
          />

          <label>Mobile no.</label>
          <br />
          <input
            type="tel"
            id="mobile"
            name="mobile"
            placeholder="Enter mobile no..."
            required
            pattern="[0-9]{10}"
            onChange={(e) => handleSigupFormChange(e)}
          />

          <label>Password:</label>
          <br />
          <div className={styles.passwordInputDiv}>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              placeholder="Enter password..."
              required
              min={8}
              max={12}
              pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,12}$"
              onChange={(e) => handleSigupFormChange(e)}
            />
            <div
              className={styles.showPassEyeDiv}
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
            </div>
            <div
              className={styles.infoIconDiv}
              onMouseEnter={() => setShowPassInfoDiv(true)}
              onMouseLeave={()=>setShowPassInfoDiv(false)}
            >
              <RiInformationLine />
            </div>
            {showPassInfoDiv ? (
              <div className={styles.passInfoDiv}>
                <p>
                  Password should-
                  <br />
                  1-Numeric:[0-9],
                  <br />
                  2-Letters:[a-z],
                  <br />
                  3-Capital letters:[A-Z]
                  <br />
                  4-Special characters:[@$!%*?&]
                  <br />
                </p>
              </div>
            ) : null}
          </div>
          <label>Re-password:</label>
          <br />
          <div className={styles.passwordInputDiv}>
            <input
              type={showRePassword ? "text" : "password"}
              id="repassword"
              name="repassword"
              placeholder="Re-enter password..."
              required
              min={8}
              max={12}
              pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,12}$"
              onChange={(e) => handleSigupFormChange(e)}
            />
            <div
              className={styles.showPassEyeDiv}
              onClick={() => setShowRePassword(!showRePassword)}
            >
              {showRePassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
            </div>
          </div>

          <button id={styles.signupBtn} type="submit">
            Submit
          </button>
        </form>
      </div>
      <div className={styles.ImgDiv}>
        <img src={cameraManImg} />
      </div>
    </div>
  );
};

export default Signup;

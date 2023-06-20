import React, { useState } from "react";
import styles from "../styles/Signup.module.css";

const Signup = () => {
  const [signupData, setSignupData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    mobile: Number,
    password: "",
  });

  const handleSigupFormChange = (e) => {
    const { name, value } = e.target;
    name === "mobile"
      ? setSignupData({ ...signupData, [name]: +value })
      : setSignupData({ ...signupData, [name]: value });
  };

  console.log("signupdata", signupData);
  return (
    <div className={styles.signupMainDiv}>
      <h2>CREATE NEW CUSTOMER ACCOUNT</h2>
      <h3>Personal & Login Information</h3>
      <hr />
      <form id={styles.signupForm}>
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
        <br />
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
        <br />
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
        <br />
        <label>Mobile no.</label>
        <br />
        <input
          type="number"
          id="mobile"
          name="mobile"
          placeholder="Enter mobile no..."
          required
          minLength={10}
          max={9999999999}
          onChange={(e) => handleSigupFormChange(e)}
        />
        <br />
        <label>Password:</label>
        <br />
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Enter password..."
          required
          min={8}
          max={12}
          pattern="ab!@#$ABC123"
          onChange={(e) => handleSigupFormChange(e)}
        />
        <br />
        <label>Re-password:</label>
        <br />
        <input
          type="password"
          id="re-password"
          name="re-password"
          placeholder="Re-enter password..."
          required
          min={8}
          max={12}
          pattern="ab!@#$ABC123"
          onChange={(e) => handleSigupFormChange(e)}
        />
        <br />
        <input
          type="checkbox"
          id="show-password-checkbox"
          name="show-password"
        />
        <label>Show password</label>
        <br />
      </form>
    </div>
  );
};

export default Signup;

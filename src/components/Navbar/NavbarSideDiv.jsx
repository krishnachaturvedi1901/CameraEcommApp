import React from "react";
import styles from "./NavbarSideDiv.module.css";
import { Link } from "react-router-dom";

const NavbarSideDiv = () => {
  return (
    <div className={styles.navSideDiv} >
      <button>
        <Link to={"/login"} id={styles.loginId} className={styles.navListing}>
          Login
        </Link>
      </button>
      <div>
        <Link to={"/"} className={styles.navListing}>
          Home
        </Link>
      </div>
      <div>
        <Link to={"/products"} className={styles.navListing}>
          Products
        </Link>
      </div>
    </div>
  );
};

export default NavbarSideDiv;

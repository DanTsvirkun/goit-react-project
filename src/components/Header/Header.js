import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./Header.module.css";
import logo from "./images/logo.svg";

const Header = () => {
  return (
    <header className={styles.header}>
      <NavLink className={styles.logo} to="/">
        <img src={logo} alt="logo_go-it" width="140" height="42" />
      </NavLink>
    </header>
  );
};

export default Header;

import React from "react";
import styles from "./Header.module.css";

import logo from "./images/logo.svg";

const Header = () => {
  return (
    <header className={styles.header}>
      <img src={logo} alt="logo_go-it" />
    </header>
  );
};

export default Header;

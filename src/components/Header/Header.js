import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import styles from "./Header.module.css";
import logo from "./images/logo.svg";
import UserMenu from "../UserMenu/UserMenu";
import { useSelector } from "react-redux";

const Header = () => {
  const uid = useSelector((state) => state.auth.uid);

  useEffect(() => {
    window.gapi.load("auth2", () => {
      window.gapi.auth2.init({
        client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
      });
    });
  }, []);

  return (
    <header className={styles.header}>
      <NavLink to="/" className={styles.logo_link}>
        <img src={logo} alt="logo_go-it" width="140" height="42" />
      </NavLink>
      {uid && <UserMenu />}
    </header>
  );
};

export default Header;

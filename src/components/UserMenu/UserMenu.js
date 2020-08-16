import React from "react";
import styles from "./userMenu.module.css";
import { useSelector } from "react-redux";

const UserMenu = () => {
  const email = useSelector((state) => state.auth.email);
  return (
    <div className={styles.menu_container}>
      <span className={styles.user_email}>{email}</span>{" "}
      <button className={styles.log_out}>Log Out</button>
    </div>
  );
};

export default UserMenu;

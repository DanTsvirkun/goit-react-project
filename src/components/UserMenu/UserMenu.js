import React from "react";
import styles from "./userMenu.module.css";
import { useSelector, useDispatch } from "react-redux";
import LogOutOperation from "../../redux/operations/LogOutOperation";

const UserMenu = () => {
  const email = useSelector((state) => state.auth.email);
  const dispatch = useDispatch();

  const logOut = () => {
    dispatch(LogOutOperation());
  };
  return (
    <div className={styles.menu_container}>
      <span className={styles.user_email}>{email}</span>{" "}
      <button className={styles.log_out} onClick={logOut}>
        Log Out
      </button>
    </div>
  );
};

export default UserMenu;

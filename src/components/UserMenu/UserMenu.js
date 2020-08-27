import React, { useEffect } from "react";
import styles from "./userMenu.module.css";
import { useSelector, useDispatch } from "react-redux";
import LogOutOperation from "../../redux/operations/LogOutOperation";

const UserMenu = () => {
  const email = useSelector((state) => state.auth.email);
  const uid = useSelector((state) => state.auth.uid);
  const dispatch = useDispatch();

  useEffect(() => {
    window.gapi.load("auth2", () => {
      window.gapi.auth2.init({
        client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
      });
    });
  }, []);

  const logOut = async () => {
    dispatch(LogOutOperation(uid));
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

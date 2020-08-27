import React, { useEffect } from "react";
import { gapi } from "gapi-script";
import styles from "./SignInGoogle.module.css";
import { useDispatch } from "react-redux";
import SignInOperation from "../../redux/operations/SignInOperation";

const SignInGoogle = () => {
  const dispatch = useDispatch();

  const signIn = async () => {
    const result = await window.gapi.auth2.getAuthInstance().signIn();
    dispatch(SignInOperation(result));
  };

  return (
    <>
      <p className={styles.ride_line}>
        <span className={styles.ride_line_span}>або</span>
      </p>{" "}
      <button type="button" className={styles.google} onClick={signIn}>
        Увійти з Google Account
      </button>
    </>
  );
};

export default SignInGoogle;

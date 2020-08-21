import React, { useEffect } from "react";
import { gapi } from "gapi-script";
import styles from "./SignInGoogle.module.css";
import { useDispatch } from "react-redux";
import SignInOperation from "../../redux/operations/SignInOperation";

const SignInGoogle = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    window.gapi.load("auth2", () => {
      window.gapi.auth2.init({
        client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
      });
    });
  }, []);

  const signIn = () => {
    dispatch(SignInOperation());
  };

  return (
    <button type="button" className={styles.google} onClick={signIn}>
      Увійти з Google Account
    </button>
  );
};

export default SignInGoogle;

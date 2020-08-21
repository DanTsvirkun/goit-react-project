import React from "react";
import AuthBackground from "../../components/AuthBackground/AuthBackground";
import LogInForm from "../../components/LogInForm/LogInForm";
import { useSelector } from "react-redux";
import App from "../../components/Loader/Loader";
import styles from "./Login.module.css";

const Login = () => {
  const loaderValue = useSelector((state) => state.loader);
  return (
    <>
      <AuthBackground />
      <LogInForm />
      {loaderValue && (
        <div className={styles.loader_position}>
          <App />
        </div>
      )}
    </>
  );
};

export default Login;

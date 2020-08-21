import React from "react";
import RegistrationForm from "../../components/RegistrationForm/RegistrationForm";
import AuthBackground from "../../components/AuthBackground/AuthBackground";
import { useSelector } from "react-redux";
import App from "../../components/Loader/Loader";
import styles from "./Registration.module.css";

const Registaration = () => {
  const loaderValue = useSelector((state) => state.loader);
  return (
    <>
      <AuthBackground />
      <RegistrationForm />
      {loaderValue && (
        <div className={styles.loader_position}>
          <App />
        </div>
      )}
    </>
  );
};

export default Registaration;

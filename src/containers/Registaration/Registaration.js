import React from "react";
import styles from "./Registaration.module.css";
import RegistrationForm from "../../components/RegistrationForm/RegistrationForm";

const Registaration = () => {
  return (
    <div className={styles.registration_wrapper}>
      <RegistrationForm />;
    </div>
  );
};

export default Registaration;

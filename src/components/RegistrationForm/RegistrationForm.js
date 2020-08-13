import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./RegistrationForm.module.css";

const RegistrationForm = () => {
  return (
    <form className={styles.registaration_form}>
      <h1 className={styles.registaration_title}>Реєстрація</h1>
      <input
        type="email"
        placeholder="E-mail"
        className={styles.registaration_input}
      />
      <input
        type="password"
        placeholder="Пароль"
        className={styles.registaration_input}
      />
      <input
        type="password"
        placeholder="Повторіть пароль"
        className={styles.registaration_input}
      />
      <button type="submit" className={styles.registration_btn}>
        Зареєструватися
      </button>
      <p className={styles.account}>
        Маєте акаунт?{" "}
        <NavLink className={styles.account_link} to="/">
          Увійти
        </NavLink>
      </p>
    </form>
  );
};

export default RegistrationForm;

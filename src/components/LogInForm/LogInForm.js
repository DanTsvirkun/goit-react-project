import React from "react";
import styles from "./LogInForm.module.css";

const LogInForm = () => {
  return (
    <form className={styles.auth}>
      <h1 className={styles.auth_title}>Вхід</h1>
      <input type="email" placeholder="E-mail" className={styles.auth_input} />
      <input
        type="password"
        placeholder="Пароль"
        className={styles.auth_input}
      />
      <button className={styles.auth_btn}>Увійти</button>
    </form>
  );
};

export default LogInForm;

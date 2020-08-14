import React, { useState } from "react";
import styles from "./LogInForm.module.css";

const initialState = { email: "", password: "" };

const LogInForm = () => {
  const [form, setForm] = useState(initialState);

  const inputHandler = ({ target }) => {
    const { name, value } = target;
    setForm((state) => ({
      ...state,
      [name]: value,
    }));
  };

  const submitForm = (e) => {
    e.preventDefault();
    console.log(form);
    setForm(initialState);
  };

  return (
    <form className={styles.auth} onSubmit={submitForm}>
      <h1 className={styles.auth_title}>Вхід</h1>
      <input
        type="email"
        placeholder="E-mail"
        name="email"
        onChange={inputHandler}
        value={form.email}
        className={styles.auth_input}
      />
      <input
        type="password"
        placeholder="Пароль"
        name="password"
        onChange={inputHandler}
        value={form.password}
        className={styles.auth_input}
      />
      <button className={styles.auth_btn}>Увійти</button>
    </form>
  );
};

export default LogInForm;

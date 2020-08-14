import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import styles from "./RegistrationForm.module.css";

const initialState = { email: "", password: "", repeat_password: "" };

const RegistrationForm = () => {
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
    <form className={styles.registaration_form} onSubmit={submitForm}>
      <h1 className={styles.registaration_title}>Реєстрація</h1>
      <input
        type="email"
        placeholder="E-mail"
        className={styles.registaration_input}
        name="email"
        value={form.email}
        onChange={inputHandler}
      />
      <input
        type="password"
        placeholder="Пароль"
        className={styles.registaration_input}
        name="password"
        value={form.password}
        onChange={inputHandler}
      />
      <input
        type="password"
        placeholder="Повторіть пароль"
        className={styles.registaration_input}
        name="repeat_password"
        value={form.repeat_password}
        onChange={inputHandler}
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

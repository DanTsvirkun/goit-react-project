import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./RegistrationForm.module.css";

const RegistrationForm = () => {
  return (
    <form>
      <h1>Реєстрація</h1>
      <input type="email" />
      <input type="password" />
      <input type="password" />
      <button>Зареєструватися</button>
      <p>{/* Маєте акаунт? <NavLink>Увійти</NavLink> */}</p>
    </form>
  );
};

export default RegistrationForm;

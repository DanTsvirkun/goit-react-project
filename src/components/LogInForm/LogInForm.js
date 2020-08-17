import React, { useState } from "react";
import styles from "./LogInForm.module.css";
import { withStyles, TextField } from "@material-ui/core";
import { useDispatch } from "react-redux";
import LogIn from "../../redux/operations/LogInOperation";

const CssTextField = withStyles((theme) => ({
  root: {
    width: "429px",
    marginBottom: theme.spacing(5),
    "& label.Mui-focused": {
      color: "#ff6b08",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "#ff6b08",
    },
  },
}))(TextField);

const initialState = { email: "", password: "" };

const LogInForm = () => {
  const [form, setForm] = useState(initialState);
  const dispatch = useDispatch();

  const inputHandler = ({ target }) => {
    const { name, value } = target;
    setForm((state) => ({
      ...state,
      [name]: value,
    }));
  };

  const submitForm = (e) => {
    e.preventDefault();
    dispatch(LogIn(form));
    setForm(initialState);
  };

  return (
    <form className={styles.auth} onSubmit={submitForm}>
      <h1 className={styles.auth_title}>Вхід</h1>
      <CssTextField
        type="email"
        id="standard-basic"
        label="E-mail"
        name="email"
        onChange={inputHandler}
        value={form.email}
        className={styles.auth_input}
      />
      <CssTextField
        type="password"
        id="standard-password-input"
        label="Пароль"
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

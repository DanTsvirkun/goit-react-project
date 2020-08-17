import React, { useState } from "react";
import styles from "./LogInForm.module.css";
import { withStyles, TextField } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import LogIn from "../../redux/operations/LogInOperation";
import { errorOff } from "../../redux/actions/errorActions";

const CssTextField = withStyles((theme) => ({
  root: {
    width: "429px",
    marginBottom: theme.spacing(7),
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
  const error = useSelector((state) => state.error);
  const dispatch = useDispatch();

  const errorMessage = (error) => {
    if (
      error === "The password is invalid or the user does not have a password."
    ) {
      return "Пароль недійсний або користувач не має пароля.";
    } else if (
      error ===
      "There is no user record corresponding to this identifier. The user may have been deleted."
    ) {
      return "Немає запису користувача, що відповідає цьому ідентифікатору. Користувача, можливо, видалено.";
    } else if (
      error === "Too many unsuccessful login attempts. Please try again later."
    ) {
      return "Занадто багато невдалих спроб входу. Повторіть спробу пізніше.";
    }
  };

  const inputHandler = ({ target }) => {
    dispatch(errorOff());
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
        required={true}
      />
      <CssTextField
        type="password"
        id="standard-password-input"
        label="Пароль"
        name="password"
        onChange={inputHandler}
        value={form.password}
        className={styles.auth_input}
        required={true}
      />
      {error !== false && <p className={styles.wrong}>{errorMessage(error)}</p>}
      <button className={styles.auth_btn}>Увійти</button>
    </form>
  );
};

export default LogInForm;

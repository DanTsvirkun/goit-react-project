import React, { useState, useEffect } from "react";
import styles from "./LogInForm.module.css";
import { withStyles, TextField } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import LogIn from "../../redux/operations/LogInOperation";
import { errorOff } from "../../redux/actions/errorActions";
import SignInGoogle from "../SignInGoogle/SignInGoogle";
import { NavLink } from "react-router-dom";

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
  let emailInput = React.createRef();
  let passwordInput = React.createRef();

  useEffect(() => {
    if (
      error === "The password is invalid or the user does not have a password."
    ) {
      passwordInput.current.children[0].control.focus();
    } else if (
      error ===
      "There is no user record corresponding to this identifier. The user may have been deleted."
    ) {
      emailInput.current.firstChild.control.focus();
    }
  }, [error]);

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
    // setForm(initialState);
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
        ref={emailInput}
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
        ref={passwordInput}
      />
      {error !== false && <p className={styles.wrong}>{errorMessage(error)}</p>}
      <button className={styles.auth_btn}>Увійти</button>
      <SignInGoogle />
      <p className={styles.account}>
        Ще не зареєстровані?{" "}
        <NavLink className={styles.account_link} to="/registration">
          Зареєструватися
        </NavLink>
      </p>
    </form>
  );
};

export default LogInForm;

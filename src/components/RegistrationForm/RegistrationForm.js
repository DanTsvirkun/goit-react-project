import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import styles from "./RegistrationForm.module.css";
import { Registration } from "../../redux/operations/RegistarationOperation";
import { useDispatch } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

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

const initialState = { email: "", password: "", repeat_password: "" };

const RegistrationForm = () => {
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
    dispatch(Registration(form));
    setForm(initialState);
  };

  return (
    <form className={styles.registaration_form} onSubmit={submitForm}>
      <h1 className={styles.registaration_title}>Реєстрація</h1>
      <CssTextField
        type="email"
        id="standard-basic"
        label="E-mail"
        name="email"
        value={form.email}
        onChange={inputHandler}
      />
      <CssTextField
        type="password"
        id="1"
        label="Пароль"
        name="password"
        value={form.password}
        onChange={inputHandler}
      />
      <CssTextField
        type="password"
        id="standard-password-input"
        label="Повторіть пароль"
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

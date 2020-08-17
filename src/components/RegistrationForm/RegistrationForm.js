import React, { useState, createRef, useRef } from "react";
import { NavLink } from "react-router-dom";
import styles from "./RegistrationForm.module.css";
import { Registration } from "../../redux/operations/RegistarationOperation";
import { useDispatch, useSelector } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { errorOff } from "../../redux/actions/errorActions";

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
  const [toggle, setToggle] = useState(false);
  const error = useSelector((state) => state.error);
  const dispatch = useDispatch();
  const amountComp = useRef();

  const inputHandler = ({ target }) => {
    const { name, value } = target;

    setForm((state) => ({
      ...state,
      [name]: value,
    }));
  };

  const submitForm = (e) => {
    e.preventDefault();
    if (form.password === form.repeat_password) {
      setToggle(false);
      dispatch(Registration(form));
      setForm(initialState);
    } else {
      dispatch(errorOff());
      setToggle(true);
      e.target[2].focus();
    }
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
        id="2"
        label="Повторіть пароль"
        name="repeat_password"
        value={form.repeat_password}
        onChange={inputHandler}
      />
      {error !== false && <p className={styles.wrong}>{error}</p>}
      {toggle && <p className={styles.wrong}>Паролі не співпадають</p>}
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

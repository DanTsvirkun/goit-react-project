import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { useLocation } from "react-router-dom";
import ModalSidebar from "../ModalSidebar/ModalSidebar";
import formStyles from "../ProjectCreationForm/ProjectCreationForm.module.css";
import { addMember } from "../../redux/operations/membersOperations";
import MemberList from "../MemberList/MemberList";
import projects from "../../redux/operations/projectsOperations";

const EmailTextField = withStyles({
  root: {
    "& .MuiInputBase-root": {
      marginBottom: "50px",
    },
    "& .MuiInputBase-root.Mui-error": {
      marginBottom: "0px",
    },
    "& label.Mui-focused": {
      color: "#181c2799",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "#181c2799",
    },
    "& .MuiFormHelperText-root.Mui-error": {
      marginBottom: "50px",
      fontFamily: "Montserrat",
      color: "red",
      fontSize: "12px",
    },
    "& > *": {
      width: "430px",
      fontFamily: "Montserrat",
      fontWeight: "normal",
      fontSize: "18px",
      lineHeight: "22px",
    },
  },
})(TextField);

const MembersForm = ({
  addMember,
  getProjects,
  status,
  onClose,
  emailProp,
}) => {
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});
  const newLocation = useLocation();

  const handleInput = ({ target }) => {
    const { value } = target;
    setEmail(value);
  };

  const validate = (email) => {
    const errorsObj = {};

    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      errorsObj.title = "Введіть існуючий email";
    }

    if (email.length === 0) {
      errorsObj.title = "Це поле є обов'язковим";
    }

    setErrors(errorsObj);

    return !!Object.keys(errorsObj).length;
  };

  function customOnClose() {
    setEmail("");
    setErrors({});
    onClose();
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    const projectId = newLocation.pathname.split("/")[2];
    const value = { projectId, email };

    const result = await validate(email);

    if (!result) {
      const answer = await addMember(value);
      console.log(answer);
      if (answer === "Цей користувач вже є участником") {
        setErrors({ title: "Цей користувач вже є участником" });
      } else {
        setEmail("");
        await getProjects(emailProp);
        setErrors({});
      }
    }
    return result;
  };

  return (
    <ModalSidebar
      onSubmit={handleSubmit}
      status={status}
      onClose={customOnClose}
    >
      <form
        className={formStyles.form}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <h2 className={formStyles.formTitle}>Додати людей</h2>

        <EmailTextField
          id="custom-css-standard-input"
          label="E-mail учасника"
          name="title"
          value={email}
          onChange={handleInput}
          error={errors.title ? true : undefined}
          helperText={errors.title}
        />
      </form>

      <MemberList />
    </ModalSidebar>
  );
};

const mapStateToProps = (state) => ({
  emailProp: state.auth.email,
});

// const mapDispatchToProps = (dispatch) => ({
//   addMember: (value) => dispatch(addMember(value)),
//   getProjects: (value) => dispatch(projects.getProjectsByEmailOperation(value)),
// });

const mapDispatchToProps = {
  addMember,
  getProjects: projects.getProjectsByEmailOperationCustom,
};

export default connect(mapStateToProps, mapDispatchToProps)(MembersForm);

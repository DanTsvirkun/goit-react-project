import React, { useState } from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import projectsOperations from "../../redux/operations/projectsOperations";
import projectsSelectors from "../../redux/selectors/projectsSelectors";
import ModalSidebar from "../ModalSidebar/ModalSidebar";

import formStyles from "./ProjectCreationForm.module.css";

const NameTextField = withStyles({
  root: {
    "& .MuiInputBase-root": {
      marginBottom: "50px",
    },
    "& .MuiInputBase-root.Mui-error": {
      marginBottom: "0px",
    },
    "& label.Mui-focused": {
      color: "#ff6b08",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "#ff6b08",
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

const DescriptionTextField = withStyles({
  root: {
    "& .MuiInputBase-root": {
      marginBottom: "60px",
    },
    "& .MuiInputBase-root.Mui-error": {
      marginBottom: "0px",
    },
    "& label.Mui-focused": {
      color: "#ff6b08",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "#ff6b08",
    },
    "& .MuiFormHelperText-root.Mui-error": {
      marginBottom: "60px",
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
      outline: "none",
    },
  },
})(TextField);

const initialState = {
  title: "",
  description: "",
};

const ProjectCreationForm = ({ addProject, status, onClose, email }) => {
  const [projectItem, setProjectItem] = useState(initialState);
  const [errors, setErrors] = useState({});

  const handleInput = ({ target }) => {
    const { name, value } = target;
    setProjectItem((state) => ({
      ...state,
      [name]: value,
    }));
  };

  const validate = (title, description) => {
    const errors = {};

    if (title.length < 2) {
      errors.title = "Довжина назви проекту надто коротка.";
    }

    if (title.length > 40) {
      errors.title = `Довжина назви проекту надто довга: ${title.length} символів. Допустимо: 40`;
    }

    if (description.length < 2) {
      errors.description = "Довжина опису проекту надто коротка.";
    }

    if (description.length > 160) {
      errors.description = `Довжина опису проекту надто довга: ${description.length} символів. Допустимо: 160`;
    }

    if (title.length === 0) {
      errors.title = "Це поле є обов'язковим для заповнення.";
    }

    if (description.length === 0) {
      errors.description = "Це поле є обов'язковим для заповнення.";
    }

    setErrors(errors);

    return !!Object.keys(errors).length;
  };

  const customOnClose = () => {
    onClose();
    setErrors({});
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const { title, description } = projectItem;

    const project = {
      title,
      description,
      members: [email],
    };

    const result = validate(title, description);
    if (!result) {
      addProject(project);
      setProjectItem(initialState);
      customOnClose();
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
        <h2 className={formStyles.formTitle}>Створення проекту</h2>

        <NameTextField
          id="custom-css-standard-input"
          label="Назва проекту"
          name="title"
          value={projectItem.title}
          onChange={handleInput}
          error={errors.title ? true : undefined}
          helperText={errors.title}
        />

        <DescriptionTextField
          id="custom-css-standard-input"
          label="Опис"
          name="description"
          value={projectItem.description}
          onChange={handleInput}
          error={errors.description ? true : undefined}
          helperText={errors.description}
        />
      </form>
    </ModalSidebar>
  );
};

const mapStateToProps = (state) => ({
  email: projectsSelectors.authEmailSelector(state),
});

const mapDispatchToProps = {
  addProject: projectsOperations.addProjectOperation,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProjectCreationForm);

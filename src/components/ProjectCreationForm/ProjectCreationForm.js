import React, { useState } from "react";
import { connect } from "react-redux";
import projectsOperations from "../../redux/operations/projectsOperations";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import ModalSidebar from "../ModalSidebar/ModalSidebar";
import projectsSelectors from "../../redux/selectors/projectsSelectors";

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

const DescriptionTextField = withStyles({
  root: {
    "& .MuiInputBase-root": {
      marginBottom: "60px",
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
      errors.title = "Title length is too short";
    }

    if (title.length > 40) {
      errors.title = "Title length is too long";
    }

    if (description.length < 2) {
      errors.description = "Description length is too short";
    }

    if (description.length > 160) {
      errors.description = "Description length is too long";
    }

    if (title.length === 0) {
      errors.title = "Required field";
    }

    if (description.length === 0) {
      errors.description = "Required field";
    }

    setErrors(errors);

    return !!Object.keys(errors).length;
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
      onClose();
      setErrors({});
    }
  };

  return (
    <ModalSidebar onSubmit={handleSubmit} status={status} onClose={onClose}>
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

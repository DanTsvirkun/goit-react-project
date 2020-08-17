import React, { useState } from "react";
import { connect } from "react-redux";
import projectsOperations from "../../redux/operations/projectsOperations";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

import formStyles from "./ProjectCreationForm.module.css";

const NameTextField = withStyles({
  root: {
    "& label.Mui-focused": {
      color: "#181c2799",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "#181c2799",
    },
    "& > *": {
      width: "430px",
      marginBottom: "50px",
      fontFamily: "Montserrat",
      fontWeight: "normal",
      fontSize: "18px",
      lineHeight: "22px",
    },
  },
})(TextField);

const DescriptionTextField = withStyles({
  root: {
    "& label.Mui-focused": {
      color: "#181c2799",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "#181c2799",
    },
    "& > *": {
      width: "430px",
      marginBottom: "60px",
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

const ProjectCreationForm = ({ addProject }) => {
  const [projectItem, setProjectItem] = useState(initialState);

  const handleInput = ({ target }) => {
    const { name, value } = target;
    setProjectItem((state) => ({
      ...state,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const { title, description } = projectItem;

    const project = {
      title,
      description,
    };

    addProject(project);
    setProjectItem(initialState);
  };

  return (
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
        required
      />

      <DescriptionTextField
        id="custom-css-standard-input"
        label="Опис"
        name="description"
        value={projectItem.description}
        onChange={handleInput}
        required
        // InputLabelProps={{
        //   shrink: true,
        // }}
      />

      <button type="submit" className={formStyles.completeBtn}>
        Готово
      </button>
      <button className={formStyles.exitBtn}>Відміна</button>
    </form>
  );
};

const mapDispatchToProps = {
  addProject: projectsOperations.addProjectOperation,
};

export default connect(null, mapDispatchToProps)(ProjectCreationForm);

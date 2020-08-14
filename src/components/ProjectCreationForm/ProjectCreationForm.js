import React from "react";
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
      fontSize: "26px",
      lineHeight: "22px",
      outline: "none",
    },
  },
})(TextField);

const ProjectCreationForm = () => { 

  return (
    <form className={formStyles.form} noValidate autoComplete="off">
      <h2 className={formStyles.formTitle}>Створення проекту</h2>
     

      <NameTextField id="custom-css-standard-input" label="Назва проекту" />

      <DescriptionTextField
        id="custom-css-standard-input"
        label="Опис"
        InputLabelProps={{
          shrink: true,
        }}
      />

      <button className={formStyles.completeBtn}>Готово</button>
      <button className={formStyles.exitBtn}>Відміна</button>
    </form>
  );
};

export default ProjectCreationForm;
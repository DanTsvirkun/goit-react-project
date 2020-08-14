import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import formStyles from "./ProjectCreationForm.module.css";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
  nameField: {
    "& > *": {
      width: "430px",
      marginBottom: "50px",
      fontFamily: "Montserrat",
      fontWeight: "normal",
      fontSize: "18px",
      lineHeight: "22px",
    },
  },
  descriptionField: {
    "& > *": {
      width: "430px",
      marginBottom: "60px", 
      fontFamily: "Montserrat",
      fontWeight: "normal",
      fontSize: "26px",
      lineHeight: "22px",          
    },    
  },
}));

const ProjectCreationForm = () => {
  const classes = useStyles();

  return (
    <form
      className={(classes.root, formStyles.form)}
      noValidate
      autoComplete="off"
    >
      <h2 className={formStyles.formTitle}>Створення проекту</h2>
      <TextField
        id="standard-basic"
        label="Назва проекту"
        className={classes.nameField}
      />
      {/* <p className={formStyles.descrTitle}>Опис</p> */}
      <TextField
        id="standard-basic"
        label="Опис"
        className={classes.descriptionField}        
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

// #181c2799
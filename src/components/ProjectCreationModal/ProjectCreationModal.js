import React from "react"
import ProjectCreationForm from "../ProjectCreationForm/ProjectCreationForm";

const projectCreationModal = ({status, onClose}) => {
  return (       
        <ProjectCreationForm status={status} onClose={onClose}/>     
  );
};

export default projectCreationModal;
import React from "react";
import CreatingSprint from "../CreatingSprint/CreatingSprint";

const SprintCreationModal = ({ status, onClose }) => {
  return <CreatingSprint status={status} onClose={onClose} />;
};

export default SprintCreationModal;

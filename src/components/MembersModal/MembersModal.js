import React from "react";
import MembersForm from "../MembersForm/MembersForm";

const membersCreationModal = ({ status, onClose }) => {
  return <MembersForm status={status} onClose={onClose} />;
};

export default membersCreationModal;

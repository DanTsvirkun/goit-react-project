import React from "react";
import "./ProjectPage.css";

const ProjectPage = () => {
  return (
    // Header///
    <>
      <div className="header">
        <a href="#default" className="logo">
          CompanyLogo
        </a>
        <div className="header-right">
          <a className="active" href="#home">
            Home
          </a>
          <a href="#contact">Contact</a>
          <a href="#about">About</a>
        </div>
      </div>
      <hr />
    </>
  );
};

export default ProjectPage;

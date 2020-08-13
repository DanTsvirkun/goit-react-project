import React from "react";
import styles from "./ProjectPage.module.css";
import pencil from "../../Icons/pencil.svg";

const ProjectPage = () => {
  return (
    // Header start///
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
      {/* Header end*/}
      <h1 className={styles.projectHeader}>Project 1</h1>
      <img
        className={styles.Icon}
        src={pencil}
        alt="pencil"
        height="20"
        width="20"
      />
    </>
  );
};

export default ProjectPage;

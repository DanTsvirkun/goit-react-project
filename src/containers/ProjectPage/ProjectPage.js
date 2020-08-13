import React from "react";
import styles from "./ProjectPage.module.css";
import pencil from "../../Icons/pencil.svg";
import plus from "../../Icons/plus.svg";
import SprintSidebar from "../../components/SprintSidebar/SprintSidebar";

const ProjectPage = () => {
  return (
    <>
      <div className={styles.page_wrapper}>
        <SprintSidebar />
        <div className={styles.projectWrapper}>
          <div className={styles.project__header__wrapper}>
            <div
              className={`${styles.project__button__wrapper} ${styles.project__wrapper}`}
            >
              <h1 className={styles.project__header}>Project 1</h1>
              <button className={`${styles.button} ${styles.button__pencil}`}>
                <img
                  className={`${styles.icon}`}
                  src={pencil}
                  alt="pencil"
                  height="20"
                  width="20"
                />
              </button>
            </div>
            <div
              className={`${styles.project__button__wrapper} ${styles.project__wrapper}`}
            >
              <button className={styles.button}>
                <img
                  className={`${styles.icon}`}
                  src={plus}
                  alt="pencil"
                  height="44"
                  width="44"
                />
              </button>
              <p className={styles.sprint_text}>Створити спринт</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectPage;

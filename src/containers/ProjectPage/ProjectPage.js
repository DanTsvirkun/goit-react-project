import React from "react";
import styles from "./ProjectPage.module.css";
import pencil from "../../Icons/pencil.svg";
import plus from "../../Icons/plus.svg";

const ProjectPage = () => {
  return (
    // Header start///
    <>
      {/* Header end*/}
      <div className={styles.projectWrapper}>
        <div className={styles.project__header__wrapper}>
          <div className={styles.project__button__wrapper}>
            <h1 className={styles.project__header}>Project 1</h1>
            <button className={`${styles.button} ${styles.pencil}`}>
              <img
                className={`${styles.Icon}`}
                src={pencil}
                alt="pencil"
                height="20"
                width="20"
              />
            </button>
          </div>
          <div className={styles.btnWrapper}>
            <button className={styles.button}>
              <img
                className={`${styles.Icon}`}
                src={plus}
                alt="pencil"
                height="44"
                width="44"
              />
            </button>
            <p className={styles.sprintTxt}>Створити спринт</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectPage;

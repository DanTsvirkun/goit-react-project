import React from "react";
import styles from "./App.module.css";
import ProjectPage from "../../containers/ProjectPage/ProjectPage";

const App = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <ProjectPage />
      </div>
    </div>
  );
};

export default App;

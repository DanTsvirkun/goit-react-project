import React from "react";
import styles from "./App.module.css";
import Registration from "../../containers/Registration/Registration";
import SprintPage from "../../containers/Sprint/Sprint";
import Header from "../Header/Header";

//
import Projects from "../../containers/Projects/Projects.js"
//

const App = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>       
        <Header />
        <Projects/>
        <SprintPage />
        {/* <Registration /> */}
      </div>
    </div>
  );
};

export default App;

// http://localhost:3000/projects/project/sprints?sprint=1
// /projects/:projecId/sprints/:sprintId
// projects/123123jdkfajfka/sprints/fjkaojks123?search=task

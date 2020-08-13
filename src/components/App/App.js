import React from "react";
import Header from "../Header/Header";
import Registration from "../../containers/Registration/Registration";
import Login from "../../containers/Login/Login";
import SprintPage from "../../containers/Sprint/Sprint";
import styles from "./App.module.css";

const App = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <Header />
        <Registration />
        {/* <Login /> */}
        {/* <SprintPage /> */}
      </div>
    </div>
  );
};

export default App;

// http://localhost:3000/projects/project/sprints?sprint=1
// /projects/:projecId/sprints/:sprintId
// projects/123123jdkfajfka/sprints/fjkaojks123?search=task

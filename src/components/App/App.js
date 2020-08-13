import React from "react";
import styles from "./App.module.css";

//
import Projects from "../../containers/Projects/Projects.js"
//

const App = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <Projects/>
      </div>
    </div>
  );
};

export default App;

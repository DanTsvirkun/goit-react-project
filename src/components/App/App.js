import React from "react";
import styles from "./App.module.css";
import Registaration from "../../containers/Registaration/Registaration";

const App = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <Registaration />
      </div>
    </div>
  );
};

export default App;

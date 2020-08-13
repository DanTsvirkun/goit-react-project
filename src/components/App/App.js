import React from "react";
import styles from "./App.module.css";
import Registration from "../../containers/Registration/Registration";
import Header from "../Header/Header";

const App = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <Header />
        {/* <Registration /> */}
      </div>
    </div>
  );
};

export default App;

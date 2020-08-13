import React from "react";
import styles from "./Registaration.module.css";
import RegistrationForm from "../../components/RegistrationForm/RegistrationForm";

import elipse1 from "./images/Ellipse 1.svg";
import elipse2 from "./images/Ellipse 2.svg";
import elipse3 from "./images/Ellipse 3.svg";
import elipse4 from "./images/Ellipse 4.svg";
import elipse5 from "./images/Ellipse 5.svg";
import elipse6 from "./images/Ellipse 6.svg";
import union_white from "./images/Union.white.svg";
import union_orange from "./images/Union.orange.svg";

const Registaration = () => {
  return (
    <>
      <div className={styles.test_header}>Test version of header</div>

      <img src={elipse1} alt="" className={styles.elipse1} />
      <img src={elipse2} alt="" className={styles.elipse2} />
      <img src={elipse3} alt="" className={styles.elipse3} />
      <img src={elipse4} alt="" className={styles.elipse4} />
      <img src={elipse5} alt="" className={styles.elipse5} />
      <img src={elipse6} alt="" className={styles.elipse6} />
      <img src={union_white} alt="" className={styles.union_white} />
      <img src={union_orange} alt="" className={styles.union_orange} />
      <RegistrationForm />
    </>
  );
};

export default Registaration;

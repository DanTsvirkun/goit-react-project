import React from "react";
import styles from "./Registaration.module.css";
import RegistrationForm from "../../components/RegistrationForm/RegistrationForm";

import elipse1 from "./images/Ellipse 1.svg";
import elipse2 from "./images/Ellipse 2.svg";
import elipse3 from "./images/Ellipse 3.svg";
import elipse4 from "./images/Ellipse 4.svg";
import elipse5 from "./images/Ellipse 5.svg";
import elipse6 from "./images/Ellipse 6.svg";
import elipse65_white from "./images/Rectangle65white.png";

const Registaration = () => {
  return (
    <div className={styles.registration_wrapper}>
      <img src={elipse1} alt="298" className={styles.elipse1} />
      <img src={elipse2} alt="252" className={styles.elipse2} />
      <img src={elipse3} alt="118" className={styles.elipse3} />
      <img src={elipse4} alt="48" className={styles.elipse4} />
      <img src={elipse5} alt="78" className={styles.elipse5} />
      <img src={elipse6} alt="26" className={styles.elipse6} />
      <img src={elipse65_white} alt="430" />
      <RegistrationForm />;
    </div>
  );
};

export default Registaration;

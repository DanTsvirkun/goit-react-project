import React, { useState } from "react";
import SprintTask from "../SprintTask/SprintTask";
import css from "./SprintTasksList.module.css";
import BurndownChartBtn from "../BurndownChartBtn/BurndownChartBtn";
import BurndownChartModalWindow from "../BurndownChartModalWindow/BurndownChartModalWindow";

const SprintTasksList = () => {
  const [toggleAnalytic, setToggleAnalytic] = useState(false);
  const handleToggleAnalytic = () => {
    setToggleAnalytic((state) => !state);
  };

  return (
    <div className={css.wrapper}>
      <ul className={css["sprint__tasks-list"]}>
        {[
          { title: "KN-1 Configure project" },
          { title: "KN-3 Create Button Component" },
          { title: "KN-4 Create Button Component" },
          { title: "KN-5 Create Button Component" },
        ].map((task) => (
          <SprintTask key={task.title} {...task} />
        ))}
      </ul>
      {!toggleAnalytic && <BurndownChartBtn openModal={handleToggleAnalytic} />}
      {toggleAnalytic && (
        <BurndownChartModalWindow onClose={handleToggleAnalytic} />
      )}
    </div>
  );
};

export default SprintTasksList;

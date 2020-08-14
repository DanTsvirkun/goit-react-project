import React, { useState } from 'react';
import SprintTask from '../SprintTask/SprintTask';
import css from './SprintTasksList.module.css';
const SprintTasksList = () => {
  const [toggleAnalytic, setToggleAnalytic] = useState(false);
  const handleToggleAnalytic = () => {
    setToggleAnalytic(state => !state);
  };
  return (
    <div className={css.wrapper}>
      <ul className={css['sprint__tasks-list']}>
        {[
          { title: 'KN-1 Configure project' },
          { title: 'KN-3 Create Button Component' },
          { title: 'KN-3 Create Button Component' },
          { title: 'KN-3 Create Button Component' },
        ].map(task => (
          <SprintTask {...task} />
        ))}
      </ul>
      <button
        onClick={handleToggleAnalytic}
        className={css['sprint__analytic-btn']}
      >
        {toggleAnalytic && <div> put here your component</div>}
      </button>
    </div>
  );
};

export default SprintTasksList;

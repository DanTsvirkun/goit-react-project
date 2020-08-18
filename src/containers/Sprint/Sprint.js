import React from 'react';
import { Route } from 'react-router-dom';
import SprintSidebar from '../../components/SprintSidebar/SprintSidebar';
import css from './Sprint.module.css';
import SprintHeader from '../../components/SprintHeader/SprintHeader';
import { toggleFilterAction } from '../../redux/actions/sprintTasksActions';
import SprintTableTitle from '../../components/SprintTableTitle/SprintTableTitle';
import SprintTasksList from '../../components/SprintTasksList/SprintTasksList';
import { connect } from 'react-redux';
const Sprint = ({ match, toggleFilterAction }) => {
  const handleCloseFilter = e => {
    console.log(e.target.nodeName);
    if (e.target.nodeName !== 'INPUT' && e.target.nodeName !== 'BUTTON') {
      toggleFilterAction(false);
      return;
    }
  };
  return (
    <section className={css.sprint}>
      <div className={css.container} onClick={handleCloseFilter}>
        <SprintSidebar />
        <div className={css['sprint__main-wrapper']}>
          <SprintHeader />
          <SprintTableTitle />
          <Route path={`${match.path}/:sprintId`} component={SprintTasksList} />
        </div>
      </div>
    </section>
  );
};
const mapDispatchToProps = {
  toggleFilterAction,
};
export default connect(null, mapDispatchToProps)(Sprint);

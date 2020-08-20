import React, { useEffect } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import SprintSidebar from '../../components/SprintSidebar/SprintSidebar';
import css from './Sprint.module.css';
import SprintHeader from '../../components/SprintHeader/SprintHeader';
import { toggleFilterAction } from '../../redux/actions/sprintTasksActions';
import SprintTableTitle from '../../components/SprintTableTitle/SprintTableTitle';
import SprintTasksList from '../../components/SprintTasksList/SprintTasksList';
import Loader from '../../components/Loader/Loader';
const Sprint = ({
  match,
  toggleFilterAction,
  location,
  history,
  loader,
  error,
}) => {
  const handleCloseFilter = e => {
    // console.log(e);

    if (!e.target.dataset.filter) {
      toggleFilterAction(false);
      return;
    }
  };
  useEffect(() => {}, []);

  return (
    <section className={css.container} onClick={handleCloseFilter}>
      <SprintSidebar />
      <div className={css['sprint__main-wrapper']}>
        {loader && (
          <div className={css['sprint__loader-wrapper']}>
            <Loader />
          </div>
        )}
        <SprintHeader />
        <SprintTableTitle />

        <SprintTasksList match={match} location={location} history={history} />
      </div>
    </section>
  );
};
const mapDispatchToProps = {
  toggleFilterAction,
};
const mapStateToProps = state => ({
  loader: state.loader,
  error: state.error,
});
export default connect(mapStateToProps, mapDispatchToProps)(Sprint);

// <Route path={`${match.path}/:sprintId`} component={SprintTasksList} />;

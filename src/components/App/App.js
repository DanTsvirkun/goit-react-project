import React from "react";
import { Switch, Route } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import { useSelector, useDispatch } from 'react-redux'
import Header from "../Header/Header";
import Registration from "../../containers/Registration/Registration";
import Login from "../../containers/Login/Login";
import SprintPage from "../../containers/Sprint/Sprint";
import styles from "./App.module.css";
import ProjectPage from "../../containers/ProjectPage/ProjectPage";
import Projects from "../../containers/Projects/Projects.js";
import ProjectSidebar from "../../components/ProjectSidebar/ProjectSidebar";
import ModalSidebar from "../ModalSidebar/ModalSidebar";
import modalTransition from '../ModalSidebar/transitions/Modal.module.css'

import { modalOn } from '../../redux/actions/modalAction';

const App = () => {
  const modalStatus = useSelector(state => state.modal)
  const dispatch = useDispatch()

  const toggleOn = () => {
    dispatch(modalOn(true))
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <button onClick={toggleOn}>ON</button>

        <CSSTransition in={modalStatus} timeout={400} classNames={modalTransition} unmountOnExit>
          {stage => {
            return (
              <ModalSidebar stage={stage}></ModalSidebar>
            )
          }
          }
        </CSSTransition>
        <Header />
        {/* <ProjectPage /> */}
        {/* <SprintPage /> */}
        {/* <Registration />  */}
        {/* <Login /> */}
        {/* <ProjectSidebar /> */}
        <Projects />
        {/* <Switch>
          <Route path="/projects/:projectId/sprints" component={SprintPage} />
        </Switch> */}
      </div>
    </div >
  );
};

export default App;

// http://localhost:3000/projects/project/sprints?sprint=1
// /projects/:projecId/sprints/:sprintId
// projects/123123jdkfajfka/sprints/fjkaojks123?search=task

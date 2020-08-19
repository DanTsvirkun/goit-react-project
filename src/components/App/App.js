import React, { Suspense } from "react";
import { Switch, Route } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import { useSelector, useDispatch } from "react-redux";
import Header from "../Header/Header";
import Registration from "../../containers/Registration/Registration";
import Login from "../../containers/Login/Login";
import SprintPage from "../../containers/Sprint/Sprint";
import styles from "./App.module.css";
import ProjectPage from "../../containers/ProjectPage/ProjectPage";
import Projects from "../../containers/Projects/Projects.js";
import ProjectSidebar from "../../components/ProjectSidebar/ProjectSidebar";
import ModalSidebar from "../ModalSidebar/ModalSidebar";
import routes from "../../routes";
import PrivateRoute from "../CustomRoutes/PrivateRoute";
import PublicRoute from "../CustomRoutes/PublicRoute";

const App = () => {
  //Приммер подключения модального окна\\
  // const [modal, setModal] = useState(false)

  // const modalToggle = () => {
  //   setModal(state => !state)
  // }
  //Приммер подключения модального окна\\

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        {/* Приммер подключения модального окна */}
        {/* <button onClick={modalToggle}>ON</button> */}
        {/* <ModalSidebar status={modal} onClose={modalToggle}></ModalSidebar> */}
        {/* Приммер подключения модального окна */}

        {/* <Header />
        <ProjectPage /> */}
        {/* <SprintPage /> */}
        {/* <Registration />  */}
        {/* <Login /> */}
        {/* <ProjectSidebar /> */}
        {/* <Projects /> */}
        {/* <Switch>
          <Route path="/projects/:projectId/sprints" component={SprintPage} />
        </Switch> */}

        <Header />
        <Suspense fallback={<h1>Loading...</h1>}>
          <Switch>
            {routes.map((route) =>
              route.private ? (
                <PrivateRoute key={route.label} {...route} />
              ) : (
                <PublicRoute key={route.label} {...route} />
              )
            )}
          </Switch>
        </Suspense>
      </div>
    </div>
  );
};

export default App;

// http://localhost:3000/projects/project/sprints?sprint=1
// /projects/:projecId/sprints/:sprintId
// projects/123123jdkfajfka/sprints/fjkaojks123?search=task

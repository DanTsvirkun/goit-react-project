import { lazy } from "react";

export default [
  {
    path: "/login",
    label: "Login",
    exact: true,
    component: lazy(() => import("./containers/Login/Login")),
    private: false,
    restricted: true,
  },
  {
    path: "/registration",
    label: "Registration",
    exact: true,
    component: lazy(() => import("./containers/Registration/Registration")),
    private: false,
    restricted: true,
  },
  {
    path: "/projects",
    label: "Projects",
    exact: true,
    component: lazy(() => import("./containers/Projects/Projects")),
    private: true,
    restricted: false,
  },
  {
    path: "/projects/:projectId/sprints",
    label: "Sprints",
    exact: true,
    component: lazy(() => import("./containers/ProjectPage/ProjectPage")),
    private: true,
    restricted: false,
  },
  {
    path: "/projects/:projectId/sprints/:sprintId",
    label: "SingleSprint",
    exact: true,
    component: lazy(() => import("./containers/Sprint/Sprint")),
    private: true,
    restricted: false,
  },
];

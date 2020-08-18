import { lazy } from 'react';
export default [
  {
    path: '/projects/:projectId/sprints',
    label: '/projects/:projectId/sprints',
    exact: true,
    component: lazy(() => import('./containers/Sprint/Sprint')),
    private: true,
    restricted: false,
  },
];

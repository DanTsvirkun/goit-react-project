export const sprintsSelector = (state) => state.sprints;
export const itemsSelector = (state) => sprintsSelector(state).items;
export const showModalSelector = (state) =>
  sprintsSelector(state).showModalAddTask;

export const itemIdSelector = (state, id) => {
  console.log(id);
  return state.projects.find((project) => project.id === id);
};

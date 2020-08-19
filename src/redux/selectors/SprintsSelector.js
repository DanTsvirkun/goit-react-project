export const sprintsSelector = (state) => state.sprints;
export const itemsSelector = (state) => sprintsSelector(state).items;
export const showModalSelector = (state) =>
  sprintsSelector(state).showModalAddTask;

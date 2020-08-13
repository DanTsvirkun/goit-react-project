import React from "react";
import styles from "./App.module.css";
import SprintPage from "../../containers/Sprint/Sprint";

const App = () => {
	return (
		<div className={styles.wrapper}>
			<div className={styles.container}>
				<SprintPage />
			</div>
		</div>
	);
};

export default App;
<Rote
	path="/projects/:projecId/sprints"
	component={SprintPage}
/>;

// http://localhost:3000/projects/project/sprints?sprint=1
// /projects/:projecId/sprints/:sprintId
// projects/123123jdkfajfka/sprints/fjkaojks123?search=task

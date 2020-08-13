import React from "react";
import styles from "./App.module.css";
import Registration from "../../containers/Registration/Registration";
import SprintPage from "../../containers/Sprint/Sprint";
const App = () => {
	return (
		<div className={styles.wrapper}>
			<div className={styles.container}>
				{/* <Registration /> */}
				<SprintPage />
			</div>
		</div>
	);
};

export default App;

// http://localhost:3000/projects/project/sprints?sprint=1
// /projects/:projecId/sprints/:sprintId
// projects/123123jdkfajfka/sprints/fjkaojks123?search=task

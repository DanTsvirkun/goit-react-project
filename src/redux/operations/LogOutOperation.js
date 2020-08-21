import { auth } from "../../config";
import { loaderOn, loaderOff } from "../actions/loaderActions";
import { errorOn } from "../actions/errorActions";
import { resetUser } from "../actions/logInRegistaration";
import resetProjects from "../actions/projectsActions";

const LogOutOperation = () => async (dispatch) => {
  try {
    dispatch(loaderOn());
    await auth.signOut();
    dispatch(resetUser());
    dispatch(resetProjects.cleanProjectsOnLogout());
  } catch (error) {
    dispatch(errorOn(error));
  } finally {
    dispatch(loaderOff());
  }
};

export default LogOutOperation;

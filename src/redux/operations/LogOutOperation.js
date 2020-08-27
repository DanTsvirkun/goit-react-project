import { auth } from "../../config";
import { loaderOn, loaderOff } from "../actions/loaderActions";
import { errorOn } from "../actions/errorActions";
import { resetUser } from "../actions/logInRegistaration";
import resetProjects from "../actions/projectsActions";

const LogOutOperation = (uid) => async (dispatch) => {
  try {
    dispatch(loaderOn());
    if (uid.length <= 28) {
      await auth.signOut();
    } else if (uid.length > 28) {
      await window.gapi.auth2.getAuthInstance().signOut();
    }
    dispatch(resetUser());
    dispatch(resetProjects.cleanProjectsOnLogout());
  } catch (error) {
    dispatch(errorOn(error));
  } finally {
    dispatch(loaderOff());
  }
};

export default LogOutOperation;

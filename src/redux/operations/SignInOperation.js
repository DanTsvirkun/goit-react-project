import { googleSignIn } from "../actions/signInGoogleAction";
import { errorOn } from "../actions/errorActions";
import { loaderOff, loaderOn } from "../actions/loaderActions";

const SignInOperation = (result) => (dispatch) => {
  try {
    dispatch(loaderOn());
    dispatch(googleSignIn(result));
  } catch (error) {
    dispatch(errorOn(error));
  } finally {
    dispatch(loaderOff());
  }
};

export default SignInOperation;

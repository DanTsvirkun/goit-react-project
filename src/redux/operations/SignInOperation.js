import { googleSignIn } from "../actions/signInGoogleAction";
import { errorOn } from "../actions/errorActions";
import { loaderOff, loaderOn } from "../actions/loaderActions";

const SignInOperation = () => async (dispatch) => {
  try {
    dispatch(loaderOn());
    const GoogleAuth = await window.gapi.auth2.getAuthInstance();
    const result = await GoogleAuth.signIn();
    await dispatch(googleSignIn(result));
  } catch (error) {
    dispatch(errorOn(error));
  } finally {
    dispatch(loaderOff());
  }
};

export default SignInOperation;

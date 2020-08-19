import { createAction } from "@reduxjs/toolkit";

export const googleSignIn = createAction("@auth/google", (payload) => ({
  payload: { email: payload.Qt.zu, uid: payload.uc.access_token },
}));

import {
  createReducer
} from "@reduxjs/toolkit";
import {
  loaderOn,
  loaderOff
} from "../actions/loaderActions";

export const loader = createReducer(false, {
  [loaderOn]: () => true,
  [loaderOff]: () => false,
<<<<<<< HEAD
});
=======
});
>>>>>>> 09a0d97f097524cfdd4c25921df954eb1f6a7335

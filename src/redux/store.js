import {
  configureStore,
  getDefaultMiddleware,
  combineReducers,
} from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { rootReducer } from "./reducers/root";

const persistConfig = {
  key: "token",
  storage,
  whitelist: ["token"],
};

const defaultMiddleware = getDefaultMiddleware({
  serializableCheck: {
    ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
  },
});

const store = configureStore({
  reducer: { rootReducer /* auth: persistReducer(persistConfig, auth) */ },
  middleware: [...defaultMiddleware, thunk],
});

export const persistor = persistStore(store);
export default store;

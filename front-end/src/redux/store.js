import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userEventsReducer from "./features/eventSlice";
import authSlice from './features/authSlice';
import compliance  from "./features/complianceSlice";
import storage from "redux-persist/lib/storage"
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

const persistConfig = {
  key: 'persist-key',
  storage
};

const rootReducers =combineReducers({
  userEvents: userEventsReducer,
  auth: authSlice,
  compliance: compliance,
});

const persistedReducer = persistReducer(persistConfig, rootReducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);




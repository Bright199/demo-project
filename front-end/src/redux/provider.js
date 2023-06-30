"use client";

import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./store";
import { Provider } from "react-redux";


export function ReduxProvider({ children }) {
  return (  
    <Provider store={store}>
      <PersistGate persistor={persistor}>{children}</PersistGate>
    </Provider>
  );
}

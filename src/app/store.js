import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { ipAddressAPI } from "../services/ipServices";

export const store = configureStore({
  reducer: {
    [ipAddressAPI.reducerPath]: ipAddressAPI.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(ipAddressAPI.middleware),
});

setupListeners(store.dispatch);

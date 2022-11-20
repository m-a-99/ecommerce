import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import cartrecucer from "./cart";
import userInforeducer from "./userInfo";

const store = () =>
  configureStore({
    reducer: {
      userInfo: userInforeducer,
      cart: cartrecucer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
  });

// export default the store

export type StoreType = ReturnType<typeof store>;

export type RootState = ReturnType<StoreType["getState"]>;
export type AppDispatch = ReturnType<StoreType["dispatch"]>;

export  const storeWrapper = createWrapper<StoreType>(store);
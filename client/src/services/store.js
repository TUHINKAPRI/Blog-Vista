import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import persistReducer from "redux-persist/es/persistReducer";
import storage from "redux-persist/lib/storage";
import { persistStore } from "redux-persist";
import themeSlice from "./slices/themeSlice";
import categorySlice from "./slices/categorySlice";
import postSlice from "./slices/postSlice";
import userSlice from "./slices/userSlice";
import commentsSlice from './slices/commentSlice'
const rootReducer = combineReducers({
  auth: authSlice,
  theme:themeSlice,
  category: categorySlice,
  post:postSlice,
  users:userSlice,
  comments:commentsSlice
});
const persistConfig = {
  key: "root",
  storage,
};
const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});


export const persistor=persistStore(store)

import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import thunk from 'redux-thunk';

import uiSlice from "./slices/ui-slice";
import cartSlice from "./slices/cart-slice";
import userReducer from "./slices/user-slice";

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['userReducer']
}

const rootReducer = combineReducers({ 
  uiReducer: uiSlice.reducer,
  cartReducer: cartSlice.reducer,
  userReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk]
})

export const persistor = persistStore(store);
export default store;
import { configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import { combineReducers } from 'redux';
import invoicesSlice from './reducers/invoicesSlice';

const reducers = combineReducers({
  invoices: invoicesSlice
});

const persistConfig = {
  key: 'secondary',
  version: 1,
  storage
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware({
    serializableCheck: false,
  })
});

export default store;

console.log('Initial state', store.getState());

store.subscribe(() => {
  console.log('Updated state', store.getState());
});
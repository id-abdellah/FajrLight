import { configureStore } from '@reduxjs/toolkit';

// persistence stuff
import { persistReducer, persistStore } from "redux-persist"
import storage from "redux-persist/lib/storage"

// settings slice
import settings from './slices/settings';


const persistConfig = {
  key: "fajrlight",
  storage
}


const persistedReducer = persistReducer(persistConfig, settings)


export const store = configureStore({
  reducer: {
    settings: persistedReducer
  },
  devTools: true,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false
  })
});

export const persistor = persistStore(store)

export type RooteState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

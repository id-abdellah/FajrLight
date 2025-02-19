import { configureStore } from '@reduxjs/toolkit';

import settings from './slices/settings';

export const store = configureStore({
  reducer: {
    settings,
  },
  devTools: true,
});

export type RooteState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

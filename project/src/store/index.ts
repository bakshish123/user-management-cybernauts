import { configureStore } from '@reduxjs/toolkit';
import usersReducer from './slices/usersSlice';
import flowReducer from './slices/flowSlice';

export const store = configureStore({
  reducer: {
    users: usersReducer,
    flow: flowReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
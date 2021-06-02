import { configureStore } from '@reduxjs/toolkit';
import tasksReducer from './reducers/taskSlice';

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
  },
});

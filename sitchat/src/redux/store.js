import { configureStore } from '@reduxjs/toolkit';
import evaluationReducer from './slices/evaluationSlice';

export const store = configureStore({
  reducer: {
    evaluation: evaluationReducer,
  },
});

export default store;

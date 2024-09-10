// redux/slices/evaluationSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { sendEvaluationToApi } from '../../services/evaluateService.js';

const initialState = {
  evaluationNumber: 0,  // 초기 상태 설정
  checkpoints: [],
  status: 'idle',
  error: null,
};

const evaluationSlice = createSlice({
  name: 'evaluation',
  initialState,
  reducers: {
    evaluationRequested(state) {
      state.status = 'loading';
    },
    evaluationReceived(state, action) {
      state.status = 'succeeded';

      if (typeof action.payload === 'string') {
        const parsedEvaluation = parseInt(action.payload, 10);
        state.evaluationNumber = isNaN(parsedEvaluation) ? null : parsedEvaluation;
      } else if (typeof action.payload.evaluation === 'string') {
        const parsedEvaluation = parseInt(action.payload.evaluation, 10);
        state.evaluationNumber = isNaN(parsedEvaluation) ? null : parsedEvaluation;
      } else {
        state.evaluationNumber = action.payload.evaluation;
      }

      state.checkpoints = action.payload.checkpoints || [];
    },
    evaluationFailed(state, action) {
      state.status = 'failed';
      state.error = action.payload;
    },
    setEvaluationNumber: (state, action) => {
      state.evaluationNumber = action.payload;
    },
    resetEvaluationNumber: (state) => {
      state.evaluationNumber = 0; // evaluationNumber를 0으로 초기화
    },
  },
});

export const {
  evaluationRequested,
  evaluationReceived,
  evaluationFailed,
  setEvaluationNumber,
  resetEvaluationNumber,
} = evaluationSlice.actions;

export default evaluationSlice.reducer;

export const sendEvaluationToApiThunk = (userMessage, gptMessage) => async (dispatch) => {
  dispatch(evaluationRequested());
  try {
    const evaluation = await sendEvaluationToApi(userMessage, gptMessage);
    dispatch(evaluationReceived(evaluation));
    return evaluation;
  } catch (error) {
    dispatch(evaluationFailed(error.toString()));
    return null;
  }
};

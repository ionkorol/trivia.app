import { createSlice } from "@reduxjs/toolkit";

const initialState: {
  score: number;
  totalQuestions: number;
  correctAnswers: number;
} = {
  score: 0,
  totalQuestions: 0,
  correctAnswers: 0,
};

const gameResultSlice = createSlice({
  name: "gameResult",
  initialState,
  reducers: {
    setScore: (state, action) => {
      state.score = action.payload;
    },
    incrementScore: (state, action) => {
      state.score += action.payload;
    },
    setTotalQuestions: (state, action) => {
      state.totalQuestions = action.payload;
    },
    setCorrectAnswers: (state, action) => {
      state.correctAnswers = action.payload;
    },
    incrementCorrectAnswers: (state) => {
      state.correctAnswers += 1;
    },
    clearResult: (state) => {
      state.score = 0;
      state.totalQuestions = 0;
      state.correctAnswers = 0;
    },
  },
});

export default gameResultSlice.reducer;
export const {
  setCorrectAnswers,
  setScore,
  setTotalQuestions,
  clearResult,
  incrementCorrectAnswers,
  incrementScore,
} = gameResultSlice.actions;

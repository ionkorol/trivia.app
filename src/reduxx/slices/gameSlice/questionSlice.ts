import { createSlice } from "@reduxjs/toolkit";
import { QuestionProp } from "utils/interfaces";

const initialState: {
  data: QuestionProp | null;
} = {
  data: null,
};

const gameQuestionSlice = createSlice({
  name: "gameQuestion",
  initialState,
  reducers: {
    setQuestion: (state, action) => {
      state.data = action.payload;
    },
    clearQuestion: (state) => {
      state.data = null;
    },
  },
});

export default gameQuestionSlice.reducer;
export const { setQuestion, clearQuestion } = gameQuestionSlice.actions;

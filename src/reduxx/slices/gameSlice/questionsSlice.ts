import {
  createAsyncThunk,
  createSlice,
  SerializedError,
} from "@reduxjs/toolkit";
import { QuestionProp } from "utils/interfaces";

const initialState: {
  loading: boolean;
  data: QuestionProp[];
  error: SerializedError | null;
} = {
  loading: false,
  data: [],
  error: null,
};

export const readGameQuestions = createAsyncThunk(
  "gameQuestions/read",
  async () => {
    const res = await fetch(
      "https://opentdb.com/api.php?amount=10&encode=url3986&type=multiple"
    );
    return (await res.json()).results as QuestionProp[];
  }
);

const gameQuestionsSlice = createSlice({
  name: "gameQuestions",
  initialState,
  reducers: {
    clearQuestions: (state) => {
      state.data = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(readGameQuestions.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(readGameQuestions.fulfilled, (state, action) => {
      state.data = action.payload;
      state.error = null;
      state.loading = false;
    });
    builder.addCase(readGameQuestions.rejected, (state, action) => {
      state.error = action.error;
      state.loading = false;
    });
  },
});

export default gameQuestionsSlice.reducer;

export const { clearQuestions } = gameQuestionsSlice.actions;

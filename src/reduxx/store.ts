import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { userReducer } from "reduxx/slices";
import {
  gameQuestionReducer,
  gameQuestionsReducer,
  gameResultReducer,
} from "./slices/gameSlice";

export const store = configureStore({
  reducer: {
    game: combineReducers({
      result: gameResultReducer,
      questions: gameQuestionsReducer,
      question: gameQuestionReducer,
    }),
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

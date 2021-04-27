import { AppDispatch } from "reduxx/store";
import { ResultsProp } from "utils/interfaces";
import { GAME_CLEAR_RESULTS, GAME_SET_RESULTS } from "./types";

export const setResults = (results: ResultsProp) => (dispatch: AppDispatch) => {
  dispatch({ type: GAME_SET_RESULTS, payload: results });
};

export const clearResults = () => (dispatch: AppDispatch) => {
  dispatch({ type: GAME_CLEAR_RESULTS, payload: null });
};

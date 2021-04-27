import { Reducer } from "redux";
import { GAME_CLEAR_RESULTS, GAME_SET_RESULTS } from "reduxx/actions/types";
import { ResultsProp } from "utils/interfaces";

const initialState = {
  results: null,
};

const userReducer: Reducer<
  {
    results: ResultsProp | null;
  },
  { type: string; payload: any }
> = (state = initialState, action) => {
  switch (action.type) {
    case GAME_SET_RESULTS:
      return {
        ...state,
        results: action.payload,
      };
    case GAME_CLEAR_RESULTS:
      return {
        ...state,
        results: null,
      };

    default:
      return state;
  }
};

export default userReducer;

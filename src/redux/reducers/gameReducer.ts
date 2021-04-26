import { Reducer } from "redux";
import { test } from "redux/actions/types";

const initialState = {
  category: null,
  rewardPointLoading: false,
  rewardPointError: null,
};

const userReducer: Reducer<
  {
    category: string | null;
    rewardPointLoading: boolean;
    rewardPointError: string | null;
  },
  { type: string; payload: any }
> = (state = initialState, action) => {
  switch (action.type) {
    case test:
      return {
        ...state,
        category: action.payload,
      };

    default:
      return state;
  }
};

export default userReducer;

import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import { gameReducer } from "reduxx/reducers";

const rootReducer = combineReducers({
  game: gameReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export default store;

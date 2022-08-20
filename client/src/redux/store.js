import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import adsReducer from "./adsRedux";
import initialState from "./initialState";
import usersReducer from "./usersRedux";

const subreducers = {
  ads: adsReducer,
  users: usersReducer,
};

const rootReducer = combineReducers(subreducers);

const store = createStore(
  rootReducer,
  initialState,
  compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;

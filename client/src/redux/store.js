import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import adsReducer from "./adsRedux";
import usersReducer from "./usersRedux";

const subreducers = {
  ads: adsReducer,
  user: usersReducer,
};

const rootReducer = combineReducers(subreducers);

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;

import { createStore, combineReducers, applyMiddleware } from "redux";
import HomepageReducer from "../Reducers/Homepage_Reducer/HomepageReducer";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { logger } from "redux-logger";
let allReducers = combineReducers({
  HomepageReducer,
});
let GlobalStore = createStore(
  allReducers,
  composeWithDevTools(applyMiddleware(logger, thunk))
);
export default GlobalStore;

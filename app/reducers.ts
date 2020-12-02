/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";

import history from "utils/history";

import finalFormReducer from "finalForm/finalFormDuck";
import authenticationReducer from "containers/Authentication/reducer";

/**
 * Merges the main reducer with the router state and dynamically injected reducers
 */
export default function createReducer(injectedReducers = {}) {
  const rootReducer = combineReducers({
    router: connectRouter(history),
    finalForm: finalFormReducer,
    authentication: authenticationReducer,

    ...injectedReducers,
  });

  return rootReducer;
}

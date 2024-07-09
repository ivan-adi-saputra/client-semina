import {
  combineReducers,
  legacy_createStore as createStore,
  applyMiddleware,
  compose,
} from "redux";

import { thunk } from "redux-thunk";
import authReducer from "./auth/reducer";
import CategoriesReducer from "./categories/reducer";
import NotifReducer from "./notif/reducer";
import TalentsReducer from "./talents/reducer";
import PaymentsReducer from "./payments/reducer";

const composerEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducers = combineReducers({
  auth: authReducer,
  categories: CategoriesReducer,
  notif: NotifReducer,
  talents: TalentsReducer,
  payments: PaymentsReducer,
});
const store = createStore(
  rootReducers,
  composerEnhancer(applyMiddleware(thunk))
);

export default store;

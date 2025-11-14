import { createStore, combineReducers } from "redux";
import bookingReducer from "./reducers/bookingReducer";  // Your existing reducer
import authReducer from "./reducers/authReducer";  // Authentication reducer

// Combine all reducers
const rootReducer = combineReducers({
  main: bookingReducer,  // Renaming your existing reducer
  auth: authReducer  // Adding authReducer for JWT token management
});

// Create Redux store
const store = createStore(rootReducer);

export default store;

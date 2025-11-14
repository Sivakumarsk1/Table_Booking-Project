import { ADD_BOOKING, CANCEL_BOOKING } from "../actions/bookingActions";

const initialState = {
  bookings: [], // Stores booking details: [{ id, table, date, time }]
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_BOOKING:
      return { ...state, bookings: [...state.bookings, action.payload] };
    case CANCEL_BOOKING:
      return { ...state, bookings: [] };
    default:
      return state;
  }
};

export default reducer;

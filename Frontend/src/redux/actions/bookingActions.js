export const ADD_BOOKING = "ADD_BOOKING";
export const CANCEL_BOOKING = "CANCEL_BOOKING";

export const addBooking = (booking) => ({
  type: ADD_BOOKING,
  payload: booking,
});

export const cancelBooking = (id) => ({
  type: CANCEL_BOOKING,
  payload: id,
});

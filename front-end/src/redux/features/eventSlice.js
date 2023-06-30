import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    events: [
    ],
  },
};
export const userEvents = createSlice({
  name: "userEvents",
  initialState,

  // these are mutations
  reducers: {
    createEvent(state, action) {
      state.value.events.push(action.payload);
    },
  },
});

export default userEvents.reducer;
export const { createEvent } = userEvents.actions;

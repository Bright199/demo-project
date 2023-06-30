import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    userToken: null,
  },
};

export const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    authenticateUser: (state, action) => {
      state.value.userToken = action.payload;
    },
    logoutUser: (state) => {
      state.value.userToken = null;
    },
  },
});

export const { authenticateUser, logoutUser } = authSlice.actions;
export default authSlice.reducer

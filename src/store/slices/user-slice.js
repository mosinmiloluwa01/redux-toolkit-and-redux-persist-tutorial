import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "ui",
  initialState: { isLoggedIn: false, token: null},
  reducers: {
    updateUserToken: (state, action) => { state.token = action.payload.token},
  }
})

export const userActions = userSlice.actions;
export default userSlice.reducer;
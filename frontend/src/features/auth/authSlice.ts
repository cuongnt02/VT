import type User from "@/data/model/user";
import { createSlice } from "@reduxjs/toolkit";

export interface UserState {
  value: User | null;
  type: "anonymous" | "logged_in";
}

const initialState: UserState = {
  value: null,
  type: "anonymous",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state) => {
      state.value;
    },
  },
});

import { createSlice } from "@reduxjs/toolkit";
import type { UserInfo } from "../../models/user.model";
import {
  clearLocalStorage,
  persistLocalStorage,
} from "../../helpers/localStorage.helper";
import { Roles } from "../../models/roles";

export const EmptyUserState: UserInfo = {
  id: "",
  name: "",
  email: "",
  role: Roles.GUEST,
};

export const UserKey = "user";

export const userSlice = createSlice({
  name: "user",
  initialState: localStorage.getItem(UserKey)
    ? JSON.parse(localStorage.getItem(UserKey) as string)
    : EmptyUserState,
  reducers: {
    createUser: (_state, action) => {
      persistLocalStorage<UserInfo>(UserKey, action.payload);
      return action.payload;
    },
    updateUser: (state, action) => {
      const result = { ...state, ...action.payload };
      persistLocalStorage<UserInfo>(UserKey, result);
      return result;
    },
    resetUser: () => {
      clearLocalStorage(UserKey);
      return EmptyUserState;
    },
  },
});

export const { createUser, updateUser, resetUser } = userSlice.actions;

export default userSlice.reducer;

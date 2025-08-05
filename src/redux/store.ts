import { configureStore } from "@reduxjs/toolkit";
import type { UserInfo } from "../models/user.model";
import { userSlice } from "./states/user";

export interface AppStore {
  user: UserInfo;
}

export default configureStore<AppStore>({
  reducer: {
    user: userSlice.reducer,
  },
});

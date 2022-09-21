import {configureStore} from "@reduxjs/toolkit";
import profile from "./modules/profile";

export default configureStore({
  reducer: {
    profile: profile.reducer,
  }
});
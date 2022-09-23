import {configureStore} from "@reduxjs/toolkit";
import profile from "./modules/profile";
import member from "./modules/member";
import social from "./modules/social";

export default configureStore({
  reducer: {
    profile: profile.reducer,
    member: member.reducer,
    social: social.reducer,
  }
});
import {configureStore} from "@reduxjs/toolkit";
import profile from "./modules/profile";
import member from "./modules/member";
import social from "./modules/social";
import promise from "./modules/promise";
import detailPromise from "./modules/detailPromise";
import searchMember from "./modules/searchMember";
import checkIn from "./modules/checkIn";
import chat from "./modules/chat";
import weather from "./modules/weather";

export default configureStore({
  reducer: {
    profile: profile.reducer,
    member: member.reducer,
    social: social.reducer,
    promise: promise.reducer,
    detailPromise: detailPromise.reducer,
    searchMember: searchMember.reducer,
    checkIn:checkIn.reducer,
    chat:chat.reducer,
    weather:weather.reducer,
  }
});
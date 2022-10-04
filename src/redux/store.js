import {configureStore} from "@reduxjs/toolkit";
import profile from "./modules/profile";
import member from "./modules/member";
import social from "./modules/social";
import promise from "./modules/promise";
import detailPromise from "./modules/detailPromise";
import searchMember from "./modules/searchMember";
import checkIn from "./modules/checkIn";
import chat from "./modules/chat";
import donation from "./modules/donation";
import detailDonation from "./modules/detailDonation";

export default configureStore({
  reducer: {
    // 프로필 내용
    profile: profile.reducer,
    // 친구목록
    member: member.reducer,
    // 소셜로그인시 (닉네임, 휴대폰 번호 조회용)
    social: social.reducer,
    // 약속 리스트
    promise: promise.reducer,
    // 약속 상세보기
    detailPromise: detailPromise.reducer,
    // 친구추가 목록에서 검색
    searchMember: searchMember.reducer,
    // 체크인 버튼 결과창
    checkIn:checkIn.reducer,
    // 채팅 내역 받아오기
    chat:chat.reducer,
    // 재능기부 리스트
    donation: donation.reducer,
    // 재능기부 상세보기
    detailDonation: detailDonation.reducer,
  }
});
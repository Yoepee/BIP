import { Route, Routes, useNavigate } from "react-router-dom"
import SignUpNickname from "../pages/signup/SignUpNickname"
import SignUp from "../pages/signup/SignUp"
import SignUpEmail from "../pages/signup/SignUpEmail"
import ProfilePage from "../pages/profile/ProfilePage"
import EditProfilePage from "../pages/profile/EditProfilePage"
import DetailProfilePage from "../pages/profile/DetailProfilePage"
import MainPage from "../pages/MainPage"
import IntroPage from "../pages/IntroPage"
import MemberPage from "../pages/MemberPage"
import AddPromisePage from "../pages/promise/AddPromisePage"
import DetailPromisePage from "../pages/promise/DetailPromisePage"
import SignUpChange from "../pages/signup/SignUpChange"
import KakaoPage from "../pages/signup/KakaoPage"
import NaverPage from "../pages/signup/NaverPage"
import PromiseLeaderPage from "../pages/promise/PromiseLeaderPage"
import AddCreditPage from "../pages/profile/AddCreditPage"
import ChatPage from "../pages/ChatPage"
import DonationPage from "../pages/donation/DonationPage"
import AddDonationPage from "../pages/donation/AddDonationPage"
import DetailDonationPage from "../pages/donation/DetailDonationPage"
import MonthlyPage from "../pages/MonthlyPage"
import { useEffect } from "react"
import axios from "axios"
import { useDispatch, useSelector } from "react-redux"
import { __getLogin } from "../redux/modules/login"
import MyHistoryPage from "../pages/profile/MyHistoryPage"



const Router = () => {
    // const dispatch = useDispatch();
    // const navigate = useNavigate();
    // let isLogin = useSelector((state) => state.login)
    useEffect(() => {
        // dispatch(__getLogin());
        __isToken();
    }, [])
    // useEffect(() => {
    //     let a = window.location.href.split("/")
    //     if (a[a.length - 1] !== "login" && a[a.length - 1] !== "signup" && a[a.length - 1] !== "intro") {
    //         if (localStorage.getItem("Authorization") === null) {
    //             navigate("/intro")
    //         }
    //         if (localStorage.getItem("RefreshToken") === null) {
    //             navigate("/intro")
    //         }
    //         if (localStorage.getItem("name") === null) {
    //             navigate("/intro")
    //         }
    //     }
    // }, [])
    const __isToken = async () => {
        let isToken = await axios.get(process.env.REACT_APP_SERVER_HOST + `/api/member/reissue`, {
            headers: {
                Authorization: localStorage.getItem('Authorization'),
                RefreshToken: localStorage.getItem('RefreshToken'),
            }
        }
        ).then((res) => {
            console.log(res)
            localStorage.setItem("Authorization", res.headers.authorization);
            localStorage.setItem("RefreshToken", res.headers.refreshtoken);
        })
    }
    // console.log(isLogin)
    return (
        <Routes>
            {/* 메인페이지 */}
            <Route path="/" exact element={<MainPage />} />
            <Route path="/monthly" exact element={<MonthlyPage />} />
            {/* 시작페이지 */}
            <Route path="/intro" exact element={<IntroPage />} />
            {/* 회원가입 */}
            <Route path="/signup" exact element={<SignUp />} />
            {/* 전화번호 변경시 이메일 로그인 */}
            <Route path="/signup/email" exact element={<SignUpEmail />} />
            {/* 닉네임 설정이 안된 계정 닉네임 설정 페이지 */}
            <Route path="/signup/nickname" exact element={<SignUpNickname />} />
            {/* 카카오 최초 로그인시 휴대폰 번호 설정하도록, 이메일 계정시에는 별도 동작 */}
            <Route path="/signup/change/:type" exact element={<SignUpChange />} />
            {/* 친구목록 */}
            <Route path="/member" exact element={<MemberPage />} />
            {/* 약속 멤버 초대하기 */}
            <Route path="/member/invite:id" exact element={<MemberPage />} />
            {/* 친구 신용도 점수 주기 기능 */}
            <Route path="/member/add:add" exact element={<MemberPage />} />
            {/* 마이페이지 */}
            <Route path="/profile" exact element={<ProfilePage />} />
            {/* 프로필 상세페이지 */}
            <Route path="/detailprofile" exact element={<DetailProfilePage />} />
            {/* 프로필 수정 */}
            <Route path="/editprofile/:type" exact element={<EditProfilePage />} />
            {/* 내역보기 */}
            <Route path="/profile/history/:type" exact element={<MyHistoryPage />} />
            {/* 신용도 구매 */}
            <Route path="/addcredit" exact element={<AddCreditPage />} />
            {/* 약속잡기 */}
            <Route path="/addpromise" exact element={<AddPromisePage />} />
            {/* 약속 수정하기 */}
            <Route path="/addpromise/edit:id" exact element={<AddPromisePage />} />
            {/* 약속 상세보기 */}
            <Route path="/detailpromise/:id" exact element={<DetailPromisePage />} />
            {/* 약속 방장권한 기능 */}
            <Route path="/promiseleader/id=:id/type=:type" exact element={<PromiseLeaderPage />} />
            {/* 재능기부 */}
            <Route path="/donation" exact element={<DonationPage />} />
            {/* 재능기부 추가 */}
            <Route path="/adddonation" exact element={<AddDonationPage />} />
            {/* 재능기부 수정 */}
            <Route path="/adddonation/edit:id" exact element={<AddDonationPage />} />
            {/* 재능기부 상세페이지 */}
            <Route path="/detaildonation/:id" exact element={<DetailDonationPage />} />
            {/* 소셜로그인 */}
            <Route path="/login/kakao" exact element={<KakaoPage />} />
            <Route path="/login/naver" exact element={<NaverPage />} />
            {/* 채팅 */}
            <Route path="/chat/:id" exact element={<ChatPage />} />
            {/* 없는 페이지 */}
            <Route path="*" element={<div>404 Not Found</div>} />
        </Routes>
    )
}

export default Router;
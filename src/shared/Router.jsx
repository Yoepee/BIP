import { Route, Routes } from "react-router-dom"
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
import AddMemberPage from "../pages/AddMemberPage"
import KakaoPage from "../pages/signup/KakaoPage"
import NaverPage from "../pages/signup/NaverPage"
import PromiseLeaderPage from "../pages/promise/PromiseLeaderPage"
import AddCreditPage from "../pages/profile/AddCreditPage"



const Router = () =>{
    return (
        <Routes>
            {/* 메인페이지 */}
            <Route path="/" element={<MainPage/>}/>
            {/* 시작페이지 */}
            <Route path="/intro" element={<IntroPage/>}/>
            {/* 회원가입 */}
            <Route path="/signup" element={<SignUp/>}/>
            <Route path="/signup/email" element={<SignUpEmail/>}/>
            <Route path="/signup/nickname" element={<SignUpNickname/>}/>
            <Route path="/signup/change" element={<SignUpChange/>}/>
            {/* 친구목록 */}
            <Route path="/member" element={<MemberPage/>}/>
            <Route path="/member/invite:id" element={<MemberPage/>}/>
            <Route path="/member/add:add" element={<MemberPage/>}/>
            <Route path="/addmember/:type" element={<AddMemberPage/>}/>
            {/* 마이페이지 */}
            <Route path="/profile" exact element={<ProfilePage/>}/>
            <Route path="/detailprofile" exact element={<DetailProfilePage/>}/>
            <Route path="/editprofile/:type" exact element={<EditProfilePage/>}/>
            <Route path="/addcredit" exact element={<AddCreditPage/>}/>
            {/* 약속잡기 */}
            <Route path="/addpromise" exact element={<AddPromisePage/>}/>
            <Route path="/addpromise/edit:id" exact element={<AddPromisePage/>}/>
            <Route path="/detailpromise/:id" exact element={<DetailPromisePage/>}/>
            <Route path="/promiseleader/id=:id/type=:type" exact element={<PromiseLeaderPage/>}/>
            {/* 소셜로그인 */}
            <Route path="/login/kakao" exact element={<KakaoPage/>}/>
            <Route path="/login/naver" exact element={<NaverPage/>}/>
        </Routes>
    )
}

export default Router;
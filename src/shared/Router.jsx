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
import AddPromisePage from "../pages/AddPromisePage"



const Router = () =>{
    return (
        <Routes>
            <Route path="/" element={<MainPage/>}/>
            <Route path="/intro" element={<IntroPage/>}/>
            <Route path="/signup" element={<SignUp/>}/>
            <Route path="/signup/email" element={<SignUpEmail/>}/>
            <Route path="/signup/email/nickname" element={<SignUpNickname/>}/>
            <Route path="/member" element={<MemberPage/>}/>
            <Route path="/profile" exact element={<ProfilePage/>}/>
            <Route path="/detailprofile" exact element={<DetailProfilePage/>}/>
            <Route path="/editprofile/:type" exact element={<EditProfilePage/>}/>
            <Route path="/addpromise" exact element={<AddPromisePage/>}/>
        </Routes>
    )
}

export default Router;
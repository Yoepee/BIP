import { Route, Routes } from "react-router-dom"
import NicknameSet from "../pages/NicknameSet"
import SignUp from "../pages/SignUp"
import SignUpEmail from "../pages/SignUpEmail"
import ProfilePage from "../pages/profile/ProfilePage"
import EditProfilePage from "../pages/profile/EditProfilePage"
import DetailProfilePage from "../pages/profile/DetailProfilePage"
import MainPage from "../pages/MainPage"

const Router = () =>{
    return (
        <Routes>
            <Route path="/" element={<MainPage/>}/>
            <Route path="/profile" exact element={<ProfilePage/>}/>
            <Route path="/detailprofile" exact element={<DetailProfilePage/>}/>
            <Route path="/editprofile/:type" exact element={<EditProfilePage/>}/>
            <Route path="/sign_up" element={<SignUp/>}/>
            <Route path="/sign_up/email" element={<SignUpEmail/>}/>
            <Route path="/sign_up/email/nickname_set" element={<NicknameSet/>}/>
        </Routes>
    )
}

export default Router;
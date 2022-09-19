import { Route, Routes } from "react-router-dom"
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
        </Routes>
    )
}

export default Router;
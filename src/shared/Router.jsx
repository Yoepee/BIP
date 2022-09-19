import { Route, Routes } from "react-router-dom"
import ProfilePage from "../pages/profile/ProfilePage"
import DetailProfilePage from "../pages/profile/DetailProfile"
import EditProfilePage from "../pages/profile/EditProfilePage"

const Router = () =>{
    return (
        <Routes>
            <Route path="/" element={<div>헬로ㅇㅇ</div>}/>
            <Route path="/profile" element={<ProfilePage/>}>
                <Route path="detail" element={<DetailProfilePage/>}/>
                <Route path="edit" element={<EditProfilePage/>}/>
            </Route>
        </Routes>
    )
}

export default Router;
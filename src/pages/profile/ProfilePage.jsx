import { useState } from "react";
import { Outlet } from "react-router-dom";
import Profile from "../../components/profile/Profile";

const ProfilePage = () =>{
    return (
        <div>
            <>
            <div>나는 머리</div>
            <Profile/>
            <div>나는 메뉴</div>
            <div>나는 푸터</div>
            <Outlet></Outlet>
            </>
        </div>
    )
}

export default ProfilePage;
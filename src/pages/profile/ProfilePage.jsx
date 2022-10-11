import Profile from "../../components/profile/Profile";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import ProfileMenu from "../../components/profile/ProfileMenu";
import WebHeader from "../../components/header/WebHeader";
import styled from "styled-components";



// 프로필 페이지
const ProfilePage = () =>{
    return (
        <>
        <div style={{display:"flex"}}>
            <WebHeader />
            {/* 프로필 헤더 옵션 - 6 */}
            <Header head={"프로필"} option={6}/>
        </div>            
            {/* 프로필 내역보기  */}
            <Profile/>
            {/* 신용점수 구매 */}
            <ProfileMenu/>
            {/* 푸터 무시공간 */}
            <div style={{height:"50px"}}></div>
            {/* 푸터 */}
            <Footer foot={3}/>
        </>
    )
}

export default ProfilePage;

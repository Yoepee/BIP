import Profile from "../../components/profile/Profile";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import ProfileMenu from "../../components/profile/ProfileMenu";

const ProfilePage = () =>{
    return (
        <div>
            <>
            <Header  head={"프로필"} option={6}/>
            <Profile/>
            <ProfileMenu/>
            <div style={{height:"50px"}}></div>
            <Footer foot={2}/>
            </>
        </div>
    )
}

export default ProfilePage;
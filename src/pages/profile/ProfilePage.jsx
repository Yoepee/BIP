import Profile from "../../components/profile/Profile";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";

const ProfilePage = () =>{
    return (
        <div>
            <>
            <Header head={"프로필"}/>
            <Profile/>
            <div>나는 메뉴</div>
            <Footer foot={2}/>
            </>
        </div>
    )
}

export default ProfilePage;
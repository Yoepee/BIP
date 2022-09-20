import Profile from "../../components/profile/Profile";
import Footer from "../../components/footer/Footer";

const ProfilePage = () =>{
    return (
        <div>
            <>
            <div>나는 머리</div>
            <Profile/>
            <div>나는 메뉴</div>
            <Footer foot={2}/>
            </>
        </div>
    )
}

export default ProfilePage;
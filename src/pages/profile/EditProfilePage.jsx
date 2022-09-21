import { useParams } from "react-router-dom"
import ProEditPicture from "../../components/editprofile/ProEditPicture"
import ProEditText from "../../components/editprofile/ProEditText"
import Header from "../../components/header/Header";

const EditProfilePage = () => {
    const {type} = useParams();
    return (
        <div>
            <Header head={"프로필 수정"} option={1} submit={"name"}/>
            <div>
                {type==="picture"?
                <ProEditPicture/>
                :<ProEditText/>
                }
            </div>
        </div>
    )
}

export default EditProfilePage
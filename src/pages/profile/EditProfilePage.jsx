import { useParams } from "react-router-dom"
import ProEditPicture from "../../components/editprofile/ProEditPicture"
import ProEditText from "../../components/editprofile/ProEditText"

const EditProfilePage = () => {
    const {type} = useParams();
    return (
        <div>
            <div style={{display:"flex"}}>
                <p>프로필 수정</p>
            </div>
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
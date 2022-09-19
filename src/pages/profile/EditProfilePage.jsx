import base from "../../img/baseProfile.jpg"

const EditProfilePage = () => {
    return (
        <div>
            <div>프로필 수정</div>
            <div>
                <img src={base} width="20%" style={{margin:"20px", borderRadius:"50%"}}/>
            </div>
            <div> 닉네임수정 </div>
        </div>
    )
}

export default EditProfilePage
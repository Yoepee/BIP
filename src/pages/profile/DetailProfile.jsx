import base from "../../img/baseProfile.jpg"

const DetailProfile = () =>{
    return (
        <div>
            <div>프로필 자세히보기</div>
            <div>
                <img src={base} width="20%" style={{margin:"20px", borderRadius:"50%"}}/>
            </div>
            <div>닉네임</div>
        </div>
    )
}

export default DetailProfile;
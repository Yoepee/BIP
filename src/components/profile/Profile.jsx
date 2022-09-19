import { useNavigate } from "react-router-dom"
import styled from "styled-components"
import base from "../../img/baseProfile.jpg"
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';

const Profile = () => {
    const navigate = useNavigate();
    return (
        <div>
        <Prodiv onClick={()=>{navigate("/detailprofile")}}>
                <img src={base} width="20%" style={{margin:"20px", borderRadius:"50%"}}/>
                <div>
                    <p>이름</p>
                </div>
                <div style={{marginLeft:"auto", alignItems:"center", display:"flex"}}>
                    <p><ArrowForwardIosRoundedIcon/></p>
                </div>
            </Prodiv>
        <div>
            <p>점수, 신용도, 약속 이행</p>
        </div>
        <div>
            <p>활동 내역</p>
        </div>
        </div>
    )
}

export default Profile;

const Prodiv = styled.div`
display:flex;

`
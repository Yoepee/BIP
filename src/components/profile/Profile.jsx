import { useNavigate } from "react-router-dom"
import styled from "styled-components"
import base from "../../img/baseProfile.jpg"
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';

const Profile = () => {
    const navigate = useNavigate();
    return (
        <Prodiv onClick={()=>{navigate("/profile/detail")}}>
                <img src={base} width="20%" style={{margin:"20px", borderRadius:"50%"}}/>
                <div>
                    <p>이름</p>
                    <p>설명</p>
                </div>
                <div style={{marginLeft:"auto", alignItems:"center", display:"flex"}}>
                    <p><ArrowForwardIosRoundedIcon/></p>
                </div>
            </Prodiv>
    )
}

export default Profile;

const Prodiv = styled.div`
display:flex;

`
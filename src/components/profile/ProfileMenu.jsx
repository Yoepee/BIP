import { useNavigate } from "react-router-dom";
import styled from "styled-components"

const ProfileMenu = () =>{
  const navigate = useNavigate();
  return (
    <div>
        <div onClick={()=>{navigate("/addcredit")}}>
            <p style={{marginLeft:"10%"}}>신용점수 구매</p>
        </div>
    </div>
  )
}

export default ProfileMenu;


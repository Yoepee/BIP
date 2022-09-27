import { useNavigate } from "react-router-dom";

const ProfileMenu = () =>{
  const navigate = useNavigate();
  return (
    <div>
        <div onClick={()=>{navigate("/addcredit")}}>
            <p>신용점수 구매</p>
        </div>
    </div>
  )
}

export default ProfileMenu;
import { useNavigate } from "react-router-dom";

// 신용점수 구매 메뉴 (활동내역 옮길 예정)
const ProfileMenu = () =>{
  const navigate = useNavigate();
  return (
    <div>
      {/* 신용구매 페이지로 이동 */}
        <div onClick={()=>{navigate("/addcredit")}}>
            <p style={{marginLeft:"10%", cursor:"pointer"}}>신용점수 구매</p>
        </div>
    </div>
  )
}

export default ProfileMenu;


import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Footer = () =>{
  const navigate = useNavigate();
  return (
    <div style={{display:"flex"}}>
        <div onClick={()=>{navigate("/")}}>
          1번메뉴
        </div>
        <div onClick={()=>{navigate("/member")}}>
          2번메뉴
        </div>
        <div onClick={()=>{navigate("/profile")}}>
          3번메뉴
        </div>
        <div onClick={()=>{navigate("/intro")}}>
          4번메뉴
        </div>
    </div>
  )
}

export default Footer;
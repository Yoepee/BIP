import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import HomeIcon from '@mui/icons-material/Home';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';

import GroupIcon from '@mui/icons-material/Group';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';

import PermContactCalendarIcon from '@mui/icons-material/PermContactCalendar';
import PermContactCalendarOutlinedIcon from '@mui/icons-material/PermContactCalendarOutlined';

import SettingsIcon from '@mui/icons-material/Settings';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
const Footer = ({foot}) =>{
  const navigate = useNavigate();
  return (
    <Menu>
        <div onClick={()=>{navigate("/")}} style={{textAlign:"center"}}>
          {foot===0?
          <p style={{color:"#A67EED"}}><HomeIcon/></p>
          :<p style={{color:"#A67EED"}}><HomeOutlinedIcon/></p>}
          {/* <p>약속</p> */}
        </div>
        <div onClick={()=>{navigate("/member")}} style={{textAlign:"center"}}>
        {foot===1?
        <p style={{color:"#A67EED"}}><GroupIcon/></p>
        :<p style={{color:"#A67EED"}}><GroupOutlinedIcon/></p>}
          {/* <p>친구</p> */}
        </div>
        <div onClick={()=>{navigate("/profile")}} style={{textAlign:"center"}}>
        {foot===2?
        <p style={{color:"#A67EED"}}><PermContactCalendarIcon/></p>
        :<p style={{color:"#A67EED"}}><PermContactCalendarOutlinedIcon/></p>}
          {/* <p>프로필</p> */}
        </div>
        {/* <div onClick={()=>{navigate("/intro")}} style={{textAlign:"center"}}>
        {foot===3?
        <p><SettingsIcon/></p>
        :<p><SettingsOutlinedIcon/></p>}
          <p>테스트</p>
        </div> */}
    </Menu>
  )
}

export default Footer;

const Menu = styled.div`
width:100%;
display:grid;
grid-template-columns: repeat(3,1fr);
place-items: center;
position:fixed;
bottom:0;
background-color: white;

@media screen and (min-width: 769px) {
    background-color: transparent;
    width: 200px;
    height: 10%;
    position: fixed;
    top: 0;
    right: 5%;
    z-index: 100;
  }
`
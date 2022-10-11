import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import HomeIcon from '@mui/icons-material/Home';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';

import GroupIcon from '@mui/icons-material/Group';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';

import PermContactCalendarIcon from '@mui/icons-material/PermContactCalendar';
import PermContactCalendarOutlinedIcon from '@mui/icons-material/PermContactCalendarOutlined';

import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import VolunteerActivismOutlinedIcon from '@mui/icons-material/VolunteerActivismOutlined';
// 푸터 선택 숫자 (0,1,2,3 푸터메뉴 앞에서부터 숫자)
const Footer = ({ foot }) => {
  const navigate = useNavigate();
  return (
    <Menu>
      <div onClick={() => { navigate("/") }} style={{ textAlign: "center" }}>
        {/* 0번 메뉴시 아이콘 변경으로 활성화 표시 */}
        {foot === 0 ?
          <p style={{ color: "#6B68F3", cursor:"pointer" }}><HomeIcon /></p>
          : <p style={{ color: "#6B68F3", cursor:"pointer" }}><HomeOutlinedIcon /></p>}
        {/* <p>약속</p> */}
      </div>
      {/* 1번 메뉴시 아이콘 변경으로 활성화 표시 */}
      <div onClick={() => { navigate("/donation") }} style={{ textAlign: "center" }}>
        {foot === 1 ?
          <p style={{ color: "#6B68F3", cursor:"pointer" }}><VolunteerActivismIcon /></p>
          : <p style={{ color: "#6B68F3", cursor:"pointer" }}><VolunteerActivismOutlinedIcon /></p>}
        {/* <p>테스트</p> */}
      </div>
      <div onClick={() => { navigate("/member") }} style={{ textAlign: "center" }}>
        {/* 2번 메뉴시 아이콘 변경으로 활성화 표시 */}
        {foot === 2 ?
          <p style={{ color: "#6B68F3", cursor:"pointer" }}><GroupIcon /></p>
          : <p style={{ color: "#6B68F3", cursor:"pointer" }}><GroupOutlinedIcon /></p>}
        {/* <p>친구</p> */}
      </div>
      <div onClick={() => { navigate("/profile") }} style={{ textAlign: "center" }}>
        {/* 3번 메뉴시 아이콘 변경으로 활성화 표시 */}
        {foot === 3 ?
          <p style={{ color: "#6B68F3", cursor:"pointer" }}><PermContactCalendarIcon /></p>
          : <p style={{ color: "#6B68F3", cursor:"pointer" }}><PermContactCalendarOutlinedIcon /></p>}
        {/* <p>프로필</p> */}
      </div>
    </Menu>
  )
}

export default Footer;

const Menu = styled.div`
width:100%;
display:grid;
grid-template-columns: repeat(4,1fr);
place-items: center;
position:fixed;
bottom:0;
background-color: white;

@media screen and (min-width: 769px) {
    /* background-color: transparent;
    width: 200px;
    height: 10%;
    position: fixed;
    top: 0;
    right: 5%;
    z-index: 100; */
    display: none;
  }
`
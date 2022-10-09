import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import styled from "styled-components";

// 로그아웃
const Option6 = ({ head }) => {
  const navigate = useNavigate();

  const [chk, setChk] = useState(false);

  const logout = async () => {
    if (window.confirm("로그아웃 하시겠습니까?")) {
      const data = await axios.post(process.env.REACT_APP_SERVER_HOST + "/api/member/logout", null, {
        headers: {
          Authorization: localStorage.getItem('Authorization'),
          RefreshToken: localStorage.getItem('RefreshToken'),
        }
      }).then(async(response) => {
        console.log(response)
        if (response.data.success) {
          localStorage.removeItem('Authorization');
          localStorage.removeItem('RefreshToken');
          localStorage.removeItem('name');
          navigate("/intro")
        } else {
          if(response.data.data === "사용자를 찾을 수 없습니다."){
            const a = await axios.get(process.env.REACT_APP_SERVER_HOST + "/api/member/reissue", {
              headers: {
                Authorization: localStorage.getItem('Authorization'),
                RefreshToken: localStorage.getItem('RefreshToken'),
              }
            }).then((ress)=>{
              console.log(ress)
            })}
            else{
              alert(response.data.data)
            }
        }
      })
    } else {
      setChk(!chk);
    }
  }
  const quit = async() => {
    if (window.confirm("회원 탈퇴를 하시겠습니까?")) {
      const data = await axios.delete(process.env.REACT_APP_SERVER_HOST + "/api/user", {
        headers: {
          Authorization: localStorage.getItem('Authorization'),
          RefreshToken: localStorage.getItem('RefreshToken'),
        }
      }).then((response) => {
        if (response.data.success) {
          localStorage.removeItem('Authorization');
          localStorage.removeItem('RefreshToken');
          localStorage.removeItem('name');
          navigate("/intro")
        } else {
          alert(response.data.data)
        }
      })
    } else {
      setChk(!chk);
    }
  }
  return (
    <>
      <div style={{ marginLeft: "1%" }}>
        <p style={{fontWeight:"bold", fontSize:"20px"}}>{head}</p>

      </div>
      <div onClick={() => { setChk(!chk); }}
        style={{ marginLeft: "auto", marginRight: "2%" }}>
        <p><SettingsOutlinedIcon style={{color:"#A67EED"}}/></p>
      </div>
      {chk ?
        <div style={{
          width: "150px",
          position: "absolute",
          backgroundColor: "white",
          top: "50px", right: "20px",
          textAlign: "center",
          borderRadius: "5px",
          border: "1px solid black"
        }}>
          <OptionMenu
            onClick={() => { logout(); }}>로그아웃</OptionMenu>
          <OptionMenu
            onClick={() => { quit(); }}>회원 탈퇴</OptionMenu>
          <OptionMenu
            onClick={() => { setChk(!chk); }}>취소</OptionMenu>
        </div>
        : null
      }
    </>
  )
}

export default Option6;

const OptionMenu = styled.div`
padding: 3px;
cursor: pointer;
&:hover{
  background-color:#6D09D1;
  color:white;
}`

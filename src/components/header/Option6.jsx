import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import styled from "styled-components";
import Swal from "sweetalert2";

// 로그아웃
const Option6 = ({ head }) => {
  const navigate = useNavigate();

  const [chk, setChk] = useState(false);

  const __isToken = async () => {
    await axios.get(process.env.REACT_APP_SERVER_HOST + `/api/member/reissue`, {
      headers: {
        Authorization: localStorage.getItem('Authorization'),
        RefreshToken: localStorage.getItem('RefreshToken'),
      }
    }
    ).then((res) => {
      if (res.data.success) {
        localStorage.setItem("Authorization", res.headers.authorization);
        localStorage.setItem("RefreshToken", res.headers.refreshtoken);
      }
    })
  }

  const remove = async () => {
    const data = await axios.get(process.env.REACT_APP_SERVER_HOST + `/api/sse/delete`, {
        headers: {
            Authorization: localStorage.getItem('Authorization'),
            RefreshToken: localStorage.getItem('RefreshToken'),
        }
    }).then((res) => {
        console.log(res)
    })
}


  const logout = async () => {
    Swal.fire({
      title: `로그아웃 하시겠습니까?`,
      showCancelButton: true,
      confirmButtonColor: '#3E09D1',
      cancelButtonColor: 'tomato',
      confirmButtonText: '확인',
      cancelButtonText: '취소',
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axios.post(process.env.REACT_APP_SERVER_HOST + "/api/member/logout", null, {
          headers: {
            Authorization: localStorage.getItem('Authorization'),
            RefreshToken: localStorage.getItem('RefreshToken'),
          }
        }).then(async (response) => {
          console.log(response)
          if (response.data.success) {
            localStorage.removeItem('Authorization');
            localStorage.removeItem('RefreshToken');
            localStorage.removeItem('name');
            navigate("/intro")
            remove();
          }
        })
      } else {
        setChk(!chk);
      }
    })
  }
  const quit = async () => {
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
      <StHead style={{ marginLeft: "1%" }}>
        <p style={{ fontWeight: "bold", fontSize: "20px" }}>{head}</p>
      </StHead>
      <div onClick={() => { setChk(!chk); }}
        style={{ margin:"10px 5% 0 auto", cursor:"pointer" }}>
        <p><SettingsOutlinedIcon style={{ color: "#6B68F3" }} /></p>
      </div>
      {chk ?
        <div style={{
          width: "150px",
          position: "absolute",
          backgroundColor: "white",
          top: "50px", right: "20px",
          textAlign: "center",
          borderRadius: "5px",
          border: "1px solid #292929"
        }}>
          <OptionMenu
            onClick={() => { __isToken().then(() => { logout(); }) }}>로그아웃</OptionMenu>
          <OptionMenu
            onClick={() => { __isToken().then(() => { quit(); }) }}>회원 탈퇴</OptionMenu>
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
  background-color:#6B68F3;
  color: white;
}`

const StHead = styled.div`
  @media screen and (min-width: 769px) {
    display:none;
  }  
`
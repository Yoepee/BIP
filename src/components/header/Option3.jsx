import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import { useNavigate, useParams } from 'react-router-dom';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ManageAccountsRoundedIcon from '@mui/icons-material/ManageAccountsRounded';
import { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

// 약속상세보기 뒤로가기(홈) 제목 메뉴(방장-방장위임, 멤버 조정, 방장x- 약속나가기, 취소)
const Option3 = ({ head }) => {
  const navigate = useNavigate();
  const [chk, setChk] = useState(0);
  const [leader, setLeader] = useState(false);
  const { id } = useParams();

  const bangjang = async () => {
    let a = await axios.get(process.env.REACT_APP_SERVER_HOST + `/api/events/master/check/${id}`, {
      headers: {
        Authorization: localStorage.getItem('Authorization'),
        RefreshToken: localStorage.getItem('RefreshToken')
      }
    }).then((response) => {
      console.log(response);
      if (response.data.success) {
        if (response.data.data.nickname === localStorage.getItem("name"))
          setLeader(true);
      } else {
        return;
      }
    })
  }

  const exitPromist = async () => {
    if (window.confirm("약속을 나가시겠습니까?")) {
      const data = await axios.delete(process.env.REACT_APP_SERVER_HOST + `/api/events/exit/${id}`, {
        headers: {
          Authorization: localStorage.getItem('Authorization'),
          RefreshToken: localStorage.getItem('RefreshToken'),
        }
      }).then(async(response) => {
        if (response.data.success) {
          const chat = await axios.delete(process.env.REACT_APP_SERVER_HOST+`/api/chat/member/${id}`,{
            headers: {
              Authorization: localStorage.getItem('Authorization'),
              RefreshToken: localStorage.getItem('RefreshToken'),
            }
          })
          console.log(chat)
          navigate("/")
        } else {
          alert(response.data.data);
          setChk(0);
        }
      })
    } else {
      setChk(0);
    }
  }

  const removePromist = async () => {
    if (window.confirm("약속을 삭제하시겠습니까?")) {
      const data = await axios.delete(process.env.REACT_APP_SERVER_HOST + `/api/events/${id}`, {
        headers: {
          Authorization: localStorage.getItem('Authorization'),
          RefreshToken: localStorage.getItem('RefreshToken'),
        }
      }).then((response) => {
        if (response.data.success) {
          navigate("/")
        } else {
          alert(response.data.data);
          setChk(0);
        }
      })
    } else {
      setChk(0);
    }
  }
  const __endPromise = async() =>{
    if (window.confirm("약속을 마치시겠습니까?")) {
      const data = await axios.put(process.env.REACT_APP_SERVER_HOST + `/api/events/confirm/${id}`, null,{
        headers: {
          Authorization: localStorage.getItem('Authorization'),
          RefreshToken: localStorage.getItem('RefreshToken'),
        }
      }).then((response) => {
        console.log(response)
        if (response.data.success) {
          alert(response.data.data)
          setChk(0);
        } else {
          alert(response.data.data);
          setChk(0);
        }
      })
    } else {
      setChk(0);
    }
  }

  useEffect(() => {
    bangjang();
  }, [])

  return (
    <>
      <div onClick={() => { navigate("/") }}>
        <p><ArrowBackIosNewRoundedIcon style={{color:"#6D09D1"}}/></p>
      </div>
      <div style={{ marginLeft: "1%" }}>
        <p>{head}</p>
      </div>
      <div style={{ marginLeft: "auto", marginRight: "2%", display:"flex" }}>
      {leader?
      <div onClick={() => { if(chk===0){setChk(2);} else{setChk(0)} }} style={{  marginRight: "20px" }}>
        <p style={{color:"#A67EED"}}><ManageAccountsRoundedIcon /></p>
      </div>
      :null}
      {chk===2 ?
        <div style={{
          width: "150px",
          position: "absolute",
          backgroundColor: "white",
          top: "50px", right: "60px",
          textAlign: "center",
          borderRadius: "5px",
          border: "1px solid black",
          zIndex:"10"
        }}>
          <OptionMenu
            onClick={() => { __endPromise()}}>약속 종료</OptionMenu>
          <OptionMenu
            onClick={() => { navigate(`/promiseleader/id=${id}/type=leader`)}}>방장 위임</OptionMenu>
          <OptionMenu
            onClick={() => { navigate(`/promiseleader/id=${id}/type=kick`)}}>멤버 조정</OptionMenu>
          <OptionMenu
            onClick={() => { 
              navigate(`/addpromise/edit${id}`)
            }}>약속 수정</OptionMenu>
          <OptionMenu
            onClick={() => { removePromist() }}>약속 삭제</OptionMenu>
          <OptionMenu style={{ borderBottom:"none" }}
            onClick={() => { setChk(0); }}>취소</OptionMenu>
        </div>
        : null}
      <div onClick={() => { if(chk===0){setChk(1);} else{setChk(0)} }} style={{  marginRight: "2%" }}>
        <p style={{color:"#A67EED"}}><MoreVertIcon /></p>
      </div>
      {chk == 1?
        <div style={{
          width: "150px",
          position: "absolute",
          backgroundColor: "white",
          top: "50px", right: "20px",
          textAlign: "center",
          borderRadius: "5px",
          border: "1px solid black",
          zIndex:"10"
        }}>
          <OptionMenu
            onClick={() => { exitPromist() }}>약속 나가기</OptionMenu>
          <OptionMenu sstyle={{ borderBottom:"0px solid black" }}
            onClick={() => { setChk(!chk); }}>취소</OptionMenu>
        </div>
        : null
      }
      </div>
    </>
  )
}

export default Option3;

const OptionMenu = styled.div`
padding: 3px;
cursor: pointer;
&:hover{
  background-color:#6D09D1;
  color:white;
}`
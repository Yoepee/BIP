import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import { useNavigate, useParams } from 'react-router-dom';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

// 약속상세보기 뒤로가기(홈) 제목 메뉴(방장-방장위임, 멤버 조정, 방장x- 약속나가기, 취소)
const Option9 = ({ head }) => {
  const navigate = useNavigate();
  const [chk, setChk] = useState(false);
  const { id } = useParams();


  const removeDonation = async () => {
    if (window.confirm("게시글을 삭제하시겠습니까?")) {
      const data = await axios.delete(process.env.REACT_APP_SERVER_HOST + `/api/posts/${id}`, {
        headers: {
          Authorization: localStorage.getItem('Authorization'),
          RefreshToken: localStorage.getItem('RefreshToken'),
        }
      }).then((response) => {
        console.log(response)
        if (response.data.success) {
          navigate("/donation")
        } else {
          alert(response.data.data);
          setChk(0);
        }
      })
    } else {
      setChk(0);
    }
  }


  return (
    <>
      <div onClick={() => { navigate("/donation") }}>
        <p><ArrowBackIosNewRoundedIcon style={{color:"#6D09D1"}}/></p>
      </div>
      <div style={{ marginLeft: "1%", fontWeight:"bold", fontSize:"20px" }}>
        <p style={{ marginTop:"16px"}}>{head}</p>
      </div>
      <div style={{ marginLeft: "auto", marginRight: "2%", display:"flex" }}>
      <div onClick={() => { setChk(!chk)}} style={{  marginRight: "2%" }}>
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
            onClick={() => { navigate(`/adddonation/edit${id}`) }}>게시글 수정</OptionMenu>
          <OptionMenu
            onClick={() => { removeDonation() }}>게시글 삭제</OptionMenu>
          <OptionMenu sstyle={{ borderBottom:"0px solid black" }}
            onClick={() => { setChk(!chk); }}>취소</OptionMenu>
        </div>
        : null
      }
      </div>
    </>
  )
}

export default Option9;

const OptionMenu = styled.div`
padding: 3px;
cursor: pointer;
&:hover{
  background-color:#6D09D1;
  color:white;
}`
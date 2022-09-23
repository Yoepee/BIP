import PersonAddRoundedIcon from '@mui/icons-material/PersonAddRounded';
import SearchIcon from '@mui/icons-material/Search';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import styled from 'styled-components';

const Option4 = ({ head }) => {
  const navigate = useNavigate();
  const [chk, setChk] = useState(0);
  return (
    <>
      {chk===0?null:
      <ModalBack onClick={()=>{setChk(0)}} 
      style={{position:"absolute", backgroundColor:"black", opacity:"0.8"}}/>}
      <div style={{ marginLeft: "1%" }}>
        <p>{head}</p>
      </div>
      <div style={{ marginLeft: "auto", marginRight: "2%", cursor: "pointer", display: "flex" }}>
        <div style={{ marginRight: "30px", cursor: "pointer" }}
          onClick={() => {}}>
          <p><SearchIcon /></p>
        </div>
          <div style={{ marginRight: "30px", cursor: "pointer" }}
            onClick={() => { if(chk!==0){setChk(0)}else{setChk(1)} }}>
            <p><PersonAddRoundedIcon /></p>
          </div>
          {chk  === 1 ?
            <div style={{
              width: "150px",
              position: "absolute",
              backgroundColor: "white",
              top: "50px", right: "70px",
              textAlign: "center",
              borderRadius: "5px",
              border: "1px solid black"
            }}>
              <div style={{ borderBottom: "1px solid black", padding: "3px", cursor: "pointer" }}
                onClick={() => {  navigate("/addmember/name") }}>닉네임으로 추가</div>
              <div style={{borderBottom: "1px solid black", padding: "3px", cursor: "pointer" }}
                onClick={() => {  navigate("/addmember/phone") }}>연락처로 추가</div>
                <div style={{ padding: "3px", cursor: "pointer" }}
                onClick={() => {  setChk(0); }}>취소</div>
            </div>
          :null
        }
        <div style={{ cursor: "pointer" }}
          onClick={() => {if(chk!==0){setChk(0)}else{setChk(2)}}}>
          <p><MoreVertIcon /></p>
        </div>
        {chk  === 2 ?
            <div style={{
              width: "150px",
              position: "absolute",
              backgroundColor: "white",
              top: "50px", right: "70px",
              textAlign: "center",
              borderRadius: "5px",
              border: "1px solid black"
            }}>
              <div style={{ borderBottom: "1px solid black", padding: "3px", cursor: "pointer" }}
                onClick={() => {  navigate("/addmember/name") }}>친구 수정</div>
              <div style={{borderBottom: "1px solid black", padding: "3px", cursor: "pointer" }}
                onClick={() => {  navigate("/addmember/phone") }}>친구 삭제</div>
                <div style={{ padding: "3px", cursor: "pointer" }}
                onClick={() => {  setChk(0); }}>취소</div>
            </div>
          :null
        }
      </div>
    </>
  )
}

export default Option4;

const ModalBack= styled.div`
width:100%;
height:100%;
`
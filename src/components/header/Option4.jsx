import PersonAddRoundedIcon from '@mui/icons-material/PersonAddRounded';
import SearchIcon from '@mui/icons-material/Search';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import styled from 'styled-components';

const Option4 = ({ head, setType, type }) => {
  const navigate = useNavigate();
  const [chk, setChk] = useState(0);
  return (
    <>
      {chk===0?null:
      <ModalBack onClick={()=>{setChk(0)}} 
      style={{position:"absolute", backgroundColor:"black", opacity:"0.8", zIndex:"10"}}/>}
      <div style={{ marginLeft: "1%" }}>
        {type==="none"?
        <p style={{fontWeight:"bold", fontSize:"20px", marginLeft:"12px"}}>{head}</p>
        :type==="give"?
        <p>별명 지어주기</p>
        :type==="remove"?
        <p>친구 삭제</p>:null}
      </div>
      <div style={{ marginLeft: "auto", marginRight: "2%", cursor: "pointer", display: "flex" }}>
        <div style={{ marginRight: "30px", cursor: "pointer" }}
          onClick={() => {setType("search");}}>
          <p><SearchIcon style={{color:"#A67EED"}} /></p>
        </div>
          <div style={{ marginRight: "30px", cursor: "pointer" }}
            onClick={() => { if(chk!==0){setChk(0)}else{setChk(1)} }}>
            <p><PersonAddRoundedIcon style={{color:"#A67EED"}}/></p>
          </div>
          {chk  === 1 ?
            <div style={{
              width: "150px",
              position: "absolute",
              backgroundColor: "white",
              top: "50px", right: "70px",
              textAlign: "center",
              borderRadius: "5px",
              border: "1px solid black",
              zIndex:"10"
            }}>
              <OptionMenu
                onClick={() => {  navigate("/addmember/name") }}>닉네임으로 추가</OptionMenu>
              <OptionMenu
                onClick={() => {  navigate("/addmember/phone") }}>연락처로 추가</OptionMenu>
                <OptionMenu
                onClick={() => {  setChk(0); }}>취소</OptionMenu>
            </div>
          :null
        }
        <div style={{ cursor: "pointer" }}
          onClick={() => {if(chk!==0){setChk(0)}else{setChk(2)}}}>
          <p><MoreVertIcon style={{color:"#A67EED"}}/></p>
        </div>
        {chk  === 2 ?
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
                onClick={() => {  setType("give"); setChk(0); }}>친구 수정</OptionMenu>
              <OptionMenu
                onClick={() => {  setType("remove"); setChk(0); }}>친구 삭제</OptionMenu>
                <OptionMenu
                onClick={() => {  setType("none"); setChk(0); }}>취소</OptionMenu>
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
const OptionMenu = styled.div`
padding: 3px;
cursor: pointer;
&:hover{
  background-color:#6D09D1;
  color:white;
}`
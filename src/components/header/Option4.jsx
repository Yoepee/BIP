import PersonAddRoundedIcon from '@mui/icons-material/PersonAddRounded';
import SearchIcon from '@mui/icons-material/Search';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useState } from 'react';
import styled from 'styled-components';
import AddMemberPage from '../../pages/AddMemberPage';
import ReceiveMember from '../member/ReceiveMember';
import { useDispatch } from 'react-redux';
import { clearSearch } from '../../redux/modules/searchMember';

{/* 친구목록 제목 검색 친구추가 메뉴(친구수정(별칭), 친구삭제)) */}
const Option4 = ({ head, setType, type }) => {
  const dispatch = useDispatch();
  const [chk, setChk] = useState(0);
  const [chktype, setChktype] = useState("name");
  return (
    <>{chk===3?
      <AddMemberArea>
        <AddMemberPage type={chktype} setChk={setChk} setChktype={setChktype} />
      </AddMemberArea>
      :null}
      {chk===4?
      <ReceiveMemberArea>
        <ReceiveMember type={chktype} setChk={setChk} setChktype={setChktype} />
      </ReceiveMemberArea>
      :null
      }
      {chk===0?null:
      <ModalBack onClick={()=>{
        setChk(0)
        // 검색 목록 초기화
      dispatch(clearSearch());}}
      style={{position:"fixed", backgroundColor:"black", opacity:"0.8", zIndex:"10"}}/>}
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
          <p><SearchIcon style={{color:"#6B68F3"}} /></p>
        </div>
          <div style={{ marginRight: "30px", cursor: "pointer" }}
            onClick={() => { if(chk!==0){setChk(0)}else{setChk(1)} }}>
            <p><PersonAddRoundedIcon style={{color:"#6B68F3"}}/></p>
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
                onClick={() => {  setChktype("name");setChk(3); }}>닉네임으로 추가</OptionMenu>
              <OptionMenu
                onClick={() => {  setChktype("phone");setChk(3); }}>연락처로 추가</OptionMenu>
                <OptionMenu
                onClick={() => {  setChk(4); }}>친구요청으로 추가</OptionMenu>
                <OptionMenu
                onClick={() => {  setChk(0); }}>취소</OptionMenu>
            </div>
          :null
        }
        <div style={{ cursor: "pointer" }}
          onClick={() => {if(chk!==0){setChk(0)}else{setChk(2)}}}>
          <p><MoreVertIcon style={{color:"#6B68F3"}}/></p>
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
left:0%;
`
const OptionMenu = styled.div`
padding: 3px;
cursor: pointer;
&:hover{
  background-color:#6B68F3;
  color:white;
}`

const AddMemberArea = styled.div`
  width:400px; 
  height:225px; 
  position:absolute;
  background:white;
  margin:50px auto;
  left:0;
  right:0;
  z-index:20;
  border-radius: 8px;
`

const ReceiveMemberArea = styled.div`
  width: 400px; 
  height: 300px; 
  position: absolute;
  background: white; 
  margin: 50px auto;
  left: 0; 
  right:0;
  z-index: 20;
  border-radius: 8px;
`
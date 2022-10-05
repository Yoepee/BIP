import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { __getCheckIn, __CheckIn } from "../../../redux/modules/checkIn";
import styled from "styled-components";

// 체크인 컴포넌트 (상세보기 멤버리스트 클릭시 출력)
const CheckIn = () =>{
  // 체크인 정보를 불러오는 변수
  const dispatch=useDispatch();
  const checkList = useSelector((state)=>state.checkIn);
  // 게시물 번호 확인하는 값
  const {id}= useParams();
  //  체크인 상태값을 불러오는 함수 호출 (ontime(시간 내 도착), noshow(미출석), late(지각))
  useEffect(()=>{
    dispatch(__getCheckIn(id));
  },[dispatch]);
  
  return (
    <>
    {/* 클릭시 체크인 함수 동작 */}
    <div style={{color:"red", cursor:"pointer"}} onClick={()=>{dispatch(__CheckIn(id));}}>{">>"}체크인{"<<"}</div>
    {/* 체크인 멤버리스트 출력 */}
    <div style={{display:"flex", backgroundColor:"white", borderRadius:"15px"}}>
         {checkList?.data?.data?.map((member)=>{
          // 결과값이 ontime이면 정상 표시
          if(member.attendance==="ONTIME"){
            if(member.nicknameByOwner!== null){
              return (
                <OntimeCard key={member.id}>{member.nicknameByOwner}</OntimeCard>
              )
            }else{
              return (
                <OntimeCard key={member.id}>{member.nicknameByFriend}</OntimeCard>
              )
            }
          }
          // 결과값이 late이면 지각 표시
          else if(member.attendance==="LATE"){
            if(member.nicknameByOwner!== null){
              return (
                <LateCard key={member.id}>{member.nicknameByOwner}</LateCard>
              )
            }else{
              return (
                <LateCard key={member.id}>{member.nicknameByFriend}</LateCard>
              )
            }
            // 결과값이 noshow이면 미출석 표시
          }else{
            if(member.nicknameByOwner!== null){
              return (
                <NoshowCard key={member.id}>{member.nicknameByOwner}</NoshowCard>
              )
            }else{
              return (
                <NoshowCard key={member.id}>{member.nicknameByFriend}</NoshowCard>
              )
            }
          }
         })}
    </div>
    </>
  )
}

export default CheckIn;

const OntimeCard = styled.div`
border-radius: 20px;
margin : 10px;
padding : 10px;
background-color: #6D09D1;
color:white;
font-weight:bold;
`

const LateCard = styled.div`
border-radius: 20px;
margin : 10px;
padding : 10px;
background-color: red;
font-weight:bold;
`

const NoshowCard = styled.div`
border-radius: 20px;
margin : 10px;
padding : 10px;
background-color: white;
border: 2px solid #D9D9D9;
color:#D9D9D9;
font-weight:bold;
`
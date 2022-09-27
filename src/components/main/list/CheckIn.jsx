import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { __getCheckIn, __CheckIn } from "../../../redux/modules/checkIn";
import styled from "styled-components";

const CheckIn = () =>{
  const dispatch=useDispatch();
  const checkList = useSelector((state)=>state.checkIn);
  const {id}= useParams();
  useEffect(()=>{
    dispatch(__getCheckIn(id));
  },[dispatch]);

  return (
    <>
    <div style={{color:"red", cursor:"pointer"}} onClick={()=>{dispatch(__CheckIn(id));}}>{">>"}체크인{"<<"}</div>
    <div style={{display:"flex", backgroundColor:"white", borderRadius:"15px"}}>
         {checkList?.data?.data?.map((member)=>{
          if(member.attendance==="ONTIME"){
            return (
              <OntimeCard key={member.id}>{member.nickname}</OntimeCard>
            )
          }
          else if(member.attendance==="LATE"){
            return (
              <LateCard key={member.id}>{member.nickname}</LateCard>
            )
          }else{
            return (
              <NoshowCard key={member.id}>{member.nickname}</NoshowCard>
            )
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
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { __addMemberName, __addMemberPhone} from "../../redux/modules/member";
import { clearSearch } from "../../redux/modules/searchMember";
import styled from "styled-components";

const AddMember = ({member,onChangeHandle}) => {
  const dispatch = useDispatch();
  const navigate= useNavigate();
  const {type} = useParams();
  const user = useSelector((state)=>state.searchMember);
  
  const addMemberName = (member) => {
    dispatch(__addMemberName(member))
    .then((response)=>{
      console.log(response)
      if(response.payload.success===false){
        alert(response.payload.data);
        return;
      }
      navigate("/member");
    })
    dispatch(clearSearch());
   }
   const addMemberPhone = (member) => {
    dispatch(__addMemberPhone(member))
    .then((response)=>{
      console.log(response)
      if(response.payload.success===false){
        alert(response.payload.data);
        return;
      }
      navigate("/member");
    })
    dispatch(clearSearch());
   }
  
  return (
    <>
    <div>
      {type==="name"?
      <p>닉네임</p>
      :<p>연락처</p>}
        <input type="text" onChange={onChangeHandle} name="value" value={member.value}/>
    </div>
    {user?.data?.success?
    <div style={{ display: "flex", border: "1px solid black", margin: "10px" }}>
        {user?.data?.data?.profileImgUrl === null ?
          <img src={process.env.PUBLIC_URL + `/assets/user_svg.svg`} style={{ width: "50px" }} />
          : <img src={user?.data?.data?.profileImgUrl} style={{ width: "50px" }} />
        }
        <p>{user?.data?.data?.nickname}</p>
        <p>({user?.data?.data?.nickname})</p>
        <AddFriend onClick={()=>{
          if(type==="name"){
            addMemberName(member);
          }else{
            addMemberPhone(member);
          }
        }}>친구추가</AddFriend>
    </div>
    :null}
    </>
  )
}

export default AddMember;

const AddFriend = styled.p`
margin-left:auto;
margin-right:2%;
background-color:#6D09D1;
color:white;
border-radius:6px;
padding:5px;
cursor:pointer;
`
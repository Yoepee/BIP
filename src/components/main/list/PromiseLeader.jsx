import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { __getDetailPromise } from "../../../redux/modules/detailPromise";
import styled from "styled-components";
import axios from "axios";

const PromiseLeader = () =>{
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const promise = useSelector((state)=>state.detailPromise);
  const {id, type}= useParams();
  useEffect(()=>{
    dispatch(__getDetailPromise(id));
  },[dispatch])

  const __giveLeader = async (member) => {
    if (window.confirm("방장을 위임하시겠습니까?")) {
    let a = await axios.post(process.env.REACT_APP_SERVER_HOST + `/api/events/master/${id}`, {targetId:member}, {
      headers: {
        Authorization: localStorage.getItem('Authorization'),
        RefreshToken: localStorage.getItem('RefreshToken')
      }
    }).then((response) => {
      console.log(response);
      if (response.data.success) {
        navigate(`/detailpromise/${id}`)
      } else {
        return;
      }
    })}else{
      return;
    }
  }
  const __kickMember = async (member, nickname) => {
    if (window.confirm(`${nickname}님을 제외하시겠습니까?`)) {
    let a = await axios.delete(process.env.REACT_APP_SERVER_HOST + `/api/events/master/${id}`, {targetId:member}, {
      headers: {
        Authorization: localStorage.getItem('Authorization'),
        RefreshToken: localStorage.getItem('RefreshToken')
      }
    }).then((response) => {
      console.log(response);
      if (response.data.success) {
        navigate(`/detailpromise/${id}`)
      } else {
        return;
      }
    })}else{
      return;
    }
  }
  
  return (
    <>
    {promise?.data?.data?.memberList?.map((member)=>{
      if(member.nickname===localStorage.getItem("name")){
        return;
      }else{
      return (
        <div style={{ display: "flex", border: "1px solid black", margin: "10px" }} key={member.id}>
        {member.profileImgUrl === null ?
          <img src={process.env.PUBLIC_URL + `/assets/user_svg.svg`} style={{ width: "50px" }} />
          : <img src={member.profileImgUrl} style={{ width: "50px" }} />
        }
        <p>{member.nickname}</p>
        <p>({member.nickname})</p>
        <AddFriend onClick={()=>{
          if(type==="leader"){
            __giveLeader(member.id);
          }else{
            __kickMember(member.id, member.nickname);
          }
        }}>선택</AddFriend>
    </div>
      )}
    })}
    </>
  )
}

export default PromiseLeader;

const AddFriend = styled.p`
margin-left:auto;
margin-right:2%;
background-color:#6D09D1;
color:white;
border-radius:6px;
padding:5px;
cursor:pointer;
`
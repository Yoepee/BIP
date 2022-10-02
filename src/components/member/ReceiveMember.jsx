import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { __addMemberName, __addMemberPhone} from "../../redux/modules/member";
import { clearSearch } from "../../redux/modules/searchMember";
import styled from "styled-components";
import axios from "axios";
import Header from "../header/Header";

const ReceiveMember = ({member, type, setChk}) => {
  const dispatch = useDispatch();
  const [user,setUser] = useState();

  useEffect(()=>{
    __getReceive();
  },[])

  const __getReceive = async()=>{
    let a = await axios.get(process.env.REACT_APP_SERVER_HOST+`/api/friends/recommandlist`,{
      headers: {
          Authorization:localStorage.getItem('Authorization'),
          RefreshToken:localStorage.getItem('RefreshToken')
      }}).then((response)=>{
        console.log(response)
        setUser(response.data);
      })
  }
  
  const addMemberName = (member) => {
    dispatch(__addMemberName({value:member}))
    .then((response)=>{
      if(response.payload.success===false){
        alert(response.payload.data);
        return;
      }
    })
    dispatch(clearSearch());
   }
  
   console.log(user);
  return (
    <>
    <Header head={"친구요청으로 추가"}/>
    {user?.data?.length!==0?
    user?.data?.map((info)=>{
      return(
        <Card key={info.id}>
        {info.profileImgUrl === null ?
          <img src={process.env.PUBLIC_URL + `/assets/user_svg.svg`} style={{width:"50px", height:"50px",  borderRadius:"100%",margin:"15px"}}/>
          : <img src={info.profileImgUrl} style={{width:"50px", height:"50px",  borderRadius:"100%",margin:"15px"}} />
        }
        <p>{info.nickname}</p>
        <p>({info.nickname})</p>
        <AddFriend onClick={()=>{
          if(type==="name"){
            addMemberName(info.nickname);
            setChk(0);
          }
        }}>추가</AddFriend>
    </Card>
      )
    })
    :<p>친구요청 목록이 없습니다.</p>
    }
    </>
  )
}

export default ReceiveMember;

const AddFriend = styled.p`
display: flex;

margin-left:auto;
width: 45px;
height: 22px;
margin-right:20px;
align-items: center;
justify-content: center;
background-color:#6D09D1;
font-weight: bold;
color:white;
padding: 10px;
border-radius:6px;
cursor:pointer;

`
const Card = styled.div`
display:flex;
height: 80px;
border:none;
border-radius: 8px;
background-color: #F5EAFB;
margin:10px

`

const Input = styled.input`
  margin-left: 20px;
  border: none;
  outline: none;
  width: 350px;
  border-bottom: 1px solid  #F5EAFB;
  margin-bottom: 31px;
`
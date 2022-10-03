import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { __addMemberName, __addMemberPhone} from "../../redux/modules/member";
import { clearSearch } from "../../redux/modules/searchMember";
import styled from "styled-components";
import axios from "axios";
import Header from "../header/Header";

// 친구요청 받은 친구목록 컴포넌트
const ReceiveMember = ({ type, setChk }) => {
  const dispatch = useDispatch();
  // 친구 리스트 값 받는 state
  const [user,setUser] = useState();

  // 랜더링시 친구 요청 리스트 출력
  useEffect(()=>{
    __getReceive();
  },[])

  // 본인을 추가한 친구리스트 값 받아오기
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
  
  // 친구 요청리스트에서 친구 추가
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
    {/* 친구 요청 목록이 비었는지 체크 */}
    {user?.data?.length!==0?
    // 목록에 대상이 존재하면 목록 리스트 출력
    user?.data?.map((info)=>{
      return(
        <Card key={info.id}>
        {info.profileImgUrl === null ?
          <img src={process.env.PUBLIC_URL + `/assets/user_svg.svg`} style={{width:"50px", height:"50px",  borderRadius:"100%",margin:"15px"}}/>
          : <img src={info.profileImgUrl} style={{width:"50px", height:"50px",  borderRadius:"100%",margin:"15px"}} />
        }
        <p>{info.nicknameByFriend}</p>
        {info.nicknameByOwner === null?
        null
        :<p>({info.nicknameByOwner})</p>
        }
        {/* 추가 버튼 클릭시 친구 추가 */}
        <AddFriend onClick={()=>{
          if(type==="name"){
            addMemberName(info.nickname);
            setChk(0);
          }
        }}>추가</AddFriend>
    </Card>
      )
    })
    // 요청 목록이 없으면 문구 출력
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
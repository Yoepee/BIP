import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { __addMemberName, __addMemberPhone} from "../../redux/modules/member";
import { clearSearch } from "../../redux/modules/searchMember";
import styled from "styled-components";
import Swal from "sweetalert2";
import axios from "axios";

// 친구 추가 컴포넌트
const AddMember = ({member, type, setChk}) => {
  const dispatch = useDispatch();
  const user = useSelector((state)=>state.searchMember);

  const __isToken = async () => {
    await axios.get(process.env.REACT_APP_SERVER_HOST + `/api/member/reissue`, {
      headers: {
        Authorization: localStorage.getItem('Authorization'),
        RefreshToken: localStorage.getItem('RefreshToken'),
      }
    }
    ).then((res) => {
      if (res.data.success) {
        localStorage.setItem("Authorization", res.headers.authorization);
        localStorage.setItem("RefreshToken", res.headers.refreshtoken);
      }
    })
  }
  
  // 닉네임으로 친구 추가
  const addMemberName = (member) => {
    dispatch(__addMemberName(member))
    .then((response)=>{
      if(response.payload.success===false){
        Swal.fire(response.payload.data,"　","error");
        return;
      }
    })
    // 검색 목록 초기화
    dispatch(clearSearch());
   }

  // 휴대폰번호로 친구 추가
   const addMemberPhone = (member) => {
    dispatch(__addMemberPhone(member))
    .then((response)=>{
      if(response.payload.success===false){
        Swal.fire(response.payload.data,"　","error");
        return;
      }
    })
    // 검색 목록 초기화
    dispatch(clearSearch());
   }
  return (
    <>
    {user?.data?.success?
    <Card>
      {/* 프로필 사진이 없으면 기본이미지 출력 */}
        {user?.data?.data?.profileImgUrl === null ?
          <img src={process.env.PUBLIC_URL + `/assets/user_svg.svg`} style={{width:"50px", height:"50px",  borderRadius:"50%",margin:"15px", backgroundColor:"#C7FEC1"}}/>
          : <img src={user?.data?.data?.profileImgUrl} style={{width:"50px", height:"50px",  borderRadius:"50%",margin:"15px",  backgroundColor:"#C7FEC1"}} />
        }
        {/* 친구 닉네임 */}
        <p>{user?.data?.data?.nicknameByFriend}</p>
        {/* 별칭이 있다면 별칭 출력 */}
        {user?.data?.data?.nicknameByOwner===null?
        null
        :<p>({user?.data?.data?.nicknameByOwner})</p>}
        {/* type값에 따라 휴대폰 번호인지 닉네임인지 선별하여 함수 동작 */}
        <AddFriend onClick={()=>{
          __isToken().then(()=>{
          if(type==="name"){
            addMemberName(member);
            setChk(0);
          }else{
            addMemberPhone(member);
            setChk(0);
          }
        })
        }}>추가</AddFriend>
    </Card>
    :null}
    </>
  )
}

export default AddMember;

const AddFriend = styled.p`
display: flex;

margin-left:auto;
width: 45px;
height: 22px;
margin-right:20px;
align-items: center;
justify-content: center;
background-color:#3E09D1;
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
background-color: #D9DCFB;
margin:10px

`

const Input = styled.input`
  margin-left: 20px;
  margin-bottom: 50px;
  border: none;
  outline: none;
  width: 70%;
  border-bottom: 1px solid  #D9DCFB;
  margin-bottom: 31px;
`

const Img = styled.img`
width:50px; 
height:50px;  
border-radius:50%;
margin:15px; 
background-color:#C7FEC1;
`
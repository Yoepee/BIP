import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { __getCheckIn, __CheckIn } from "../../../redux/modules/checkIn";
import styled from "styled-components";
import axios from "axios";

// 체크인 컴포넌트 (상세보기 멤버리스트 클릭시 출력)
const CheckIn = () => {
  // 체크인 정보를 불러오는 변수
  const dispatch = useDispatch();
  const checkList = useSelector((state) => state.checkIn);

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
  // 게시물 번호 확인하는 값
  const { id } = useParams();
  //  체크인 상태값을 불러오는 함수 호출 (ontime(시간 내 도착), noshow(미출석), late(지각))
  useEffect(() => {
    __isToken().then(() => {
      dispatch(__getCheckIn(id));
    })
  }, [dispatch]);

  return (
    <>
      {/* 클릭시 체크인 함수 동작 */}
      <CheckInBtn onClick={() => { __isToken().then(() => {dispatch(__CheckIn(id));}) }}>출석하기</CheckInBtn>
      {/* 체크인 멤버리스트 출력 */}
      <div style={{ display: "flex", backgroundColor: "#FAFAFA", borderRadius: "8px", fontSize: "0", minWidth: "380px" }}>
        {checkList?.data?.data?.map((member) => {
          // 결과값이 ontime이면 정상 표시
          if (member.attendance === "ONTIME") {
            if (member.nicknameByOwner !== null) {
              return (
                <OntimeCard key={member.id}>{member.nicknameByOwner}</OntimeCard>
              )
            } else {
              return (
                <OntimeCard key={member.id}>{member.nicknameByFriend}</OntimeCard>
              )
            }
          }
          // 결과값이 late이면 지각 표시
          else if (member.attendance === "LATE") {
            if (member.nicknameByOwner !== null) {
              return (
                <LateCard key={member.id}>{member.nicknameByOwner}</LateCard>
              )
            } else {
              return (
                <LateCard key={member.id}>{member.nicknameByFriend}</LateCard>
              )
            }
            // 결과값이 noshow이면 미출석 표시
          } else {
            if (member.nicknameByOwner !== null) {
              return (
                <NoshowCard key={member.id}>{member.nicknameByOwner}</NoshowCard>
              )
            } else {
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

const CheckInBtn = styled.div`
  width: 100px;
  background-color: #D9DCFB;
  border-radius: 20px;
  color: #3E09D1;
  cursor: pointer;
  margin: 20px auto;
  padding: 5px 0;
  font-weight: bold;
  box-shadow: 1px 3px 0 rgb(0,0,0,0.1);
  &:hover {
    background-color: #3E09D1;;
    color: white;
  }
  &:active {
    background-color: #3E09D1;;
    color: white;
    box-shadow: 1px 1px 0 rgb(0,0,0,0.1);
    position: relative;
    top:2px;
  }
`

const OntimeCard = styled.div`
background-color: #3E09D1;
color: white;
border-radius: 25px;
line-height: 18px;
margin : 10px;
padding : 6px 10px;
font-weight: bold;
font-size: 14px;
`

const LateCard = styled.div`
background-color: tomato;
color: white;
border-radius: 25px;
line-height: 18px;
margin : 10px;
padding : 6px 10px;
font-weight: bold;
font-size: 14px;
`

const NoshowCard = styled.div`
background-color: white;
color:#D9D9D9;
border: 2px solid #D9D9D9;
border-radius: 25px;
line-height: 20px;
margin : 10px;
padding : 2px 8px;
font-weight: bold;
font-size: 14px;
`
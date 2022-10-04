import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { __getDetailPromise } from "../../../redux/modules/detailPromise";
import axios from "axios";
import CheckIn from "./CheckIn";
import KaKaoMap from "../../map/KakaoMap";

// 약속 상세 페이지
const DetailPromise = () => {
  const {id} = useParams();
  const dispatch = useDispatch();
  // 상세보기 정보 받아오기
  const promise = useSelector((state)=>state.detailPromise);
  // 방장 닉네임 확인
  const [leader, setLeader] = useState("");
  // 체크인 창을 숨길지 드러낼지 결정하는 변수
  const [chk,setChk] = useState(false);

  // 상세보기 정보와 방장 정보를 확인함
  useEffect(()=>{
    dispatch(__getDetailPromise(id));
    bangjang();
  },[dispatch])

  // 방장 누구인지 확인하는 함수
  const bangjang = async () => {
    let a = await axios.get(process.env.REACT_APP_SERVER_HOST + `/api/events/master/check/${id}`, {
      headers: {
        Authorization: localStorage.getItem('Authorization'),
        RefreshToken: localStorage.getItem('RefreshToken')
      }
    }).then((response) => {
      // 방장을 식별하면 leader에 방장 닉네임을 보관
      if (response.data.success) {
          setLeader(response.data.data.nickname)
      } else {
        return;
      }
    })
  }
  
  return(
    <>
      <Wrap>
        <LeftItem>
          {/* 제목 */}
          <Title>
            <p style={{fontSize:"24px"}}>{promise?.data?.data?.title}</p>
            <div style={{margin:"20px 8px 0 0"}}>
            <p style={{fontSize:"13px", marginLeft:"250px"}}><span>P</span>{promise?.data?.data?.point}</p>
            </div>
          </Title>
          {/* 내용 */}
          <Desc>
            <p>{promise?.data?.data?.content}</p>
          </Desc>
          {/* 시간 (split을 이용한 값 구분) */}
          <When>
            <p>{promise?.data?.data?.eventDateTime.split("-")[0]}년</p>
            <p>{promise?.data?.data?.eventDateTime.split("-")[1]}월</p>
            <p>{promise?.data?.data?.eventDateTime.split("-")[2]}일</p>
            {Number(promise?.data?.data?.eventDateTime.split("-")[3])<12?
            <>
            <p>오전</p>
            <p>{Number(promise?.data?.data?.eventDateTime.split("-")[3])}시</p>
            </>
            :Number(promise?.data?.data?.eventDateTime.split("-")[3])===12?
            <>
            <p>오후</p>
            <p>{promise?.data?.data?.eventDateTime.split("-")[3]}시</p>
            </>
            :<>
            <p>오후</p>
            <p>{Number(promise?.data?.data?.eventDateTime.split("-")[3])-12}시</p>
            </>
            }
            <p>{promise?.data?.data?.eventDateTime.split("-")[4]}분</p>    
          </When>
          {/* 참여 인원, 클릭시 체크인 창 꺼냄 */}
          <People onClick={()=>{setChk(!chk)}}>
            {!chk?
            <p >▼</p>
            :<p>▲</p>}
            <p>참여인원 : </p>
            {promise?.data?.data?.memberList?.map((member)=>{
              if(member.nicknameByFriend===leader){
                if(member.nicknameByOwner!==null){
                  return (
                    <p key={member.id}>💜{member.nicknameByOwner}</p>
                  )
                }else{
                  return (
                    <p key={member.id}>💜{member.nicknameByFriend}</p>
                  )
                }
              }else{
                if(member.nicknameByOwner!==null){
                  return (
                    <p key={member.id}>💚{member.nicknameByOwner}</p>
                  )
                }else{
                  return (
                    <p key={member.id}>💚{member.nicknameByFriend}</p>
                  )
                }
              }
            })}
          </People>
          {/* chk값을 확인하여 체크인 컴포넌트를 부를지 결정 */}
          {chk?
          <CheckIn/>
          :null}
        </LeftItem>
        {/* 장소 - 좌표값을 받아와서 지도에 표시 */}
        {/* 초기값으로 서울시청이 지정되어 있으나 장소가 없으면 약속이 없으므로 불필요 문구 (차후 삭제 예정) */}
        <RightItem>
          <Where>
            <p>{promise?.data?.data?.place}</p>
          </Where>
          {promise?.data?.data?.coordinate===null?
          <Map><KaKaoMap lat={37.5656} lng={126.9769} width={"400px"} height={"400px"}/></Map>
          :<Map><KaKaoMap lat={promise?.data?.data?.coordinate.split(",")[0]} lng={promise?.data?.data?.coordinate.split(",")[1]} width={"400px"} height={"400px"}/></Map>}
        </RightItem>        
      </Wrap>      
    </>
  )
}

export default DetailPromise;

const Wrap = styled.div`
  /* background-color: pink; */
  margin: 0 auto;
  width: 80%;
  text-align: center;
  position: relative;
`



const Title = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  font-weight: bold;
  p {    
    /* margin-right: 10%;  */
   span{
     background-color: #6D09D1;
     border-radius: 50%;
     padding: 0 4px;
     margin-right: 2px;
     color: white;
   }
  }
`
const Desc = styled.div`
  width: 100%;
  text-align: left;
  font-size: 15px;
  font-weight: bold;
  p {
    margin-right: 2%;
  }
`

const When = styled.div`
  /* background-color: skyblue; */
  width: 100%;
  display: flex;
  /* margin: 10% 15%; */
  font-weight: bold;
  p {
    margin-right: 1%;
  }
`

const People = styled.div`
  /* background-color: green; */
  display: flex;
  width: 100%;
  font-weight: bold;
  font-size: 15px;
  /* margin: 10% 15%; */
  p {
    margin-right: 2%;
    cursor:pointer;
  }
`

const Where = styled.div`
  width: 100%;
  display: flex;
  /* margin: 10% 15%; */
  font-weight: bold;

  @media screen and (min-width: 769px) {
   float: right;
   p{
    margin: 80px auto;
   }
  }
`

const Map = styled.div`
  /* position: absolute; */
  width: 300px;
  height: 200px;
  /* margin-bottom: 100px; */
  background-color: #F5EAFB;
  @media screen and (min-width: 769px) {
   margin: 110px auto;
   margin-bottom: 0;
  }
`

const LeftItem = styled.div`
  @media screen and (min-width: 769px) {
    /* background-color: pink; */
    width: 50%;
    height: 250px;
    float: left;
    margin-top: 50px;
    /* border-right: 1px solid #F5EAFB; */
  }
`
const RightItem = styled.div`
  @media screen and (min-width: 769px) {
    /* background-color: skyblue; */
    width: 49%;
    float: right;
  }
`
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { __getDetailPromise } from "../../../redux/modules/detailPromise";
import axios from "axios";


const DetailPromise = () => {
  const {id} = useParams();
  const dispatch = useDispatch();
  const promise = useSelector((state)=>state.detailPromise);
  const [leader, setLeader] = useState("");

  useEffect(()=>{
    dispatch(__getDetailPromise(id));
    bangjang();
  },[dispatch])

  const bangjang = async () => {
    let a = await axios.get(process.env.REACT_APP_SERVER_HOST + `/api/events/master/check/${id}`, {
      headers: {
        Authorization: localStorage.getItem('Authorization'),
        RefreshToken: localStorage.getItem('RefreshToken')
      }
    }).then((response) => {
      if (response.data.success) {
          setLeader(response.data.data.nickname)
      } else {
        return;
      }
    })
  }

  console.log(promise)
  
  return(
    <>
      <Wrap>
        <Title>
          <p>{promise?.data?.data?.title}</p>
        </Title>
        <Desc>
          <p>{promise?.data?.data?.content}</p>
          <p><span>P</span> 200</p>
        </Desc>
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
        <Point>
          <p>참여인원 : </p>
          {promise?.data?.data?.memberList?.map((member)=>{
            if(member.nickname===leader){
            return (
                <p key={member.id}>💜{member.nickname}</p>
            )}else{
              return (
                <p key={member.id}>💚{member.nickname}</p>
          )}
          })}
        </Point>
        <Where>
          <p>{promise?.data?.data?.place}</p>
        </Where>
        <Map>지도(예정)</Map>
      </Wrap>      
    </>
  )
}

export default DetailPromise;

const Wrap = styled.div`
  /* background-color: pink; */
  margin: 0 auto;
  width: 70%;
  text-align: center;
  position: relative;
`

const Title = styled.div`
  width: 100%;
  display: flex;
  font-weight: bold;
  font-size: 24px;
  margin-top: 66px;
  
`

const When = styled.div`
  /* background-color: skyblue; */
  width: 100%;
  display: flex;
  margin: 10% 15%
  font-weight: bold;
  p {
    margin-right: 1%;
  }
`

const Where = styled.div`
  width: 100%;
  display: flex;
  margin: 10% 15%
  font-weight: bold;
  p {
    margin-right: 2%;
  }
`

const Point = styled.div`
  /* background-color: green; */
  display: flex;
  width: 100%;
  font-weight: bold;
  margin: 10% 15%
  p {
    margin-right: 2%;
  }
`

const Desc = styled.div`
  width: 100%;
  display: flex;
  
  font-weight: bold;
  justify-content: space-between;
  p {
    margin-right: 2%;
    gap:1;
   span{
     border-radius: 100%;
     background-color: #6D09D1;
     padding: 3px 8px;
     height: 5px;
     width: 5px;
     color: white;
   }
  }
  
`

const Map = styled.div`
  /* position: absolute; */
  width: 99%;
  height: 25vh;
  background-color: wheat;
`
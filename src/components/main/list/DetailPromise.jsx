import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { __getDetailPromise } from "../../../redux/modules/detailPromise";
import axios from "axios";


const DetailPromise = () => {
  const {id} = useParams();
  const dispatch = useDispatch();
  const promise = useSelector((state)=>state.detailPromise);

  useEffect(()=>{
    dispatch(__getDetailPromise(id));
  },[dispatch])

  console.log(promise)
  
  return(
    <>
      <Wrap>
        <Title>
          <p>{promise?.data?.data?.title}</p>
        </Title>
        <When>
          {/* 시간 통일감 필요 */}
          <p>{promise?.data?.data?.eventDateTime}</p>
          <p>오후</p>
          <p>2시</p>
          <p>30분</p>    
        </When>
        <Where>
          <p>{promise?.data?.data?.place}</p>
        </Where>
        <Point>
          <p>참여인원 : </p>
          {promise?.data?.data?.memberList?.map((member)=>{
            return (
                <p key={member.id}>{member.nickname}</p>
            )
          })}
        </Point>
        <Desc>
          <p>내용</p>
        </Desc>
        <Map>지도(예정)</Map>
      </Wrap>      
    </>
  )
}

export default DetailPromise;

const Wrap = styled.div`
  /* background-color: pink; */
  margin: 0 auto;
  width: 100vw;
  min-width: 300px;
  max-width: 1200px;
  text-align: center;
  position: relative;
`

const Title = styled.div`
  width: 100%;
  text-align: center;
  font-weight: bold;
  font-size: 24px;
  margin: 10% 0;
`

const When = styled.div`
  /* background-color: skyblue; */
  width: 100%;
  display: flex;
  margin: 0 15%;
  font-weight: bold;
  p {
    margin-right: 1%;
  }
`

const Where = styled.div`
  width: 100%;
  display: flex;
  margin: 0 15%;
  font-weight: bold;
  p {
    margin-right: 2%;
  }
`

const Point = styled.div`
  /* background-color: green; */
  display: flex;
  width: 100%;
  margin: 0 15%;
  font-weight: bold;
  p {
    margin-right: 2%;
  }
`

const Desc = styled.div`
  width: 100%;
  display: flex;
  margin: 0 15%;
  font-weight: bold;
  p {
    margin-right: 2%;
  }
`

const Map = styled.div`
  /* position: absolute; */
  width: 50%;
  height: 25vh;
  margin: 10% 25%;
  background-color: wheat;
`
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { __getPromise } from "../../../redux/modules/promise";

const PromiseList = ({day}) => {
  const navigate = useNavigate();
  const dispatch= useDispatch();
  const promiseList = useSelector((state)=>state.promise);
  useEffect(()=>{
    dispatch(__getPromise(day));
  },[day])

  return (
    <>
      <Wrap>
        <div>
          <p style={{fontWeight:"bold"}}>약속 목록</p>
        </div>
        {promiseList?.data?.data?.map((promise)=>{
          return (
            <PromiseCard key={promise.id} onClick={()=>{navigate(`/detailpromise/${promise.id}`)}}>
          <div style={{display:"flex"}}>
            <p style={{fontWeight:"bold"}}>{promise.title}</p>
            {/* 포인트 받아야할듯 */}
            <Point>P</Point>
            <p style={{fontWeight:"400"}}>{promise.memberCount}</p>
          </div>
          <div style={{display:"flex"}}>
            {/* 날짜 통일감 없어서 구분하기 어렵 */}
            <p style={{fontSize:"15px", marginRight:"10px"}}>{promise.eventDateTime}</p>
            <p style={{fontSize:"15px"}}>{promise.place}</p>
            <LastTime>{promise.lastTime}</LastTime>
          </div>
        </PromiseCard>
          )
        })}
      </Wrap>
    </>    
  )
}

export default PromiseList;

const Wrap = styled.div`
  /* background-color: skyblue; */
  width: 80%;
  margin: 20px auto;
`

const PromiseCard = styled.div`
  background-color: #F7FBF7;
  margin: 10px 0;
  padding: 0 10px;
  border-radius: 4px; //4px로 주면 너무 각이 져 있는 느낌인뎅... 오또카지
`

const Point = styled.p`
  background-color: #6D09D1;
  color: white;
  border-radius: 50%;
  width: 20px;
  text-align: center;
  margin-left: auto;
  margin-right: 2px;
`

const LastTime = styled.p`
  text-align: center;
  margin-left: auto;
  margin-right: 2px;
`
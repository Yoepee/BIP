import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { __getPromise } from "../../../redux/modules/promise";
const PromiseList = ({day}) => {
  const dispatch= useDispatch();
  const promiseList = useSelector((state)=>state.promise);
  useEffect(()=>{
    dispatch(__getPromise(day));
  },[day])

  return (
    <div>
      약속 목록
      <PromiseCard>
        <div style={{display:"flex"}}>
          <p>채원이 생일파티</p>
          <p style={{marginLeft:"auto"}}>P</p>
          <p>포인트</p>
        </div>
        <div style={{display:"flex"}}>
          <p>오후 몇시 몇분</p>
          <p>원주 반곡동 투썸플레이스</p>
        </div>
      </PromiseCard>
    </div>
  )
}

export default PromiseList;

const PromiseCard = styled.div`
border: 1px solid black;
margin: 10px;
`
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Footer from "../components/footer/Footer";
import { useNavigate } from "react-router-dom";
import PromiseList from "../components/main/list/PromiseList";
import dayjs from "dayjs";
import Monthly from "../components/main/calendar/Monthly";
import CreateIcon from '@mui/icons-material/Create';
import { useDispatch } from "react-redux";
import { __getPromise } from "../redux/modules/promise";
import Week from "../components/main/calendar/Week";
import Header from ".././components/header/Header";

const MonthlyPage = () => {
  const dispatch = useDispatch();
  // 약속 리스트 불러오기 데이터 값
  const [day, setDay] = useState({unit:"day",date:dayjs().format('YYYY-MM-DD-00-00-00')})
  // 케로셀 페이지 변경 확인 용도
  const [page, setPage] = useState(0);

  const navigate = useNavigate();
  useEffect(()=>{
    dispatch(__getPromise(day));
  },[day])
  console.log(day)
    return (
      <>
        <Wrap>
            
            <Header  head={""} option={0}/>
            <div><Monthly setDay={setDay} day={day}/></div>
            {/* 약속 리스트 불러오기 */}
            {day.unit!=="month"?
            <PromiseList day={day}/>
            :null}
        </Wrap>
        {/* 약속 추가하기 */}
        <Plus>
            <IconBtn onClick={() => { navigate("/addpromise") }}><CreateIcon style={{color:"#6D09D1"}} /></IconBtn>
          </Plus>
          {/* 푸터메뉴 1번째 항목 선택 (0,1,2,3) */}
        <Footer/>
        <div style={{height:"50px"}}></div>
      </>
    )
}


export default MonthlyPage;

const Wrap = styled.div`
  /* background-color: whitesmoke; */
  padding: 10% 0;
  font-family: "NotoSansKR-Regular";
  /* font-family: "YUniverse-B"; */
  /* font-family: "YiSunShin-M"; */
  /* font-family: "Hambak"; */
  /* font-family: "GowunDodum"; */
  /* font-family: "Mimiworld-B"; */
  /* font-family: "Mimiworld-R"; */
`
const Plus = styled.div`
position : fixed;
bottom : 0;
right: 5%;
margin-bottom:20%;
`

const IconBtn = styled.div`
display:flex;
justify-content:center;
align-items:center;
border: 1.5px solid #6D09D1;
border-radius:50%;
background-color: white;
width: 40px;
height: 40px;
color:white;
cursor:pointer;
//위치 고정시키기
position: fixed;
right: 10%;
bottom: 15%;
`
const StHeaderContainer = styled.div`
  max-width: 450px;
  height: 214px;
  position: relative;
  margin-bottom: 20px;

  & .topContainer {
    display: flex;
    justify-content: center;
    & .headerTitle {
      color: #ffffff;
      position: absolute;
      top: 47px;
      font-weight: 700;
      font-size: 18px;
      line-height: 21px;
    }
  }

  & .calendarContainer {
    position: relative;
    top: -165px;
    right: -85%;
    background-color: #fff;
    border-radius: 4px;
    width: 24px;
    height: 24px;
    padding-left: 4px;
    padding-top: 4px;
  }
`;
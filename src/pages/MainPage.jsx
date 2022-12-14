import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Footer from "../components/footer/Footer";
import { useNavigate } from "react-router-dom";
import PromiseList from "../components/main/list/PromiseList";
import dayjs from "dayjs";
import CreateIcon from '@mui/icons-material/Create';
import { useDispatch } from "react-redux";
import { __getPromise } from "../redux/modules/promise";
import Week from "../components/main/calendar/Week";
import axios from "axios";
import WebHeader from "../components/header/WebHeader";
import logo1 from "../img/logo/blueberrymain.png"

const MainPage = () => {
  const dispatch = useDispatch();
  // 약속 리스트 불러오기 데이터 값
  const [day, setDay] = useState({unit:"day",date:dayjs().format('YYYY-MM-DD-00-00-00')})

  const navigate = useNavigate();
  useEffect(()=>{
    __isToken().then(()=>{
    dispatch(__getPromise(day));
    })
  },[day])

  const __isToken = async () => {
    await axios.get(process.env.REACT_APP_SERVER_HOST + `/api/member/reissue`, {
        headers: {
            Authorization: localStorage.getItem('Authorization'),
            RefreshToken: localStorage.getItem('RefreshToken'),
        }
    }
    ).then((res) => {
        if(res.data.success){
            localStorage.setItem("Authorization", res.headers.authorization);
            localStorage.setItem("RefreshToken", res.headers.refreshtoken);
        }
    })
  }
    return (
      <>
        <Wrap>
          <LogoImg src={logo1} width="84px" onClick={() => { navigate("/") }} style={{margin:"20px 0 0 20px"}}/>
            <WebHeader />
            <StHeaderContainer>
            <Week day={day} setDay={setDay}/>
            </StHeaderContainer>
            {/* 약속 리스트 불러오기 */}
            {day.unit!=="month"?
            <PromiseList day={day}/>
            :null}
        </Wrap>
        {/* 약속 추가하기 */}
        <Plus>
            <IconBtn onClick={() => { navigate("/addpromise") }}><CreateIcon style={{color:"#3E09D1"}} /></IconBtn>
          </Plus>
          {/* 푸터메뉴 1번째 항목 선택 (0,1,2,3) */}
        <Footer foot={0}/>
        <div style={{height:"50px"}}></div>
      </>
    )
}


export default MainPage;

const Wrap = styled.div`
  /* background-color: skyblue; */
  /* padding: 20px 0; */

`
const LogoImg = styled.img`
  cursor: pointer;
  @media screen and (min-width: 769px) {
   display:none;
  }
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
border: 1.5px solid #3E09D1;
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
  margin: 30px auto 0 auto;


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
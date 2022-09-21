import React from "react";
import styled from "styled-components";

import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';


const DetailPromise = () => {
  
  return(
    <>
      <Wrap>
        <Title>
          <p>제목</p>
        </Title>
        <When>
          <p>2022년 9월 22일</p>
          <p>오후</p>
          <p>2시</p>
          <p>30분</p>    
        </When>
        <Where>
          <p>강원도 원주시 반곡동 투썸플레이스</p>
        </Where>
        <Point>
          <p>포인트</p>
          <p>300</p>
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
  max-width: 800px;
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
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import dayjs from "dayjs";
import "dayjs/locale/ko"

const Day = ({setDay, page}) => {
  dayjs.locale('ko')
  const today = dayjs().format('YYYY년 MM월 DD일 dddd');
  useEffect(()=>{
    setDay({unit:"day",date:dayjs().format('YYYY-MM-DD-00-00-00')})
  },[]);
  useEffect(()=>{
    if(page===0){
      setDay({unit:"day",date:dayjs().format('YYYY-MM-DD-00-00-00')})
    }
  },[page])
  return(
    <>
      <Today>
        <p>{today}</p>
      </Today>
    </>
  )
}

export default Day;

const Today = styled.div`
  width: 60%;
  border: 1px solid gray;
  border-radius: 5px;
  padding: 0 2%;
  margin: 0 auto;
  font-weight: bold;
`
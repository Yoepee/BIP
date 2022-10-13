import styled from "styled-components";
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";


const Week = (value) => {
  const navigate = useNavigate();
  const [ clickDay, setClickDay ] = useState(null);

  useEffect(() => {
    // return () => console.log("Clean up");
  }, []);

  const week = useRef(null);

  //날짜 클릭시 해당날짜 데이터 보내기
  const clickDate = (clickDate) => {
    setClickDay(clickDate);   // 클릭한 날짜 배경색주기
  };

  const [past, setPast] = useState(0);
  const [future, setFuture] = useState(7);


  let weekDate = [];
  let now = new Date();
  const yyyy = now.getFullYear();
  const mm = now.getMonth();
  const dd = now.getDate();

  for (let i = past; i < future; i++) {
    let weekCal = new Date(now.setFullYear(yyyy, mm, dd + i));
    weekDate.push({
      year: weekCal.getFullYear(),
      month: weekCal.toLocaleString("ko-KR", { month: "long" }),
      date: weekCal.getDate(),
      day: weekCal.toLocaleString("ko-KR", { weekday: "long" }).slice(0,1),
      back: new Date(now.getTime() - now.getTimezoneOffset() * 60000)
        .toISOString()
        .slice(0, 10),
    });
  }

  //weekbar 양옆 버튼 누를 때마다 6일짜리 돌아감
  const changeFuture = () => {
    setPast(past + 7);
    setFuture(future + 7);
  };
  const changePast = () => {
    setPast(past - 7);
    setFuture(future - 7);
  };

  //today 표시
  const getToday = () => {
    let month = ("0" + (mm + 1)).slice(-2);
    let day = ("0" + dd).slice(-2);
    return yyyy + "-" + month + "-" + day;
  };

  useEffect(()=>{
    value.setDay({...value.day, date: `${weekDate[0].back}-00-00-00`})
  },[])

  return (
    <STWeekCalendar>
      <STCalendar>
        <div className="Month">{weekDate[0].year}년 {weekDate[0].month}</div>
        <div onClick={()=>{navigate("/monthly")}}>
        <CalendarMonthIcon style={{ color: "#3E09D1", cursor:"pointer"}} />
        </div>
      </STCalendar>
      <STDayContainer>
        <div className="daylistContainer">
          <button>
            <ArrowBackIosNewRoundedIcon
              onClick={changePast}
              style={{color:"#3E09D1"}}
            />
          </button>
          <div>
            {weekDate.map((weekday, i) => {
              return (
                <div className="daylistSelector" key={i}>
                  <input
                    type="radio"
                    id={weekday.date}
                    name={value}
                    value={weekday.date}
                    checked={clickDay === weekday.back}
                    onChange={() => {
                      clickDate(weekday.back);
                      value.setDay({...value.day, date: `${weekday.back}-00-00-00`})
                    }}
                  />
                  <STLabel
                    htmlFor={weekday.date}
                    className={getToday() === weekday.back && "isToday"}
                  >
                    <span className="weekday">{weekday.day}</span>
                    <span className="weekdate">{weekday.date}</span>
                  </STLabel>
                </div>
              );
            })}
          </div>
          <button>
            <ArrowForwardIosRoundedIcon
              onClick={changeFuture}
              style={{color:"#3E09D1"}}
            />
          </button>
        </div>
      </STDayContainer>
    </STWeekCalendar>
  );
};

export default Week;

const STWeekCalendar = styled.div`
  position: absolute;
  width: 100%;
  min-width: 400px;
  bottom: 100px;
`;

const STCalendar = styled.div`
  width: 140px;
  display: flex;
  justify-content: center;
  margin: 0 auto;
  & .Month {
    /* background-color: #fbfbfb; */
    /* border-radius: 6px; */
    padding: 6px 10px;
    font-weight: 700;
    font-size: 16px;
    line-height: 12px;
    text-align: center;
    color: #3E09D1;
    margin-bottom: 12px;
  }
`;

/* 주간캘린더 일전체 컨테이너 */
const STDayContainer = styled.div`
  justify-content: center;
  align-content: center;
  text-align: center;
  height: 3.5rem;
  font-size: 14px;
  

  & .daylistContainer {
    
    display: flex;
    justify-content: space-between;
    position: relative;

    & button {
      position: relative;
      right: 30px;
      top: 15px;
      border: none;
      width: 22px;
      height: 22px;
      border-radius: 50%;
      background: transparent;
      /* box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.08); */
      cursor: pointer;
      &:nth-child(1) {
        left: 20px;
        top: 15px;
      }
    }
  }
  /* 하루짜리 날짜 배열 Daylist */
  & .daylistSelector {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    float: left;
    margin-right: 4px;
    width: 40px;
    height: 60px;
    border-radius: 8px;
    //클릭시 색 변하기
    & input:checked + label {
      background-color: #3E09D1;
      color: white;
    }

    //마지막일자는 margin빼기
    &:last-child {
      margin-right: 0;
    }
//input창 가리기
    & input {
      display: none;
      position: absolute;
      width: 0;
      height: 0;
      padding: 0;
      overflow: hidden;
      border: 0;
    }
  }
`;
const STLabel = styled.label`
  display: flex;
  flex-direction: column;
  justify-content: center;
  cursor: pointer;
  width: 40px;
  height: 60px;
  border-radius: 8px;
  background-color: #ffffff;
  color: #999999;
  box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.08);
  font-weight: 600;

  //today표현
  &.isToday {
  background-color: #D9DCFB;
  color: #292929;
  }
  & .weekday {
    font-size: 10px;
    line-height: 12px;
  }
  & .weekdate {
    font-size: 14px;
    line-height: 17px;
  }
  //마우스 올렸을 때
  &:hover {
    background: #3E09D1;
    color: white;
  }
`;
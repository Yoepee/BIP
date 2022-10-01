import useDate from "../../../hooks/useDate";
import useWeek from "../../../hooks/useWeek"
import styled from "styled-components";
import { useEffect, useState } from "react";
import dayjs from "dayjs";



const NextMonth = ({setDay, page}) => {
  const now = new Date();
  const onedayWeek = new Date(now.getFullYear(), now.getMonth()+1, 1).getDay();
  const oneday = new Date(now.getFullYear(), now.getMonth()+1, 1).getDate();
  const lastday = new Date(now.getFullYear(), now.getMonth() + 2, 0).getDate();

  const CalendarDay = useDate(oneday, lastday, lastday);
  const CalendarWeek = useWeek(onedayWeek, lastday);

  // 선택한 날짜 확인
  const [chk, setChk] = useState({
    day:oneday,
    week:useWeek(onedayWeek, 1)[0]
  });
  // 배열로 오브젝트 형식으로 요일, 날짜 저장 
  const result = [];

  for (let i = 0; i < lastday; i++) {
    result.push({ week: CalendarWeek[i], day: CalendarDay[i] })
  }

  useEffect(()=>{
    if(page===3)
      if(Number(chk.day)<10){
        setDay({unit:"month",date:dayjs(new Date(now.getFullYear(), now.getMonth()+1, chk.day)).format(`YYYY-MM-0${chk.day}-00-00-00`)});
      }else{
      setDay({unit:"month",date:dayjs(new Date(now.getFullYear(), now.getMonth()+1, chk.day)).format(`YYYY-MM-${chk.day}-00-00-00`)})
      }
  },[chk]);

  useEffect(()=>{
    if(page===3){
      if(Number(chk.day)<10){
        setDay({unit:"month",date:dayjs(new Date(now.getFullYear(), now.getMonth()+1, chk.day)).format(`YYYY-MM-0${chk.day}-00-00-00`)});
      }else{
        setDay({unit:"month",date:dayjs(new Date(now.getFullYear(), now.getMonth()+1, chk.day)).format(`YYYY-MM-${chk.day}-00-00-00`)})
      }
    }
  },[page])

  return (
    <Wrap style={{ display: "flex", justifyContent: "center" }}>
      <div>
        <div style={{ display: "flex", justifyContent: "center", marginBottom:"3%", fontWeight:"bold"}}>
          <p>{dayjs(new Date(now.getFullYear(), now.getMonth()+1, chk.day)).format("YYYY년")}</p>
          <p>{dayjs(new Date(now.getFullYear(), now.getMonth()+1, chk.day)).format("MM월")}</p>
        </div>
        <div style={{ display: "flex" }}>
          <Datediv>
            {chk.week==="월"?
            <WeekDiv style={{backgroundColor:"#F5EAFB"}}>월</WeekDiv>:<WeekDiv>월</WeekDiv>}
            {chk.week==="화"?
            <WeekDiv style={{backgroundColor:"#F5EAFB"}}>화</WeekDiv>:<WeekDiv>화</WeekDiv>}
            {chk.week==="수"?
            <WeekDiv style={{backgroundColor:"#F5EAFB"}}>수</WeekDiv>:<WeekDiv>수</WeekDiv>}
            {chk.week==="목"?
            <WeekDiv style={{backgroundColor:"#F5EAFB"}}>목</WeekDiv>:<WeekDiv>목</WeekDiv>}
            {chk.week==="금"?
            <WeekDiv style={{backgroundColor:"#F5EAFB"}}>금</WeekDiv>:<WeekDiv>금</WeekDiv>}
            {chk.week==="토"?
            <WeekDiv style={{backgroundColor:"#F5EAFB"}}>토</WeekDiv>:<WeekDiv>토</WeekDiv>}
            {chk.week==="일"?
            <WeekDiv style={{backgroundColor:"#F5EAFB", color: "red"}}>일</WeekDiv>:<WeekDiv style={{color: "red"}}>일</WeekDiv>}
            {onedayWeek === 0 ?
              null
              : new Array(onedayWeek - 1).fill("　").map((a,i) => {
                return (
                  <div key={i}>{a}</div>
                )
              })
            }
            {result.map((calendar, index) => {
              return (
                <div key={index}>
                  {chk.day === calendar.day ?
                    <DayDiv style={{ backgroundColor:"#EDFFEB" }}
                      onClick={() => { setChk({day:calendar.day, week: calendar.week}) }}>
                      {calendar.week === "일" ?
                        <div style={{ color: "red" }}>{calendar.day}</div>
                        : <div>{calendar.day}</div>}
                    </DayDiv>
                    : <DayDiv
                      onClick={() => { setChk({day:calendar.day, week: calendar.week}) }}>
                      {calendar.week === "일" ?
                        <div style={{ color: "red" }}>{calendar.day}</div>
                        : <div>{calendar.day}</div>}
                    </DayDiv>}
                </div>
              )
            })}
          </Datediv>
        </div>
      </div>
    </Wrap>
  )
}

export default NextMonth;

const Wrap = styled.div` 
  margin: 0 auto;
`

const DayDiv = styled.div`
/* background-color: pink; */
  width: 20px;
  height: 20px;
  text-align: center;
  margin: 1.5vw;
  padding: 10px;
  border-radius: 20px;
  cursor: pointer;
  font-weight: bold;
  &:hover{
    color:black;
    background-color:#EDFFEB;
}
`

const Datediv = styled.div`
  display:grid;
  grid-template-columns: repeat(7,1fr);
  place-items: center;
`

const WeekDiv = styled.div`
/* background-color: pink; */
  width: 20px;
  height: 20px;
  text-align: center;
  margin: 1.5vw;
  padding: 10px;
  border-radius: 20px;
  cursor: default;
  font-weight: bold;
`
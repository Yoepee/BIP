import moment from "moment"
import useDate from "../../../hooks/useDate";
import useWeak from "../../../hooks/useWeak"
import styled from "styled-components";
import { useState } from "react";


const Test = () => {
  const now = new Date();
  const onedayWeak = new Date(now.getFullYear(), now.getMonth(), 1).getDay();
  const oneday = new Date(now.getFullYear(), now.getMonth(), 1).getDate();
  const lastday = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();

  const CalendarDay = useDate(oneday, lastday, lastday);
  const CalendarWeak = useWeak(onedayWeak, lastday);

  // 선택한 날짜 확인
  const [chk, setChk] = useState({
    day:now.getDate(),
    weak:useWeak(now.getDay(), 1)[0]
  });
  // 배열로 오브젝트 형식으로 요일, 날짜 저장 
  const result = [];

  for (let i = 0; i < lastday; i++) {
    result.push({ weak: CalendarWeak[i], day: CalendarDay[i] })
  }

  console.log(chk)

  return (
    <Wrap style={{ display: "flex", justifyContent: "center" }}>
      <div>
        <div style={{ display: "flex", justifyContent: "center", marginBottom:"3%", fontWeight:"bold"}}>
          <p>{moment(now).format("YYYY년")}</p>
          <p>{moment(now).format("MM월")}</p>
        </div>
        <div style={{ display: "flex" }}>
          <Datediv>
            {chk.weak==="월"?
            <WeakDiv style={{backgroundColor:"pink"}}>월</WeakDiv>:<WeakDiv>월</WeakDiv>}
            {chk.weak==="화"?
            <WeakDiv style={{backgroundColor:"pink"}}>화</WeakDiv>:<WeakDiv>화</WeakDiv>}
            {chk.weak==="수"?
            <WeakDiv style={{backgroundColor:"pink"}}>수</WeakDiv>:<WeakDiv>수</WeakDiv>}
            {chk.weak==="목"?
            <WeakDiv style={{backgroundColor:"pink"}}>목</WeakDiv>:<WeakDiv>목</WeakDiv>}
            {chk.weak==="금"?
            <WeakDiv style={{backgroundColor:"pink"}}>금</WeakDiv>:<WeakDiv>금</WeakDiv>}
            {chk.weak==="토"?
            <WeakDiv style={{backgroundColor:"pink"}}>토</WeakDiv>:<WeakDiv>토</WeakDiv>}
            {chk.weak==="일"?
            <WeakDiv style={{backgroundColor:"pink", color: "red"}}>일</WeakDiv>:<WeakDiv style={{color: "red"}}>일</WeakDiv>}
            {onedayWeak === 0 ?
              null
              : new Array(onedayWeak - 1).fill("　").map((a,i) => {
                return (
                  <div key={i}>{a}</div>
                )
              })
            }
            {result.map((calendar, index) => {
              return (
                <div key={index}>
                  {chk.day === calendar.day ?
                    <DayDiv style={{ border: "1px solid black" }}
                      onClick={() => { setChk({day:calendar.day, weak: calendar.weak}) }}>
                      {calendar.weak === "일" ?
                        <div style={{ color: "red" }}>{calendar.day}</div>
                        : <div>{calendar.day}</div>}
                    </DayDiv>
                    : <DayDiv
                      onClick={() => { setChk({day:calendar.day, weak: calendar.weak}) }}>
                      {calendar.weak === "일" ?
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

export default Test;

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
    color:white;
    background-color:black;
}
`

const Datediv = styled.div`
  display:grid;
  grid-template-columns: repeat(7,1fr);
  place-items: center;
`

const WeakDiv = styled.div`
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
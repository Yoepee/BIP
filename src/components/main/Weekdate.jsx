import { useRef, useState } from "react";
import moment from "moment"
import useDate from "../../hooks/useDate";
import useWeak from "../../hooks/useWeak"
import styled from "styled-components";

import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';

const Weekdate = () => {
  const now = new Date();
  const todayWeak = now.getDay();
  const today = now.getDate();
  const lastday = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();

  const CalendarDay = useDate(today, lastday);
  const CalendarWeak = useWeak(todayWeak);

  const result = [];

  const [chk, setChk] = useState(today)

  for (let i = 0; i < 7; i++) {
    result.push({ weak: CalendarWeak[i], day: CalendarDay[i] })
  }
  const onPrev = () =>{
    let index = CalendarDay.findIndex((i) => i===chk)
    if(index>0)
    {
      setChk(CalendarDay[index-1]);
    }
  }
  const onNext = () =>{
    let index = CalendarDay.findIndex((i) => i===chk)
    if(index<CalendarDay.length-1)
    {
      setChk(CalendarDay[index+1]);
    }
  }
  return (
    <Wrap style={{display:"flex", justifyContent:"center"}}>
      <div>
        <div style={{ display: "flex" }}>
          <p>{moment(now).format("YYYY년")}</p>
          <p>{moment(now).format("MM월")}</p>
        </div>
        <div style={{ display: "flex" }}>
          <div style={{ display: "flex", alignItems:"center"}}>
            <IconP onClick={()=>{onPrev()}}>
              <ArrowBackIosNewRoundedIcon/>
            </IconP>
          </div>
          {result.map((calendar, index) => {
            return (
              <div key={index}>
                {chk === calendar.day ?
                  <DayDiv style={{ border: "1px solid black" }}
                  onClick={()=>{setChk(calendar.day)}}>
                    {calendar.weak === "일" ?                  
                      <div style={{ color: "red" }}>
                        {calendar.weak}
                      </div>
                    :
                      <div>
                        {calendar.weak}
                      </div>
                    }
                    <div>{calendar.day}</div>
                  </DayDiv>
                  : <DayDiv onClick={()=>{setChk(calendar.day)}}>
                    {calendar.weak === "일" ?
                      <div style={{ color: "red" }}>
                        {calendar.weak}
                      </div>
                    :
                      <div>
                        {calendar.weak}
                      </div>
                    }
                    <div>{calendar.day}</div>
                  </DayDiv>
                }
              </div>
            )
          })}
          <div style={{ display: "flex", alignItems:"center"}}>
            <IconP onClick={()=>{onNext()}}>
              <ArrowForwardIosRoundedIcon/>
            </IconP>
          </div>
        </div>
      </div>
    </Wrap>
  )
}

export default Weekdate;

const Wrap = styled.div`
  margin: 0 auto;
`

const DayDiv = styled.div`
margin:20px;
padding 10px;
border-radius: 20px;
cursor: pointer;
font-weight: bold;
&:hover{
  color:white;
  background-color:black;
}
`

const IconP = styled.p`
background-color:black;
color:white;
padding:5px;
border-radius:50%;
cursor:pointer;
`
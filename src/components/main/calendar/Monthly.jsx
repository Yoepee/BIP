import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useDispatch, useSelector } from "react-redux";
import { __getPromise } from "../../../redux/modules/promise";
import { __getMonth } from "../../../redux/modules/month";
import axios from "axios";

const Calendar = ({ setDay, day }) => {
  const dispatch = useDispatch();
  //day
  const dayjs = require('dayjs');
  const weekday = require('dayjs/plugin/weekday');
  const isoWeek = require('dayjs/plugin/isoWeek');
  const weekOfYear = require('dayjs/plugin/weekOfYear');
  // day extend
  dayjs.extend(weekday);
  dayjs.extend(isoWeek);
  dayjs.extend(weekOfYear);

  const monthList = useSelector((state) => state.month);

  const __isToken = async () => {
    await axios.get(process.env.REACT_APP_SERVER_HOST + `/api/member/reissue`, {
      headers: {
        Authorization: localStorage.getItem('Authorization'),
        RefreshToken: localStorage.getItem('RefreshToken'),
      }
    }
    ).then((res) => {
      if (res.data.success) {
        localStorage.setItem("Authorization", res.headers.authorization);
        localStorage.setItem("RefreshToken", res.headers.refreshtoken);
      }
    })
  }

  const today = dayjs();
  const [viewDate, setViewDate] = useState(dayjs());
  const [selectDate, setSelectDate] = useState(dayjs());

  useEffect(() => {
    __isToken().then(() => {
      dispatch(__getMonth({ unit: "month", date: selectDate.format('YYYY-MM-DD-00-00-00') }))
      dispatch(__getPromise({ unit: "day", date: selectDate.format('YYYY-MM-DD-00-00-00') }))
    });
  }, [selectDate])

  let e = monthList?.data?.data?.map((a) => `${a.eventDateTime.split("-")[1]}-${a.eventDateTime.split("-")[2]}-${a.eventDateTime.split("-")[0]}`)
  const createCalendar = () => {
    const startWeek = viewDate.startOf('month').week();
    const endWeek = viewDate.endOf('month').week() === 1 ? 53 : viewDate.endOf('month').week();
    let calender = [];


    for (let week = startWeek; week <= endWeek; week++) {
      calender.push(
        <div className="row" key={week}>
          {Array(7).fill(0).map((n, i) => {
            let current = viewDate.startOf('week').week(week).add(n + i, 'day');
            if (viewDate.format('MM') === '12') {
              current = viewDate.startOf('week').week(week - 52).add(n + i, 'day');
            }
            // 현재 날짜 (기준)
            let isSelected = selectDate.format('YYYYMMDD') === current.format('YYYYMMDD') ? 'selected' : '';
            let isToday = today.format('YYYYMMDD') === current.format('YYYYMMDD') ? 'today' : '';
            let isNone = current.format('MM') === viewDate.format('MM') ? '' : 'none';
            let test = monthList?.data?.data?.map((a) => `${a.eventDateTime.split("-")[2]}-${a.eventDateTime.split("-")[1]}-${a.eventDateTime.split("-")[0]}`)
            let isPromise = test?.find((x) => x === String(current.format("DD-MM-YYYY"))) ? 'promise' : "";

            return (
              <div className={`box`} key={`${week}_${i}`} >
                <div className={`text ${isSelected} ${isToday} ${isNone} ${isPromise}`} onClick={() => { setSelectDate(current) }}>
                  <span className={`day`}>{current.format('D')}</span>
                  {isToday ? (<span className="isToday"></span>)
                    : isSelected ? (<span className="isSelected"></span>) : null}
                </div>
              </div >
            )
          })
          }
        </div >);
    }
    return calender;
  };

  const changegeMonth = (date, changeString) => {
    switch (changeString) {
      case 'add':
        return setViewDate(viewDate.add(1, 'month'));
      case 'subtract':
        return setViewDate(viewDate.subtract(1, 'month'));
      default:
        return date;
    }
  };

  return (
    <>
      <StyledHeader>
        <div onClick={() => changegeMonth(viewDate, 'subtract')}><ArrowBackIosNewIcon /></div>
        <span className="thisMonth">{viewDate.format("YYYY년 MM월")}</span>
        <div onClick={() => changegeMonth(viewDate, 'add')}><ArrowForwardIosIcon /></div>
      </StyledHeader>
      <StyledBody>
        <div className="row week">
          <div className="box"><span className="text">일</span></div>
          <div className="box"><span className="text">월</span></div>
          <div className="box"><span className="text">화</span></div>
          <div className="box"><span className="text">수</span></div>
          <div className="box"><span className="text">목</span></div>
          <div className="box"><span className="text">금</span></div>
          <div className="box"><span className="text">토</span></div>
        </div>
        <div>
          {createCalendar()}
        </div>
      </StyledBody>
    </>
  )
};
export default Calendar;


const StyledHeader = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  margin: 20px;

  .thisMonth{
    font-size: 20px;
    font-weight: 700;
    color: #3E09D1;
    line-height: 20px;
    margin-bottom: 30px;
  }
  div{
    margin: 0 10%;
    color: #3E09D1;
    cursor: pointer;

  }
`

const StyledBody = styled.div`
  width: 80%;
  min-width: 320px;
  max-width: 600px;
  text-align: center;
  margin: 20px auto;
  .row{
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    width: 100%;
  }
  .row.week{
    height: 18px;
    border-bottom: 1px solid #D9DCFB;
    font-weight: 600;
  }
  .box{
    width: 32px;
    height: 32px;
    margin: 6px 6px;
    font-size: 14px;
  }
  .text{
    position: static;
    width: 32px;
    height: 32px;
    color: #292929;
  }
  .holiday,
  .grayed{
    color: #484848;
    pointer-events: none;
  }
  .day{
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
  }
  .selected{
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background : #D9DCFB;
    font-weight: 700;
    color: white;
  }
  .promise{
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background : #EDFFEB;
    font-weight: 700;
    /* color: #fff; */
  }
  .today{
    border-radius: 50%;
    font-weight: 700;
    background : #D9DCFB;
    /* border: 1px solid #3E09D1; */
  }
  .isSelected{
    position: relative;
    color: #D9DCFB;
    font-size: 10px;
    font-weight: 400;
  }
  .isToday{
    position: relative;
    color: #292929;
    font-size: 10px;
    font-weight: 400;
  }
  .none{
    display: none;
  }
`;

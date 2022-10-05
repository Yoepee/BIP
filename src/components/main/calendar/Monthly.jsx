import React, { useState } from "react";
import styled from "styled-components";
import previous from '../../../img/calendar/previous_arrow.svg';
import next from '../../../img/calendar/next_arrow.svg';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

const Calendar = () => {
    
    //day
    const dayjs = require('dayjs');
    const weekday = require('dayjs/plugin/weekday');
    const isoWeek = require('dayjs/plugin/isoWeek');
    const weekOfYear = require('dayjs/plugin/weekOfYear');
    // day extend
    dayjs.extend(weekday);
    dayjs.extend(isoWeek);
    dayjs.extend(weekOfYear);

    const today = dayjs();
    const [viewDate, setViewDate] = useState(dayjs());
    const [selectDate, setSelectDate] = useState(dayjs());

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
                return (
                  <>
                    <div className={`box`} key={`${week}_${i}`} >
                      <div className={`text ${isSelected} ${isToday} ${isNone}`} onClick={() => { setSelectDate(current) }}>
                        <span className={`day`}>{current.format('D')}</span>
                        {isToday ? (<span className="isToday">오늘</span>)
                          : isSelected ? (<span className="isSelected"></span>) : null}
                      </div>
                    </div >
                  </>
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
        <div onClick={() => changegeMonth(viewDate, 'subtract')}><ArrowBackIosNewIcon/></div>
        <span className="thisMonth">{viewDate.format("YYYY년 MM월")}</span>
        <div onClick={() => changegeMonth(viewDate, 'add')}><ArrowForwardIosIcon/></div>
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


const StyledHeader = styled.div `
  display: flex;
  justify-content: center;
  align-content: center;
  margin: 20px;

  .thisMonth{
    font-size: 18px;
    font-weight: 700;
    color: #292929;
    line-height: 24px;
  }
  div{
    margin: 0 10%;
    color: #292929;
    cursor: pointer;

  }
`

const StyledBody = styled.div `
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
    color: #fff;
  }
  .today{
    border-radius: 50%;
    font-weight: 700;
    color: #292929;
    background : #D9DCFB;
  }
  .isSelected{
    position: relative;
    color: pink;
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

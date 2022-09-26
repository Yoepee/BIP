import React, { useEffect, useState } from "react";
import styled from "styled-components";

import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

import Button from '@mui/material/Button';

import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // css import

import dayjs from "dayjs";
dayjs.locale("ko")

const AddPromise = ({promise, setPromise, onChangeHandler}) => {
  const [check, setCheck] = useState(false);
  const [date, setDate] = useState(new Date());
  const [am, setAm] = useState(true);

  const initialState = {
    hour:"",
    min:""
  }
  const [time,setTime] = useState(initialState)
  useEffect(() => {
    setCheck(false);
  }, [date])

  const onChange = (e) => {
    const {name, value} = e.target;
    setTime({...time, [name]: value.replace(/[^0-9]/g, "")})
  }
  if(Number(time.min)>59){
    setTime({...time, min: 59})
  }
  if(Number(time.hour)>12){
    setTime({...time, hour: 12})
  }else if(Number(time.hour)<1 && time.hour!==""){
    setTime({...time, hour: 1})
  }

  useEffect(()=>{
    if(!am){
      if(time.hour==="12"){
        setPromise({...promise,eventDateTime: dayjs(date).format(`YYYY-MM-DD-${Number(time.hour)}-${time.min}-00`)});
      }else{
        setPromise({...promise,eventDateTime: dayjs(date).format(`YYYY-MM-DD-${Number(time.hour)+12}-${time.min}-00`)});
      }
    }else{
      if(time.hour==="12"){
        setPromise({...promise,eventDateTime: dayjs(date).format(`YYYY-MM-DD-${Number(time.hour)-12}-${time.min}-00`)});
      }else{
      setPromise({...promise,eventDateTime: dayjs(date).format(`YYYY-MM-DD-${time.hour}-${time.min}-00`)});
      }
    }
  },[time, date, am])
  return (
    <>
      <Wrap>
        <div>
          <Input type="text" placeholder="제목" name="title" value={promise.title} onChange={onChangeHandler} />
        </div>
        <When>
          <div onClick={()=>{setCheck(!check)}}>
            <p><CalendarMonthIcon /></p>
          </div>
          <div>
            {dayjs(date).format('YYYY.MM.DD dd')}
          </div>
          <div>
            <div>
              {am?<>
              <Button style={{ color: "black"  ,backgroundColor:"#F5EAFB" }} onClick={()=>{setAm(true)}}>오전</Button>
              <Button style={{ color: "black" }} onClick={()=>{setAm(false)}}>오후</Button>
              </>
              :<>
              <Button style={{ color: "black" }} onClick={()=>{setAm(true)}}>오전</Button>
              <Button style={{ color: "black", backgroundColor:"#F5EAFB" }} onClick={()=>{setAm(false)}}>오후</Button>
              </>}
            </div>
          </div>
          <div><InputTime type="text" name="hour" value={time.hour} onChange={onChange} min={1} max={12} maxLength={2}/>시</div>
          <div><InputTime type="text"name="min" value={time.min} onChange={onChange} min={0} max={60} maxLength={2}/>분</div>
        </When>
        {check ?
          <div style={{display:"flex", justifyContent:"center"}}>
              <Calendar onChange={setDate} value={date} name="birthDate"/>
          </div>
          : null
        }
        <div>
          <Input type="text" placeholder="장소" name="place" value={promise.place} onChange={onChangeHandler} />
        </div>
        <Point>
          <label style={{ fontWeight: "bold" }}>약속 대상</label>
          <select name="point" value={promise.point} onChange={onChangeHandler}>
            <option value="0">자신과의 약속</option>
            <option value="100">타인과의 약속</option>
            {/* <option value="200">200</option>
            <option value="300">300</option>
            <option value="400">400</option>
            <option value="500">500</option> */}
          </select>
        </Point>
        <div><Input type="text" placeholder="내용" name="content" value={promise.content} onChange={onChangeHandler} /></div>
        <Map>지도(예정)</Map>
      </Wrap>
    </>
  )
}

export default AddPromise;

const Wrap = styled.div`
  /* background-color: pink; */
  margin: 0 auto;
  width: 80vw;
  min-width: 300px;
  max-width: 800px;
  text-align: center;
  position: relative;
`
const Input = styled.input`
  background-color: whitesmoke;
  width: 70%;
  height: 30px;
  border: none;
  margin: 3%;
  border-radius: 5px;
`

const When = styled.div`
  /* background-color: skyblue; */
  width: 70%;
  display: flex;
  margin: 5% 5% 5% 12%;
  justify-content: space-around;
  align-items: center;
`
const InputTime = styled.input`
  width: 30px;
  text-align: center;
  border: none;
  border-bottom: 1px solid black;
  font-weight: bold;
  &:focus{
    outline: none;
  }
`

const Point = styled.div`
  /* background-color: green; */
  display: flex;
  justify-content: center;
`

const Map = styled.div`
  /* position: absolute; */
  width: 50%;
  height: 25vh;
  margin: 0 25%;
  background-color: wheat;
`
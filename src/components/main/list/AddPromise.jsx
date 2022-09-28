import React, { useEffect, useState } from "react";
import styled from "styled-components";

import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

import Button from "@mui/material/Button";

import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css"; // css import

import dayjs from "dayjs";
import KaKaoMap from "../../naverMap/KakaoMap";
import DaumPostcode from 'react-daum-postcode';
dayjs.locale("ko");

const AddPromise = ({
  promise,
  setPromise,
  onChangeHandler,
  onChange,
  time,
  am,
  setAm,
}) => {
  const [check, setCheck] = useState(false);
  const now = new Date();
  const [date, setDate] = useState(now);
  const [modal, setModal] = useState(false);
  const { naver } = window;
  // 주소 검색 함수에 넘겨줄 address 상태 관리
  const initialState = {address:""}
  const [address, setAddress] = useState(initialState);
  const [roadAddress, setRoadAddress] = useState(null);
  // 위도 경도 변경되는 값을 받을 수 있도록 상태 관리.
  const [lat, setLat] = useState(37.5656);
  const [lng, setLng] = useState(126.9769);
  const [openAddr,setOpenAddr] = useState(false)
  
  const searchChange = (e) =>{
    const {name, value} = e.target;
    setAddress({[name]:value});
  }

  const searchAddressToCoordinate = (address) =>{
    console.log(address);
    naver.maps.Service.geocode(
      {
        query:address,
      },
      (status, response)=>{
        if(status!==naver.maps.Service.Status.OK)
          return alert("Something wrong!");
        
        let result = response.v2;
        let items = result.addresses;

        let x = parseFloat(items[0].x);
        let y = parseFloat(items[0].y);

        console.log(x, y)

        setLat(y);
        setLng(x);
        setRoadAddress(items[0].roadAddress);
        setPromise({...promise,place:items[0].roadAddress})
      }
    )
  }

  useEffect(() => {
    setCheck(false);
  }, [date]);

  useEffect(() => {
    if (!am) {
      if (time.hour === "12") {
        if(Number(time.min)<10||time.min==="0"){
          setPromise({
            ...promise,
            eventDateTime: dayjs(date).format(
              `YYYY-MM-DD-${time.hour}-0${time.min}-00`
            ),
          });
        }else{
        setPromise({
          ...promise,
          eventDateTime: dayjs(date).format(
            `YYYY-MM-DD-${time.hour}-${time.min}-00`
          ),
        });}
      } else {
        if(Number(time.min)<10||time.min==="0"){
          setPromise({
            ...promise,
            eventDateTime: dayjs(date).format(
              `YYYY-MM-DD-${Number(time.hour) + 12}-0${time.min}-00`
            ),
          });
        }else{
        setPromise({
          ...promise,
          eventDateTime: dayjs(date).format(
            `YYYY-MM-DD-${Number(time.hour) + 12}-${time.min}-00`
          ),
        });}
      }
    } else {
      if (time.hour === "12") {
        if(Number(time.min)<10||time.min==="0"){
          setPromise({
            ...promise,
            eventDateTime: dayjs(date).format(
              `YYYY-MM-DD-0${Number(time.hour) - 12}-0${time.min}-00`
            ),
          });
        }else{
        setPromise({
          ...promise,
          eventDateTime: dayjs(date).format(
            `YYYY-MM-DD-0${Number(time.hour) - 12}-${time.min}-00`
          ),
        });}
      } else {
        if(Number(time.hour)<10){
          if(Number(time.min)<10||time.min==="0"){
            setPromise({
              ...promise,
              eventDateTime: dayjs(date).format(
                `YYYY-MM-DD-0${time.hour}-0${time.min}-00`
              ),
            });
          }else{
            setPromise({
              ...promise,
              eventDateTime: dayjs(date).format(
                `YYYY-MM-DD-0${time.hour}-${time.min}-00`
              ),
            });
          }
        }else{
          if(Number(time.min)<10||time.min==="0"){
            setPromise({
              ...promise,
              eventDateTime: dayjs(date).format(
                `YYYY-MM-DD-${time.hour}-0${time.min}-00`
              ),
            });
          }else{
            setPromise({
              ...promise,
              eventDateTime: dayjs(date).format(
                `YYYY-MM-DD-${time.hour}-${time.min}-00`
              ),
            });
          }
        }}
    }
  }, [time, date, am]);

  console.log("lat는",lat,"lng는", lng)
  console.log(roadAddress);
  console.log(promise)
  return (
    <>
      <Wrap>
        <UnderLine>
          <Input
            type="text"
            placeholder="제목"
            name="title"
            value={promise.title}
            onChange={onChangeHandler}
          />
        </UnderLine>
        <UnderLine>
          <Input
            type="text"
            placeholder="내용"
            name="content"
            value={promise.content}
            onChange={onChangeHandler}
          />
        </UnderLine>
        <Point>
          <label style={{ fontWeight: "bold" }}>약속 대상</label>
          {/* <select name="point" value={promise.point} onChange={onChangeHandler}>
            <option value="0">자신과의 약속</option>
            <option value="100">타인과의 약속</option>
          </select> */}
          {promise.point==="0" && !modal?
          <div onClick={()=>{setModal(!modal);}} style={{display:"flex"}}>
            <div>자신과의 약속　</div><div style={{color:"#A67EED"}}>▼</div>
          </div>
          :promise.point==="0" && modal?
          <div onClick={()=>{setModal(!modal);}} style={{display:"flex"}}>
            <div>자신과의 약속　</div><div style={{color:"#A67EED"}}>▲</div>
          </div>
          :promise.point=="100" && !modal?
          <div onClick={()=>{setModal(!modal);}} style={{display:"flex"}}>
            <div>타인과의 약속　</div><div style={{color:"#A67EED"}}>▼</div>
            </div>
            :<div onClick={()=>{setModal(!modal);}} style={{display:"flex"}}>
            <div>타인과의 약속　</div><div style={{color:"#A67EED"}}>▲</div>
            </div>}
          {modal  === true ?
            <div style={{
              width: "150px",
              position: "relative",
              backgroundColor: "white",
              top: "30px", right: "110px",
              textAlign: "center",
              borderRadius: "5px",
              border: "1px solid black",
              zIndex:"10"
            }}>
              <OptionMenu 
                onClick={() => {  setPromise({...promise,point:"0"}); setModal(false); }}>자신과의 약속</OptionMenu>
              <OptionMenu
                onClick={() => {  setPromise({...promise,point:"100"}); setModal(false); }}>타인과의 약속</OptionMenu>
            </div>
          :null
        }
        </Point>
        <When>
          <div
            onClick={() => {
              setCheck(!check);
            }}>
            <p>
              <CalendarMonthIcon style={{color:"#A67EED"}}/>
            </p>
          </div>
          <div>{dayjs(date).format("YYYY.MM.DD dd")}</div>
          <div>
            <div>
              {am ? (
                <>
                  <Button
                    style={{ color: "black", backgroundColor: "#F5EAFB" }}
                    onClick={() => {
                      setAm(true);
                    }}>
                    오전
                  </Button>
                  <Button
                    style={{ color: "black" }}
                    onClick={() => {
                      setAm(false);
                    }}>
                    오후
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    style={{ color: "black" }}
                    onClick={() => {
                      setAm(true);
                    }}>
                    오전
                  </Button>
                  <Button
                    style={{ color: "black", backgroundColor: "#F5EAFB" }}
                    onClick={() => {
                      setAm(false);
                    }}>
                    오후
                  </Button>
                </>
              )}
            </div>
          </div>
          <div>
            <InputTime
              type="text"
              name="hour"
              value={time.hour}
              onChange={onChange}
              min={1}
              max={12}
              maxLength={2}
            />
            시
          </div>
          <div>
            <InputTime
              type="text"
              name="min"
              value={time.min}
              onChange={onChange}
              min={0}
              max={60}
              maxLength={2}
            />
            분
          </div>
        </When>
        {check ? (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Calendar onChange={setDate} value={date} name="birthDate" />
          </div>
        ) : null}
        {/* <div>
          <Input
            type="text"
            placeholder="장소"
            name="place"
            value={promise.place}
            onChange={onChangeHandler}
          />
        </div> */}
        <div>
          {openAddr?null:
          <Input
            type="text"
            placeholder="주소 검색"
            name="address"
            value={roadAddress}
            onChange={searchChange}
            onClick={()=>{setOpenAddr(!openAddr)}}
          />
          }
          {openAddr?
          <div style={{position:"relative"}}>
          <button style={{display:"flex", justifyContent:"flex-end"}}
          onClick={()=>{setOpenAddr(false)}}>닫기</button>
          <DaumPostcode
          autoClose={false}
          onComplete={(data)=>{searchAddressToCoordinate(data.address); setOpenAddr(false)}}/>
          </div>
          :null}
          {/* <button onClick = {()=>{searchAddressToCoordinate(address.address)}}
          >검색</button> */}
        </div>

        <Map><KaKaoMap lat={lat} lng={lng}/></Map>
      </Wrap>
    </>
  );
};

export default AddPromise;

const Wrap = styled.div`
  /* background-color: pink; */
  margin: 0 auto;
  width: 80vw;
  min-width: 300px;
  max-width: 800px;
  text-align: center;
  position: relative;
`;

const UnderLine = styled.div`
  
  display: flex;
  align-items: center;
  border-bottom: 1px solid #f5eafb;
  margin: 5% 5% 5% 12%;
  width: 70%;
`
const Input = styled.input`
  outline: none;
  width: 70%;
  height: 30px;
  border: none;
  margin: 3%;
  border-radius: 5px;
`;

const When = styled.div`
  /* background-color: skyblue; */
  width: 70%;
  display: flex;
  margin: 5% 5% 5% 12%;
  justify-content: space-around;
  align-items: center;
`;
const InputTime = styled.input`
  width: 30px;
  text-align: center;
  border: none;
  border-bottom: 1px solid black;
  font-weight: bold;
  &:focus {
    outline: none;
  }
`;

const Point = styled.div`
  border-bottom: 1px solid #f5eafb;
  margin: 5% 5% 5% 12%;
  width: 70%;
  /* background-color: green; */
  display: flex;
  label{
    margin-right: 20px;
    margin-bottom: 20px;
  }

  select{
    border-color:#A67EED;
    margin-bottom: 20px;
    width: 30%;
    padding: 2%;
    
  }
`;

const Map = styled.div`
  /* position: absolute; */
  width: 50%;
  height: 25vh;
  margin: 0 25%;
  background-color: wheat;
`;
const OptionMenu = styled.div`
padding: 3px;
cursor: pointer;
&:hover{
  background-color:#6D09D1;
  color:white;
}`
import React, { useEffect, useState } from "react";
import styled from "styled-components";

import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

import Button from "@mui/material/Button";

import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css"; // css import
import Swal from "sweetalert2";

import dayjs from "dayjs";
import KaKaoMap from "../../map/KakaoMap";
// 주소검색 라이브러리 (다음 우편번호 검색)
import DaumPostcode from 'react-daum-postcode';
import { useParams } from "react-router-dom";
// 달력 날짜표시 한국어 세팅
import 'dayjs/locale/ko'
import '../calendar/Month.css';
dayjs.locale("ko");

// promise = 약속 생성시 필요 값 (출력)
// setPromise = 약송 생성 값 수정 용도 (시간)
// onChangeHandler = 입력창 입력시 promise값 수정 용도,
// onChange = 시간값 수정 용도
// time = 시간 받아오기
// am, setAm = 오전 오후 설정
const AddPromise = ({
  promise,
  setPromise,
  onChangeHandler,
  onChange,
  time,
  am,
  setAm,
  setTime,
  date,
  setDate
}) => {
  // 날짜 선택 달력 출력 여부 결정
  const [check, setCheck] = useState(false);
  // 약속 선택 (자신과의 약속, 타인과의 약속)
  const [modal, setModal] = useState(false);
  const [hourModal, setHourModal] = useState(false);
  const [minModal, setMinModal] = useState(false);
  const { kakao } = window;
  // 주소 검색 후 나온 결과 주소값 지정
  const [roadAddress, setRoadAddress] = useState(null);
  // 위도 경도 변경되는 값을 받을 수 있도록 상태 관리.
  const [lat, setLat] = useState(37.5656);
  const [lng, setLng] = useState(126.9769);
  // 주소검색 출력 여부 확인값
  const [openAddr, setOpenAddr] = useState(false)
  // id값 확인
  const {id} = useParams();
  const hourList = ["1", "2","3","4","5","6","7","8","9","10","11","12"];
  const minList = ["00", "10","20","30","40","50"];

  // 주소 값을 통해 좌표를 찾는 함수
  const kakaoGeocode = (address) => {
    // 카카오 geocode 사용 (index.html에 자바스크립트 선언)
    new kakao.maps.services.Geocoder().addressSearch(
      address,
      (result, status) => {
        if (status !== kakao.maps.services.Status.OK)
          return Swal.fire("에러가 발생했습니다!",'　', 'error');


        // // 경도, 위도 값
        let x = parseFloat(result[0].x);
        let y = parseFloat(result[0].y);

        setLat(y);
        setLng(x);
        // // 주소값 지정
        setRoadAddress(result[0].road_address.address_name);
        // // 좌표값을 약속 생성 변수 값으로 입력
        setPromise({ ...promise, place: result[0].road_address.address_name, coordinate: (String(y) + "," + String(x)) })
      }
    )
  }

  // 날짜 선택시 달력 미출력
  useEffect(() => {
    setCheck(false);
  }, [date]);

  useEffect(()=>{
    if(id!==undefined&&promise.place!==""){
      kakaoGeocode(promise.place)
    }
  },[promise.place])

  // 시간 값 변동 시 약속생성 시간 값 설정 변경
  useEffect(() => {
    // 오후 조건
    if (!am) {
      // 오후 12시 (정오)
      if (time.hour === "12") {
        // 분 입력 값이 1자리 일때 0부착
        if (time.min.length === 1) {
          setPromise({
            ...promise,
            eventDateTime: dayjs(date).format(
              `YYYY-MM-DD-${time.hour}-0${time.min}-00`
            ),
          });
          // 그 외 분 정상입력
        } else {
          setPromise({
            ...promise,
            eventDateTime: dayjs(date).format(
              `YYYY-MM-DD-${time.hour}-${time.min}-00`
            ),
          });
        }
        // 12시 외에는 작성시간 +12시간 ex) 오후 1시 => 13시
      } else {
        // 분 입력 값이 1자리 일때 0부착
        if (time.min.length === 1) {
          setPromise({
            ...promise,
            eventDateTime: dayjs(date).format(
              `YYYY-MM-DD-${Number(time.hour) + 12}-0${time.min}-00`
            ),
          });
        } else {
          // 그 외 분 정상입력
          setPromise({
            ...promise,
            eventDateTime: dayjs(date).format(
              `YYYY-MM-DD-${Number(time.hour) + 12}-${time.min}-00`
            ),
          });
        }
      }
      // 오전일 때 식별
    } else {
      // 오전 12시(자정) 00시로 변경
      if (time.hour === "12") {
        // 분 입력 값이 1자리 일때 0부착
        if (time.min.length === 1) {
          setPromise({
            ...promise,
            eventDateTime: dayjs(date).format(
              `YYYY-MM-DD-0${Number(time.hour) - 12}-0${time.min}-00`
            ),
          });
          // 그 외 분 정상입력
        } else {
          setPromise({
            ...promise,
            eventDateTime: dayjs(date).format(
              `YYYY-MM-DD-0${Number(time.hour) - 12}-${time.min}-00`
            ),
          });
        }
        // 시간 값이 1자리 일때 0부착
      } else {
        if (time.hour.length === 1) {
          // 분 입력 값이 1자리 일때 0부착
          if (time.min.length === 1) {
            setPromise({
              ...promise,
              eventDateTime: dayjs(date).format(
                `YYYY-MM-DD-0${time.hour}-0${time.min}-00`
              ),
            });
            // 그 외 분 정상입력
          } else {
            setPromise({
              ...promise,
              eventDateTime: dayjs(date).format(
                `YYYY-MM-DD-0${time.hour}-${time.min}-00`
              ),
            });
          }
          // 시간 값이 2자리 이상일 때 정상 동작
        } else {
          // 분 입력 값이 1자리 일때 0부착
          if (time.min.length === 1) {
            setPromise({
              ...promise,
              eventDateTime: dayjs(date).format(
                `YYYY-MM-DD-${time.hour}-0${time.min}-00`
              ),
            });
            // 그 외 분 정상입력
          } else {
            setPromise({
              ...promise,
              eventDateTime: dayjs(date).format(
                `YYYY-MM-DD-${time.hour}-${time.min}-00`
              ),
            });
          }
        }
      }
    }
  }, [time, date, am]);
  
  return (
    <>
      <Wrap>
        {/* 주소 검색창 출력 여부에 따라 표시 */}
        {openAddr ?
          <div style={{ position: "relative", justifyContent: "center", width:"80%", margin:"0 auto" }}>
            <div style={{ display: "flex", justifyContent: "flex-end", margin:"5px" }}>
              <div style={{ backgroundColor: "#D9DCFB", cursor:"pointer", fontWeight:"bold", borderRadius:"6px", padding:"3px" }}
                onClick={() => { setOpenAddr(false) }}>닫기</div>
            </div>
            <div>
              <DaumPostcode
                autoClose={false}
                onComplete={(data) => {
                  // searchAddressToCoordinate(data.address); 
                  kakaoGeocode(data.address);
                  setOpenAddr(false)
                }} />
            </div>
          </div>
          : null}
        {/* 제목 */}
        <UnderLine>
          <Input
            type="text"
            placeholder="제목"
            name="title"
            value={promise.title}
            onChange={onChangeHandler}
          />
        </UnderLine>
        {/* 내용 */}
        <UnderLine>
          <Input
            type="text"
            placeholder="내용"
            name="content"
            value={promise.content}
            onChange={onChangeHandler}
          />
        </UnderLine>
        {/* 약속 대상 선택 */}
        <Who style={{position:"relative"}}>
          {/* 선택값에 따른 div표시 변경 */}
          <label style={{ fontWeight: "bold" }}>약속 대상</label>
          {promise.point === "0" && !modal ?
            <div onClick={() => { setModal(!modal); }} style={{ display: "flex" }}>
              <div>자신과의 약속　</div><div style={{ color: "#3E09D1", cursor:"pointer" }}>▼</div>
            </div>
            : promise.point === "0" && modal ?
              <div onClick={() => { setModal(!modal); }} style={{ display: "flex" }}>
                <div>자신과의 약속　</div><div style={{ color: "#3E09D1", cursor:"pointer" }}>▲</div>
              </div>
              : promise.point == "100" && !modal ?
                <div onClick={() => { setModal(!modal); }} style={{ display: "flex" }}>
                  <div>타인과의 약속　</div><div style={{ color: "#3E09D1", cursor:"pointer" }}>▼</div>
                </div>
                : <div onClick={() => { setModal(!modal); }} style={{ display: "flex" }}>
                  <div>타인과의 약속　</div><div style={{ color: "#3E09D1", cursor:"pointer" }}>▲</div>
                </div>}
          {/* 선택에 따른 약속 생성 값 수정 */}
          {modal === true ?
            <ModalArea>
              <OptionMenu
                onClick={() => { setPromise({ ...promise, point: "0" }); setModal(false); }}>자신과의 약속</OptionMenu>
              <OptionMenu
                onClick={() => { setPromise({ ...promise, point: "100" }); setModal(false); }}>타인과의 약속</OptionMenu>
            </ModalArea>
            : null
          }
        </Who>
        {/* 시간 선택 */}
        <When>
          {/* 클릭 시 달력 출력 (달력 아이콘) */}
          <div
            onClick={() => {
              setCheck(!check);
            }}>
            <p>
              <CalendarMonthIcon style={{ color: "#3E09D1", cursor:"pointer" }} />
            </p>
          </div>
          {/* 선택된 날짜 출력 */}
          <div>{dayjs(date).format("YYYY.MM.DD dd")}</div>
          <div>
            <div>
              {/* 오전 오후 여부 확인하여 표시 조정 */}
              {am ? (
                <>
                  <Button
                    style={{ color: "black", backgroundColor: "#D9DCFB" }}
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
                    style={{ color: "black", backgroundColor: "#D9DCFB" }}
                    onClick={() => {
                      setAm(false);
                    }}>
                    오후
                  </Button>
                </>
              )}
            </div>
          </div>
          {/* 시, 분 select로 설정 */}

          <div style={{position:"relative", display:"flex", cursor:"pointer"}} onClick={()=>{setHourModal(!hourModal)}}>
          <div style={{width:"20px"}}>{time.hour}</div>
          <div>시</div>
          {hourModal?
          <STHour>
            {hourList.map((hour)=>{
              return(
                <OptionMenu key={hour} onClick={()=>{setTime({...time,hour:hour});setHourModal(!hourModal);}}>{hour}</OptionMenu>
              )
            })}
          </STHour>
          :null}
          </div>
          <div style={{position:"relative", display:"flex", cursor:"pointer"}} onClick={()=>{setMinModal(!minModal)}}>
          <div style={{width:"20px"}}>{time.min}</div>
          <div></div>
          <div>분</div>
          {minModal?<STMin>
            {minList.map((min)=>{
              return(
                <OptionMenu key={min} onClick={()=>{setTime({...time,min:min});setMinModal(!minModal);}}>{min}</OptionMenu>
              )
            })}
          </STMin>
          :null}
          </div>
        </When>
        {/* 달력 아이콘 클릭시 출력되는 달력 */}
        {check ? (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Calendar onChange={setDate} value={date} name="birthDate" 
             formatDay={(locale, date) => date.toLocaleString("en", {day: "numeric"})}/>
          </div>
        ) : null}
        {/* 장소 입력인데 동일 styled적용 확인후 수정필요 여부 결정 */}
        <When>
          <div style={{fontWeight:"bold"}}>장소</div>
          {openAddr ? null :
            roadAddress === null ?
              <div style={{ color: "rgb(133, 133, 133)", cursor:"pointer" }}
                onClick={() => { setOpenAddr(!openAddr) }}>주소검색</div>
              : <div onClick={() => { setOpenAddr(!openAddr) }}>{roadAddress}</div>
          }
        </When>
        {/* 카카오 지도 출력 부, 위도경도는 주소 검색 시 자동 선정 */}
        {/* 크키값 width, height 값으로 지정필요 */}
        <Map><KaKaoMap lat={lat} lng={lng} width={"380px"} height={"300px"} /></Map>
      </Wrap>
    </>
  );
};

export default AddPromise;

const Wrap = styled.div`
  /* background-color: pink; */
  margin: 0 auto;
  width: 70%;
  min-width: 500px;
  max-width: 800px;
  text-align: center;
  position: relative;
`;

const UnderLine = styled.div`
  
  display: flex;
  align-items: center;
  border-bottom: 0.8px solid #D9DCFB;
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

const Select = styled.select`
  border-radius: 5px;
  /* border: none; */
  border: 1px solid #D9DCFB;
  padding: 2px 5px;
  text-align: center;
  .option {
    background: black;
  }  
`



const When = styled.div`
  /* background-color: skyblue; */
  width: 70%;
  display: flex;
  position: relative;
  margin: 5% 5% 5% 12%;
  justify-content: space-around;
  align-items: center;
`;
// const InputTime = styled.input`
//   width: 30px;
//   text-align: center;
//   border: none;
//   border-bottom: 1px solid black;
//   font-weight: bold;
//   &:focus {
//     outline: none;
//   }
// `;

const Who = styled.div`
  border-bottom: 0.8px solid #D9DCFB;
  margin: 5% 5% 5% 12%;
  width: 70%;
  /* background-color: green; */
  display: flex;
  label{
    margin-right: 20px;
    margin-bottom: 20px;
  }

  select{
    /* border-color:#A67EED; */
    margin-bottom: 20px;
    width: 30%;
    padding: 2%;
    cursor: pointer;
  }
`;

const Map = styled.div`
  /* position: absolute; */
  /* width: 80%; */
  /* height: 25vh; */
  margin: 20px auto;
`;
const OptionMenu = styled.div`
padding: 3px;
font-size: 14px;
cursor: pointer;
&:hover{
  background-color:#3E09D1;
  color:white;
  border-radius: 6px;
}`

const ModalArea = styled.div`
background-color: #FAFAFA;
position: absolute;
text-align: center;
top: 30px;
left: 60px;
width: 150px;
border: 1px solid #e0e0e0; 
box-shadow: rgb(0 0 0 / 10%) 0 1px 20px 0px;
border-radius: 8px;
z-index:20;
`

const STHour = styled.div`
background-color: #FAFAFA;
position: absolute;
text-align: center;
border: 1px solid #e0e0e0; 
box-shadow: rgb(0 0 0 / 10%) 0 1px 20px 0px;
border-radius: 8px;
width: 30px;
top: 30px;
z-index:20;
`

const STMin = styled.div`
background-color: #FAFAFA;
position: absolute;
text-align: center;
border: 1px solid #e0e0e0; 
box-shadow: rgb(0 0 0 / 10%) 0 1px 20px 0px;
border-radius: 8px;
width: 30px;
z-index:20;
top: 30px;
`
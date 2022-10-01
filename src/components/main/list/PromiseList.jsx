import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { __getPromise } from "../../../redux/modules/promise";
import { __getWeather } from "../../../redux/modules/weather";
import PersonIcon from '@mui/icons-material/Person';

const PromiseList = ({day}) => {
  const navigate = useNavigate();
  const dispatch= useDispatch();
  const promiseList = useSelector((state)=>state.promise);
  const weatherList = useSelector((state)=>state.weather);
  useEffect(()=>{
    dispatch(__getPromise(day))
    .then((response)=>{
      for(let place of response?.payload?.data){
        console.log(place)
        getCoordinate(place.place);
      }
    });
  },[day])
  const getCoordinate = (address) => {
    const { naver } = window;
    naver.maps.Service.geocode(
      {
        query: address,
      },
      (status, response) => {
        if (status !== naver.maps.Service.Status.OK)
          return alert("Something wrong!");
  
        let result = response.v2;
        let items = result.addresses;
  
        let x = parseFloat(items[0].x);
        let y = parseFloat(items[0].y);
  
        // console.log(x, y)
        // console.log(String(y) + "," + String(x))
  
        // setLat(y);
        // setLng(x);
        // setRoadAddress(items[0].roadAddress);
        // setPromise({ ...promise, place: items[0].roadAddress, coordinate: (String(y) + "," + String(x)) })
        console.log(String(y) + "," + String(x))
        dispatch(__getWeather(String(y) + "," + String(x)))
      }
    )
  }
  
  console.log(weatherList)
  return (
    <>
      <Wrap>
        <div>
          <p style={{fontWeight:"bold"}}>오늘 해야할 일</p>
        </div>
        <Cards>
          {promiseList?.data?.data?.map((promise,i)=>{
            if(promise.lastTime === "이미 지난 약속입니다."){
              return;
            }
            getCoordinate(promise.place);
            return (
              <PromiseCard key={promise.id} onClick={()=>{navigate(`/detailpromise/${promise.id}`)}}>
                <div style={{display:"flex"}}>
                  <p style={{fontSize:"15px", fontWeight:"bold"}}>{promise.title}</p>
                  {/* 포인트 받아야할듯 */}
                  <People><PersonIcon/></People>
                  <p style={{fontWeight:"500"}}>{promise.memberCount}</p>
                </div>
                <div>
                  <p className="place" style={{ marginTop:"0", marginBottom:"0" }}>{promise.place}</p>
                </div>                
                <div>
                  <div style={{display:"flex"}}>
                    {Number(promise.eventDateTime.split("-")[3])<12?
                    <>
                    <p>오전</p>
                    <p>{promise.eventDateTime.split("-")[3]}시</p>
                    </>
                    :Number(promise.eventDateTime.split("-")[3])===12?
                    <>
                    <p>오후</p>
                    <p>{promise.eventDateTime.split("-")[3]}시</p>
                    </>
                    :<>
                    <p>오후</p>
                    <p>{Number(promise.eventDateTime.split("-")[3])-12}시</p>
                    </>
                    }
                    <p style={{marginRight:"10px"}}>{promise.eventDateTime.split("-")[4]}분</p>
                    <p className="lastTime">{promise.lastTime}</p>
                  </div>             
                </div>
              </PromiseCard>
            )
          })}
        </Cards>        
      </Wrap>
      <Wrap>
        <div>
          <p style={{fontWeight:"bold"}}>오늘 했어야 할 일</p>
        </div>
        <Cards>
          {promiseList?.data?.data?.map((promise)=>{
            if(promise.lastTime !== "이미 지난 약속입니다."){
              return;
            }
            return (
              <PromiseCard key={promise.id} onClick={()=>{navigate(`/detailpromise/${promise.id}`)}}>
                <div style={{display:"flex"}}>
                  <p style={{fontSize:"15px", fontWeight:"bold"}}>{promise.title}</p>
                  {/* 포인트 받아야할듯 */}
                  <People><PersonIcon/></People>
                  <p style={{fontWeight:"500"}}>{promise.memberCount}</p>
                </div>
                <div>
                  <p className="place" style={{ marginTop:"0", marginBottom:"0" }}>{promise.place}</p>
                </div>                
                <div>
                  <div style={{display:"flex"}}>
                    {Number(promise.eventDateTime.split("-")[3])<12?
                    <>
                    <p>오전</p>
                    <p>{promise.eventDateTime.split("-")[3]}시</p>
                    </>
                    :Number(promise.eventDateTime.split("-")[3])===12?
                    <>
                    <p>오후</p>
                    <p>{promise.eventDateTime.split("-")[3]}시</p>
                    </>
                    :<>
                    <p>오후</p>
                    <p>{Number(promise.eventDateTime.split("-")[3])-12}시</p>
                    </>
                    }
                    <p style={{marginRight:"10px"}}>{promise.eventDateTime.split("-")[4]}분</p>
                    <p className="lastTime">종료</p>
                  </div>             
                </div>
              </PromiseCard>
            )
          })}
        </Cards>        
      </Wrap>
    </>    
  )
}

export default PromiseList;

const Wrap = styled.div`
  /* background-color: skyblue; */
  width: 80%;
  margin: 20px auto;
`
const Cards = styled.div`
  @media screen and (min-width: 769px) {
      /* background-color: pink; */
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 10px;
    } 
  
`

const PromiseCard = styled.div`
  /* min-width: 350px; */
  height: 100%;
  background-color: #EDFFEB;
  margin: 10px 0;
  padding: 0 10px;
  border-radius: 4px; 
  font-size: 13px;
  position: relative;
  div {
    /* background-color: yellow; */
    /* height: 30px; */
  }
  .lastTime {
    position: absolute;
    right: 10px;
  }
  @media screen and (min-width: 769px) {
    background-color: #EDFFEB;
    width: 92%;
    height: 120px;
    font-size: 13px;
    margin: 0 auto;
  }
`

const People = styled.p`  
  color: #6D09D1;
  border-radius: 50%;
  width: 20px;
  text-align: center;
  margin-left: auto;
  margin-right: 2px;
`


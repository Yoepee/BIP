import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { __getPromise } from "../../../redux/modules/promise";
import PersonIcon from '@mui/icons-material/Person';

// 약속목록 컴포넌트
const PromiseList = ({day}) => {
  const navigate = useNavigate();
  const dispatch= useDispatch();
  // 약속 목록
  const promiseList = useSelector((state)=>state.promise);
  // 약속값 받아오기
  useEffect(()=>{
    dispatch(__getPromise(day))
    .then((response)=>{
      })
  },[day])

  return (
    <>
      <Wrap>
        <div>
          <p style={{fontWeight:"bold"}}>오늘 해야할 일</p>
        </div>
        <Cards>
          {/* 약속시간까지 시간이 아직 남은 약속들 */}
          {promiseList?.data?.data?.map((promise,i)=>{
            if(promise.lastTime === "이미 지난 약속입니다."){
              return;
            }
            // 날씨 아이콘 받아오기
            let iconurl = "http://openweathermap.org/img/w/" + promise.weatherResponseDto.icon + ".png";
            return (
              // 카드 선택시 상세 페이지
              <PromiseCard key={promise.id} onClick={()=>{navigate(`/detailpromise/${promise.id}`)}}>
                <div style={{display:"flex"}}>
                  <p> 현재날씨</p>
                  {/* 날씨 아이콘 */}
                  <img  src={iconurl}/>
                  <div>
                  <p>날씨 : {promise.weatherResponseDto.sky}</p>
                  <p>현재온도 : {promise.weatherResponseDto.temperature}</p>
                  <p>최고/최저 : {promise.weatherResponseDto.minTemp} / {promise.weatherResponseDto.maxTemp} </p>
                  <p>강수확률 : {promise.weatherResponseDto.probability}</p>
                  </div>
                </div>
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
                    {/* 시간값 split으로 잘라서 사용 */}
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
          {/* 약속시간이 지난 약속들 */}
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
                    {/* 시간값 split으로 잘라서 사용 */}
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


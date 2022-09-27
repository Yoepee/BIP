import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { __getPromise } from "../../../redux/modules/promise";
import PersonIcon from '@mui/icons-material/Person';

const PromiseList = ({day}) => {
  const navigate = useNavigate();
  const dispatch= useDispatch();
  const promiseList = useSelector((state)=>state.promise);
  useEffect(()=>{
    dispatch(__getPromise(day));
  },[day])

  return (
    <>
      <Wrap>
        <div>
          <p style={{fontWeight:"bold"}}>약속 목록</p>
        </div>
        <Cards>
          {promiseList?.data?.data?.map((promise)=>{
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
  width: 20px;
  text-align: center;
  margin-left: auto;
  margin-right: 2px;
`


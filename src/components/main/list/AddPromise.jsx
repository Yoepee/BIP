import React from "react";
import styled from "styled-components";

import HomeIcon from '@mui/icons-material/Home';
import { useNavigate } from "react-router-dom";

import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';


const AddPromise = () => {
  const navigate = useNavigate();
  return(
    <>
      <Wrap>
        <div className="header" style={{display:"flex", justifyContent:"space-between", margin:"5%"}}>
          <div onClick={()=>{navigate("/")}}>
            <p><HomeIcon/></p>
          </div>
          <p style={{fontWeight:"bold"}}>완료</p>
        </div>
        <div>
          <Input type="text" placeholder="제목"/>
        </div>
        <When>
          <div>
            <p><CalendarMonthIcon /></p>
          </div>
          <div>
            <ButtonGroup variant="text" aria-label="text button group" style={{height:"20px"}}>
              <Button style={{color:"black"}}>오전</Button>
              <Button style={{color:"black"}}>오후</Button>
            </ButtonGroup>            
          </div>
          <div><InputTime type="text" />시</div>
          <div><InputTime type="text" />분</div>         
        </When>
        <div>
          <Input type="text" placeholder="장소"/>
        </div>
        <Point>
          <label style={{fontWeight:"bold"}}>포인트</label>
          <select name="point">
            <option value="0">0</option>
            <option value="100">100</option>
            <option value="200">200</option>
            <option value="300">300</option>
            <option value="400">400</option>
            <option value="500">500</option>
          </select>
        </Point>
        <div><Input type="text" placeholder="내용"/></div>
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
  width: 20px;
  text-align: center;
  border: none;
  border-bottom: 1px solid black;
  font-weight: bold;
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
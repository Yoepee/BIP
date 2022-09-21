import React, { useState } from "react";
import Carousel from 'react-material-ui-carousel'
import { Paper, Button } from '@mui/material'
import Month from "../components/main/calendar/Month"
import Day from "../components/main/calendar/Day"
import styled from "styled-components";
import Weekdate from "../components/main/calendar/Weekdate";
import Footer from "../components/footer/Footer";
import Monthdate from "../components/main/calendar/Monthdate";
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from "react-router-dom";

const MainPage = () => {
  const [settings, setSettings] = useState({autoPlay: false})
  const navigate = useNavigate();
    return (
        <>
      <Wrap>
          <Carousel {...settings}>
            <div><Day /></div>
            <div><Weekdate/></div>
            <div><Monthdate/></div>
            <div><Month /></div>            
          </Carousel>
      </Wrap>
      <Plus>
          <IconBtn onClick={() => { navigate("/addpromise") }}><AddIcon /></IconBtn>
        </Plus>
      <Footer foot={0}/>
      <div style={{height:"50px"}}></div>
      </>
    )
}


export default MainPage;

const Wrap = styled.div`
  /* background-color: whitesmoke; */
  padding: 10% 0;
`
const Plus = styled.div`
position : fixed;
bottom : 0;
right: 5%;
margin-bottom:20%;
`

const IconBtn = styled.div`
display:flex;
justify-content:center;
align-items:center;
border-radius:50%;
background-color: black;
width: 50px;
height: 50px;
color:white;
cursor:pointer;
`
import React, { useState } from "react";
import Carousel from 'react-material-ui-carousel'
import { Paper, Button } from '@mui/material'
import Month from "../components/main/calendar/Month"
import Day from "../components/main/calendar/Day"
import styled from "styled-components";
import Weekdate from "../components/main/calendar/Weekdate";
import Footer from "../components/footer/Footer";
import Monthdate from "../components/main/calendar/Monthdate";

const MainPage = () => {
  const [settings, setSettings] = useState({autoPlay: false})
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

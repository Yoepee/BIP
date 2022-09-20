import React, { useState } from "react";
import Carousel from 'react-material-ui-carousel'
import { Paper, Button } from '@mui/material'
import Month from "../components/main/Month"
import Day from "../components/main/Day"
import styled from "styled-components";
import Weekdate from "../components/main/Weekdate";
import Footer from "../components/footer/Footer";

const MainPage = () => {
  const [settings, setSettings] = useState({autoPlay: false})
    return (
        <>
      <Wrap>
          <Carousel {...settings}>
            <div><Day /></div>
            <div><Weekdate/></div>
            <div><Month /></div>
          </Carousel>
      </Wrap>
      <Footer/>
      </>
    )
}


export default MainPage;

const Wrap = styled.div`
  /* background-color: whitesmoke; */
  padding: 10% 0;
`
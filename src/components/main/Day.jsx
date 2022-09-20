import React, { useState, useEffect } from "react";
import styled from "styled-components";
import moment from "moment";

const Day = () => {
  const today = moment().format('YYYY년 MM월 DD일 ddd');
  return(
    <>
      <Today>
        <p>{today}</p>
      </Today>
    </>
  )
}

export default Day;

const Today = styled.div`
  border: 1px solid gray;
  border-radius: 5px;
  padding: 0 2%;
  margin: 0 10%;
  font-weight: bold;
`
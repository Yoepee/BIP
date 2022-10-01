import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // css import
import './Month.css';
import styled from 'styled-components';

const Month = () => {
  const [value, setValue] = useState(new Date());

  return (
    <Wrap style={{display:"flex", justifyContent:"center"}}>
      <Calendar onChange={setValue} value={value}
       formatDay={(locale, date) => date.toLocaleString("en", {day: "numeric"})} />
    </Wrap>
  );
}

export default Month;

const Wrap = styled.div`
  margin: 0 auto;
`

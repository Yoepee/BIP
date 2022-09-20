import React from 'react';
import { useNavigate } from "react-router-dom";
import styled from "styled-components"
import ItrSwipe from "../components/intro/Intro";

const IntroPage = () => {
  const navigate = useNavigate();
  
  return (
    <>
      <Wrap>
        <ItrText>
          <p>더 이상 약속을 <br/> 깨지 않게 도와드릴게요</p>
        </ItrText>
        <Container>
          <ItrSwipe />
        </Container>
        <div>
          <ItrBtn type="button" onClick={()=>navigate('/signup')}>시작하기</ItrBtn>   
        </div>        
      </Wrap>      
    </>
  )
}

export default IntroPage;

const Wrap = styled.div`
  /* background-color: yellowgreen; */
  margin: 0 auto;
  text-align: center;
  max-width: 500px;
`
const ItrText = styled.div`
  /* background-color: pink; */
  margin: 20% 0 10% 0;
  font-size: 1.2em;
`
const Container = styled.div`
  /* background-color: whitesmoke; */
  overflow: hidden;
  margin: 0 20% 20% 20%;
`
const ItrBtn = styled.button`
  /* background-color: skyblue; */
  width: 100px;
  height: 30px;
  border: 1px solid gray;
  border-radius: 5px;
`
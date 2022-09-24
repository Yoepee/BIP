import React from 'react';
import { useNavigate } from "react-router-dom";
import styled from "styled-components"
import ItrSwipe from "../components/intro/Intro";
import kakao_login from '../img/kakao_login.png'
import naver_login from '../img/naver_login.png'


const IntroPage = () => {
  const navigate = useNavigate();

  const kakao = () =>{
    window.location.href=process.env.REACT_APP_KAKAO_URL
  }

  const naver = () =>{
    console.log(process.env.REACT_APP_NAVER_URL)
    window.location.href=process.env.REACT_APP_NAVER_URL
  }
  
  return (
    <>
      <Wrap>
        <Container>
          <ItrSwipe />
        </Container>
        <div>
          <ItrBtn type="button" onClick={()=>navigate('/signup')}>시작하기</ItrBtn>   
        </div>
        <div>
          <Naver_login>
            <a id="naver-login-btn" onClick={()=>{naver()}}>
              <img src={naver_login} width="100px" />
            </a>
          </Naver_login>          
        </div>
        <div>
          <Kakao_login>
          <a id="kakao-login-btn" onClick={()=>{kakao()}}>
            <img src={kakao_login} width="120px" />            
          </a>
          </Kakao_login>
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
// const ItrText = styled.div`
  
//   margin: 20% 0 10% 0;
//   font-size: 1.2em;
// `
const Container = styled.div`
  /* background-color: whitesmoke; */
  overflow: hidden;
  margin: 10%;
`
const ItrBtn = styled.button`
  width: 200px;
  height: 30px;
  margin-bottom: 3px;
  background-color: #A400BF;
  color: white;
  font-size: 12px;
  font-weight: bold;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`

const Naver_login = styled.div`
  background-color: #03C75A;
  width: 200px;
  height: 30px;
  margin: 0 auto;
  margin-bottom: 3px;
  border-radius: 4px;
  cursor: pointer;
  img {
    margin: 2px auto;
  }
`

const Kakao_login = styled.div`
  background-color: #FEE500;
  width: 200px;
  height: 30px;
  margin: 0 auto;
  margin-bottom: 3px;
  border-radius: 4px;
  cursor: pointer;
`
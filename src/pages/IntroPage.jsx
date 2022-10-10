import React from 'react';
import { useNavigate } from "react-router-dom";
import styled from "styled-components"
import ItrSwipe from "../components/intro/Carousel";
import kakao_login from '../img/kakao_login.png'
import naver_login from '../img/naver_login.png'


const IntroPage = () => {
  const navigate = useNavigate();

  // 카카오 로그인시 카카오 url경로로 이동
  const kakao = () =>{
    window.location.href=process.env.REACT_APP_KAKAO_URL
  }

  // 네이버 로그인시 네이버 url경로로 이동
  const naver = () =>{
    window.location.href=process.env.REACT_APP_NAVER_URL
  }
  
  return (
    <>
      <Wrap>
        {/* 페이지 설명 */}
        <Container>
          <ItrSwipe />
        </Container>
        {/* 휴대폰 번호로 시작 */}
        <div>
          <ItrBtn type="button" onClick={()=>navigate('/signup')}>시작하기</ItrBtn>   
        </div>
        {/* 네이버로 로그인 */}
        <div>
          <Naver_login>
            <a id="naver-login-btn" onClick={()=>{naver()}}>
              <img src={naver_login} width="120px" />
            </a>
          </Naver_login>          
        </div>
        {/* 카카오로 로그인 */}
        <div>
          <Kakao_login>
          <a id="kakao-login-btn" onClick={()=>{kakao()}}>
            <img src={kakao_login} width="130px" />            
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

const Container = styled.div`
  /* background-color: whitesmoke; */
  overflow: hidden;
  margin-bottom: 15px;
`
const ItrBtn = styled.button`
  width: 200px;
  height: 45px;
  margin-bottom: 8px;
  background-color: #3E09D1;
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
  height: 45px;
  margin: 0 auto;
  margin-bottom: 8px;
  border-radius: 4px;
  cursor: pointer;
  line-height: 42px;
  img {
    vertical-align: middle;
  }
`

const Kakao_login = styled.div`
  background-color: #FEE500;
  width: 200px;
  height: 45px;
  margin: 0 auto;
  margin-bottom: 8px;
  border-radius: 4px;
  cursor: pointer;
  line-height: 42px;
  img {
    vertical-align: middle;
  }
`
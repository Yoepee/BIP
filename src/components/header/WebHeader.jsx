import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const WebHeader = () => {
  const navigate = useNavigate();

  return (
    <>
    <StWebHeader>
      <div onClick={() => { navigate("/") }}>홈</div>
      <div onClick={() => { navigate("/donation") }}>재능기부</div>
      <div onClick={() => { navigate("/member") }}>친구목록</div>
      <div onClick={() => { navigate("/profile") }}>마이페이지</div>
    </StWebHeader>    
    </>
  )
}

export default WebHeader;



const StWebHeader = styled.div`
  display: none;
  @media screen and (min-width: 769px) {
    /* background-color: pink; */
    width: 420px;
    display: flex;
    /* margin: 20px 20px; */
    padding: 20px 20px;
    font-size: 16px;
    font-weight: bold;
    div {
      margin: 0 10px;
      cursor: pointer;
    }
  }
`
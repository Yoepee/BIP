import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import styled from "styled-components";
import CreateIcon from '@mui/icons-material/Create';
import { useNavigate } from "react-router-dom";
import Donation from "../../components/donation/Donation";

// 재능 기부 목록 페이지
const DonationPage = () =>{
  const navigate = useNavigate();
  return (
    <>
      <Header head={"재능기부"}/>
      <Donation/>
      <Plus>
          <IconBtn onClick={() => { navigate("/adddonation") }}><CreateIcon style={{color:"#6D09D1"}} /></IconBtn>
      </Plus>
      <Footer foot={3}/>
      
    </>
  )
}

export default DonationPage;

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
border: 1.5px solid #6D09D1;
border-radius:50%;
background-color: white;
width: 40px;
height: 40px;
color:white;
cursor:pointer;
//위치 고정시키기
position: fixed;
right: 10%;
bottom: 15%;
`
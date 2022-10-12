import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import { useNavigate } from 'react-router-dom';
import styled from "styled-components";

//  뒤로가기 제목 
const Option0 = ({head}) =>{
  const navigate = useNavigate();
  return (
    <>
    <div onClick={()=>{
      if(head === "프로필 보기"){
        navigate("/profile")
      }else if(head==="신용점수 구매"){
        navigate("/profile")
      }else{
        navigate(-1);
      }
    }}>
    <BackIcon><ArrowBackIosNewRoundedIcon style={{ marginTop:"7px"}} /></BackIcon>

    </div>
    <div style={{marginLeft:"1%", fontWeight:"bold", fontSize:"20px"}}>
      <p>{head}</p>
    </div>
    </>
  )
}

export default Option0;

const BackIcon = styled.p`
  @media screen and (min-width: 769px) {
    display: none;
  }
`
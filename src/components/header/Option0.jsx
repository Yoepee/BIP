import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import { useNavigate } from 'react-router-dom';

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
    <p><ArrowBackIosNewRoundedIcon style={{color:'#6B68F3', marginTop:"7px"}} /></p>

    </div>
    <div style={{marginLeft:"1%", fontWeight:"bold", fontSize:"20px"}}>
        <p>{head}</p>
      </div>
    </>
  )
}

export default Option0;
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import { useNavigate } from 'react-router-dom';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const Option3 = ({head}) =>{
  const navigate = useNavigate();
  return (
    <>
    <div onClick={()=>{navigate("/")}}>
        <p><ArrowBackIosNewRoundedIcon /></p>
      </div>
    <div style={{marginLeft:"1%"}}>
        <p>{head}</p>
      </div>
      <div onClick={()=>{}} style={{marginLeft:"auto", marginRight:"2%"}}>
      <p><MoreVertIcon/></p>
    </div>
    </>
  )
}

export default Option3;
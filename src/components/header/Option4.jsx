import PersonAddRoundedIcon from '@mui/icons-material/PersonAddRounded';
import { useNavigate } from 'react-router-dom';

const Option4 = ({ head }) =>{
  const navigate = useNavigate();
  return (
    <>
    <div style={{marginLeft:"1%"}}>
        <p>{head}</p>
      </div>
      <div style={{marginLeft:"auto", marginRight:"2%", cursor:"pointer"}}
      onClick={()=>{
        navigate("/addmember")
      }}>
        <p><PersonAddRoundedIcon/></p>
      </div>
    </>
  )
}

export default Option4;
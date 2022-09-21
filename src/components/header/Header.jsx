import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import { useNavigate } from 'react-router-dom';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const Header = ({ head, option, submit }) => {
  const navigate = useNavigate();
  return (
    <div style={{ display: "flex", borderBottom: "1px solid #e0e0e0" }}>
      {option===0?
      <div onClick={()=>{navigate(-1)}}>
        <p><ArrowBackIosNewRoundedIcon /></p>
      </div>
      :null}
      {option===1?
      <div onClick={()=>{navigate(-1)}}>
        <p><ArrowBackIosNewRoundedIcon /></p>
      </div>
      :null}
       {option===2?
      <div onClick={()=>{navigate("/")}}>
        <p><ArrowBackIosNewRoundedIcon /></p>
      </div>
      :null}
      {option===3?
      <div onClick={()=>{navigate("/")}}>
        <p><ArrowBackIosNewRoundedIcon /></p>
      </div>
      :null}
      <div style={{marginLeft:"1%"}}>
        <p>{head}</p>
      </div>
      {option === 1?
      <div onClick={()=>{navigate("/detailprofile")}} style={{marginLeft:"auto", marginRight:"2%"}}>
        <p>완료</p>
      </div>
      :null}
      {option===2?
      <div onClick={()=>{navigate("/detailpromise")}} style={{marginLeft:"auto", marginRight:"2%"}}>
      <p>완료</p>
    </div>
      :null}
      {option===3?
      <div onClick={()=>{}} style={{marginLeft:"auto", marginRight:"2%"}}>
      <p><MoreVertIcon/></p>
    </div>
      :null}
    </div>
  )
}

export default Header;


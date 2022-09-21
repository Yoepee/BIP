import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import { useNavigate, useParams } from 'react-router-dom';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { __editNickname, __editPhone, __editEmail } from '../../redux/modules/profile';
import { useDispatch } from 'react-redux';

const Header = ({ head, option, payload, chk }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {type} = useParams();
  console.log(payload);
  const editNickname = () => {
    if(option===1 && chk){
      dispatch(__editNickname(payload));
      navigate("/detailprofile");
    }
  }
  const editPhone = () => {
    if(option===1 && chk){
      dispatch(__editPhone(payload));
      navigate("/detailprofile");
    }
  }
  const editEmail = () => {
    if(option===1 && chk){
      dispatch(__editEmail(payload));
      navigate("/detailprofile");
    }
  }
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
      <div style={{marginLeft:"auto", marginRight:"2%"}}
      onClick={()=>{
        if(type==="name"){
          editNickname();
        }else if(type==="call"){
          editPhone();
        }else{
          editEmail();
        }
      }}>
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


import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { __editNickname, __editPhone, __editEmail } from '../../redux/modules/profile';

const Option1 = ({ head, option, payload, chk }) =>{
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {type} = useParams();

  const editNickname = () => {
    if(chk){
      dispatch(__editNickname(payload));
      navigate("/detailprofile");
    }
  }
  const editPhone = () => {
    if(chk){
      dispatch(__editPhone(payload));
      navigate("/detailprofile");
    }
  }
  const editEmail = () => {
    if(chk){
      dispatch(__editEmail(payload));
      navigate("/detailprofile");
    }
  }
  return (
    <>
    <div onClick={()=>{navigate(-1)}}>
        <p><ArrowBackIosNewRoundedIcon /></p>
      </div>
    <div style={{marginLeft:"1%"}}>
        <p>{head}</p>
      </div>
      <div style={{marginLeft:"auto", marginRight:"2%", cursor:"pointer"}}
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
    </>
  )
}

export default Option1;
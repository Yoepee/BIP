import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { __addPromise } from '../../redux/modules/detailPromise';

const Option2 = ({ head, payload }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  console.log(payload)
  return (
    <>
      <div onClick={() => { navigate("/") }}>
        <p><ArrowBackIosNewRoundedIcon /></p>
      </div>
      <div style={{ marginLeft: "1%" }}>
        <p>{head}</p>
      </div>
      <div onClick={() => { 
        dispatch(__addPromise(payload))
        .then((response)=>{
          navigate(`/detailpromise/${response.payload.data.id}`);
        })
        }} style={{ marginLeft: "auto", marginRight: "2%", cursor:"pointer" }}>
        <p>완료</p>
      </div>
    </>
  )
}

export default Option2;
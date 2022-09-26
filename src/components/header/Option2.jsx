import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { __addPromise, __editPromise } from '../../redux/modules/detailPromise';

const Option2 = ({ head, payload }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {id} = useParams();

  return (
    <>
      <div onClick={() => { navigate("/") }}>
        <p><ArrowBackIosNewRoundedIcon /></p>
      </div>
      <div style={{ marginLeft: "1%" }}>
        <p>{head}</p>
      </div>
      <div onClick={() => {
        if(id===undefined){
        dispatch(__addPromise(payload))
        .then((response)=>{
          console.log(response)
          navigate(`/detailpromise/${response.payload.data.id}`);
        })
        }else{
          if (window.confirm("약속을 수정하시겠습니까?")) {
          dispatch(__editPromise({id:id,data:payload}))
        .then((response)=>{
          navigate(`/detailpromise/${id}`);
        })
        }}
        }} style={{ marginLeft: "auto", marginRight: "2%", cursor:"pointer" }}>
        <p>완료</p>
      </div>
    </>
  )
}

export default Option2;
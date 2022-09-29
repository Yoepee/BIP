import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { __addPromise, __editPromise } from '../../redux/modules/detailPromise';

const Option2 = ({ head, payload }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {id} = useParams();

  const isEmptyObj = (obj)=>{
    console.log(Object.keys(obj).length)
    if(obj.constructor===Object){
      for(const key in obj){
        if(obj[key]==="")
          return true;
      }
    }
    return false;
  }
  // useEffect(()=>{

  // },[payload])
  console.log(isEmptyObj(payload))
  return (
    <>
      <div onClick={() => { navigate("/") }}>
        <p style={{marginTop:"20px"}}><ArrowBackIosNewRoundedIcon style={{color:"#6D09D1"}}/></p>
      </div>
      <div style={{ marginLeft: "1%" }}>
        <p style={{fontWeight:"bold", fontSize:"20px"}}>{head}</p>
      </div>
      <div onClick={() => {
        if(id===undefined){
          if(isEmptyObj(payload)){
            alert("작성하지 않은 내용이 있습니다.")
            return;
          }
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
        <p style={{fontWeight:"bold", fontSize:"20px"}}>완료</p>
      </div>
    </>
  )
}

export default Option2;
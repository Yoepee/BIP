import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { __addPromise, __editPromise } from '../../redux/modules/detailPromise';

// 약속생성 뒤로가기(홈) 제목 완료
const Option2 = ({ head, payload }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {id} = useParams();

  const isEmptyObj = (obj)=>{
    if(obj.constructor===Object){
      for(const key in obj){
        if(obj[key]==="")
          return true;
      }
    }
    return false;
  }

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
          if(response?.payload?.data === "약속 시간을 미래로 설정해주세요."){
            alert(response?.payload?.data);
          }else{
            navigate(`/detailpromise/${response.payload.data.id}`);
          }
        })
        }else{
          if(isEmptyObj(payload)){
            alert("작성하지 않은 내용이 있습니다.")
            return;
          }
          if (window.confirm("약속을 수정하시겠습니까?")) {
          dispatch(__editPromise({id:id,data:payload}))
        .then((response)=>{
          if(response?.payload?.data === "약속 시간을 미래로 설정해주세요."){
            alert(response?.payload?.data);
          }else{
            navigate(`/detailpromise/${id}`);
          }
        })
        }}
        }} style={{ marginLeft: "auto", marginRight: "2%", cursor:"pointer" }}>
        <p style={{fontWeight:"bold", fontSize:"20px"}}>완료</p>
      </div>
    </>
  )
}

export default Option2;
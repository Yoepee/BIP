import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { __addDonation, __editDonation } from '../../redux/modules/detailDonation';

// 재능 기부 생성 뒤로가기 제목, 완료
const Option8 = ({ head, payload }) => {
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
  console.log(payload)
  console.log(isEmptyObj(payload))
  return (
    <>
      <div onClick={() => { navigate("/donation") }}>
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
        dispatch(__addDonation(payload))
        .then((response)=>{
          console.log(response)
          if(response?.payload?.data === "약속 시간을 미래로 설정해주세요."){
            alert(response?.payload?.data);
          }else{
            navigate(`/detaildonation/${response.payload.data.id}`);
          }
        })
        }else{
          if (window.confirm("약속을 수정하시겠습니까?")) {
          dispatch(__editDonation({id:id,data:payload}))
        .then((response)=>{
          if(response?.payload?.data === "약속 시간을 미래로 설정해주세요."){
            alert(response?.payload?.data);
          }else{
            navigate(`/detaildonation/${id}`);
          }
        })
        }}
        }} style={{ marginLeft: "auto", marginRight: "2%", cursor:"pointer" }}>
        <p style={{fontWeight:"bold", fontSize:"20px"}}>완료</p>
      </div>
    </>
  )
}

export default Option8;
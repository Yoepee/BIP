import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { __addPromise, __editPromise } from '../../redux/modules/detailPromise';
import Swal from 'sweetalert2';

// 약속생성 뒤로가기(홈) 제목 완료
const Option2 = ({ head, payload }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  const isEmptyObj = (obj) => {
    if (obj.constructor === Object) {
      for (const key in obj) {
        if (obj[key] === "")
          return true;
      }
    }
    return false;
  }

  return (
    <>
      <div onClick={() => { navigate("/") }}>
        <p style={{ marginTop: "20px" }}><ArrowBackIosNewRoundedIcon style={{ color: "#3E09D1" }} /></p>
      </div>
      <div style={{ marginLeft: "1%" }}>
        <p style={{ fontWeight: "bold", fontSize: "20px" }}>{head}</p>
      </div>
      <div onClick={() => {
        if (id === undefined) {
          if (isEmptyObj(payload)) {
            Swal.fire("작성하지 않은 내용이 있습니다.", "　", "error")
            return;
          }
          dispatch(__addPromise(payload))
            .then((response) => {
              if (response?.payload?.data === "약속 시간을 미래로 설정해주세요.") {
                Swal.fire(response?.payload?.data, "　", "error");
              } else {
                navigate(`/detailpromise/${response.payload.data.id}`);
              }
            })
        } else {
          if (isEmptyObj(payload)) {
            Swal.fire("작성하지 않은 내용이 있습니다.", "　", "error")
            return;
          }
          Swal.fire({
            title: `약속을 수정하시겠습니까?`,
            showCancelButton: true,
            confirmButtonColor: '#3E09D1',
            cancelButtonColor: 'tomato',
            confirmButtonText: '수정',
            cancelButtonText: '취소',
          }).then((result) => {
            if (result.isConfirmed) {
            dispatch(__editPromise({ id: id, data: payload }))
              .then((response) => {
                if (response?.payload?.data === "약속 시간을 미래로 설정해주세요.") {
                  Swal.fire(response?.payload?.data, "　", "error");
                } else {
                  navigate(`/detailpromise/${id}`);
                }
              })
          }})
        }
      }} style={{ marginLeft: "auto", marginRight: "2%", cursor: "pointer" }}>
        <p style={{ fontWeight: "bold", fontSize: "20px" }}>완료</p>
      </div>
    </>
  )
}

export default Option2;
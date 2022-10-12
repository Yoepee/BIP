import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { __addDonation, __editDonation } from '../../redux/modules/detailDonation';
import Swal from 'sweetalert2';
import axios from 'axios';

// 재능 기부 생성 뒤로가기 제목, 완료
const Option8 = ({ head, payload }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  const __isToken = async () => {
    await axios.get(process.env.REACT_APP_SERVER_HOST + `/api/member/reissue`, {
      headers: {
        Authorization: localStorage.getItem('Authorization'),
        RefreshToken: localStorage.getItem('RefreshToken'),
      }
    }
    ).then((res) => {
      if (res.data.success) {
        localStorage.setItem("Authorization", res.headers.authorization);
        localStorage.setItem("RefreshToken", res.headers.refreshtoken);
      }
    })
  }

  const isEmptyObj = (obj) => {
    if (obj.constructor === Object) {
      for (const key in obj) {
        if (obj[key] === "") {
          return true;
        }
      }
    }
    return false;
  }
  return (
    <>
      <div onClick={() => { navigate("/donation") }}>
        <p style={{ marginTop: "23px", cursor:"pointer" }}><ArrowBackIosNewRoundedIcon /></p>
      </div>
      <div style={{ marginLeft: "1%", marginTop: "6px" }}>
        <p style={{ fontWeight: "bold", fontSize: "20px", marginTop: "14px" }}>{head}</p>
      </div>
      <div onClick={() => {
        if (id === undefined) {
          if (isEmptyObj(payload)) {
            Swal.fire("작성하지 않은 내용이 있습니다.", "　", "error")
            return;
          }
          __isToken().then(() => {
            dispatch(__addDonation(payload))
              .then((response) => {
                navigate(`/detaildonation/${response.payload.data.id}`);
              })
          })
        } else {
          Swal.fire({
            title: `약속을 수정하시겠습니까?`,
            showCancelButton: true,
            confirmButtonColor: '#3E09D1',
            cancelButtonColor: 'tomato',
            confirmButtonText: '수정',
            cancelButtonText: '취소',
          }).then((result) => {
            if (result.isConfirmed) {
              __isToken().then(() => {
                dispatch(__editDonation({ id: id, data: payload }))
                  .then(() => {
                    navigate(`/detaildonation/${id}`);
                  })
              })
            }
          })
        }
      }} style={{ marginLeft: "auto", marginRight: "2%", cursor: "pointer" }}>
        <p style={{ fontWeight: "bold", fontSize: "20px", marginTop: "20px" }}>완료</p>
      </div>
    </>
  )
}

export default Option8;
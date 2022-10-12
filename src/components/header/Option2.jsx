import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { __addPromise, __editPromise } from '../../redux/modules/detailPromise';
import Swal from 'sweetalert2';
import axios from 'axios';
import styled from "styled-components";

// 약속생성 뒤로가기(홈) 제목 완료
const Option2 = ({ head, payload }) => {
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
        if (obj[key] === "")
          return true;
      }
    }
    return false;
  }

  return (
    <>
      <BackIcon onClick={() => { navigate("/") }}>
        <p style={{ marginTop: "23px" }}><ArrowBackIosNewRoundedIcon style={{ cursor:"pointer" }} /></p>
      </BackIcon>
      <div style={{ marginLeft: "1%" }}>
        <p style={{ fontWeight: "bold", fontSize: "20px" }}>{head}</p>
      </div>
      <div onClick={() => {
        if (id === undefined) {
          if (isEmptyObj(payload)) {
            Swal.fire("작성하지 않은 내용이 있습니다.", "　", "error")
            return;
          }
          __isToken().then(() => {
            dispatch(__addPromise(payload))
              .then((response) => {
                if (response?.payload?.data === "약속 시간을 미래로 설정해주세요.") {
                  Swal.fire(response?.payload?.data, "　", "error");
                } else {
                  navigate(`/detailpromise/${response.payload.data.id}`);
                }
              })
          })
        } else {
          if (isEmptyObj(payload)) {
            Swal.fire("작성하지 않은 내용이 있습니다.", "　", "error")
            return;
          }
          Swal.fire({
            title: `약속을 수정하시겠습니까?`,
            showCancelButton: true,
            confirmButtonColor: '#6B68F3',
            cancelButtonColor: 'tomato',
            confirmButtonText: '수정',
            cancelButtonText: '취소',
          }).then((result) => {
            if (result.isConfirmed) {
              __isToken().then(() => {
                dispatch(__editPromise({ id: id, data: payload }))
                  .then((response) => {
                    if (response?.payload?.data === "약속 시간을 미래로 설정해주세요.") {
                      Swal.fire(response?.payload?.data, "　", "error");
                    } else {
                      navigate(`/detailpromise/${id}`);
                    }
                  })
              })
            }
          })
        }
      }} style={{ marginLeft: "auto", marginRight: "2%", cursor: "pointer" }}>
        <p style={{ fontWeight: "bold", fontSize: "20px" }}>완료</p>
      </div>
    </>
  )
}

export default Option2;

const BackIcon = styled.div`
  /* background-color: pink; */
  @media screen and (min-width: 769px) {
    display: none;
  }
`
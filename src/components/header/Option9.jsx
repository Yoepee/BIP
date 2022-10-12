import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import { useNavigate, useParams } from 'react-router-dom';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { __getDetailDonation } from '../../redux/modules/detailDonation';
import Swal from 'sweetalert2';

// 약속상세보기 뒤로가기(홈) 제목 메뉴(방장-방장위임, 멤버 조정, 방장x- 약속나가기, 취소)
const Option9 = ({ head }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [chk, setChk] = useState(false);
  const { id } = useParams();
  const donate = useSelector((state) => state.detailDonation);

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

  useEffect(() => {
    __isToken().then(() => {
      dispatch(__getDetailDonation);
    });
  }, [dispatch])


  const removeDonation = async () => {
    Swal.fire({
      title: `게시글을 삭제하시겠습니까?`,
      showCancelButton: true,
      confirmButtonColor: '#3E09D1',
      cancelButtonColor: 'tomato',
      confirmButtonText: '삭제',
      cancelButtonText: '취소',
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axios.delete(process.env.REACT_APP_SERVER_HOST + `/api/posts/${id}`, {
          headers: {
            Authorization: localStorage.getItem('Authorization'),
            RefreshToken: localStorage.getItem('RefreshToken'),
          }
        }).then((response) => {
          if (response.data.success) {
            navigate("/donation")
          } else {
            Swal.fire(response.data.data, "　", "error");
            setChk(0);
          }
        })
      } else {
        setChk(0);
      }
    })
  }
  return (
    <>
      <div onClick={() => { navigate("/donation") }}>
        <p><ArrowBackIosNewRoundedIcon style={{ cursor:"pointer" }} /></p>
      </div>
      <div style={{ marginLeft: "1%", fontWeight: "bold", fontSize: "20px" }}>
        <p style={{ marginTop: "13px" }}>{head}</p>
      </div>
      <div style={{ marginLeft: "auto", marginRight: "2%", display: "flex" }}>
        {donate?.data?.data?.nickname === localStorage.getItem("name") ?
          <div onClick={() => { setChk(!chk) }} style={{ marginRight: "2%" }}>
            <p style={{ color: "#D9DCFB" }}><MoreVertIcon /></p>
          </div>
          : null}
        {chk == 1 ?
          <div style={{
            width: "150px",
            position: "absolute",
            backgroundColor: "white",
            top: "50px", right: "20px",
            textAlign: "center",
            borderRadius: "5px",
            border: "1px solid black",
            zIndex: "10"
          }}>
            <OptionMenu
              onClick={() => { navigate(`/adddonation/edit${id}`) }}>게시글 수정</OptionMenu>
            <OptionMenu
              onClick={() => { __isToken().then(() => { removeDonation() }) }}>게시글 삭제</OptionMenu>
            <OptionMenu sstyle={{ borderBottom: "0px solid black" }}
              onClick={() => { setChk(!chk); }}>취소</OptionMenu>
          </div>
          : null}
      </div>
    </>
  )
}

export default Option9;

const OptionMenu = styled.div`
padding: 3px;
cursor: pointer;
&:hover{
  background-color:#6B68F3;
  color:white;
}`
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import { useNavigate, useParams } from 'react-router-dom';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ManageAccountsRoundedIcon from '@mui/icons-material/ManageAccountsRounded';
import { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Swal from 'sweetalert2';

// 약속상세보기 뒤로가기(홈) 제목 메뉴(방장-방장위임, 멤버 조정, 방장x- 약속나가기, 취소)
const Option3 = ({ head }) => {
  const navigate = useNavigate();
  const [chk, setChk] = useState(0);
  const [leader, setLeader] = useState(false);
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

  const bangjang = async () => {
    await axios.get(process.env.REACT_APP_SERVER_HOST + `/api/events/master/check/${id}`, {
      headers: {
        Authorization: localStorage.getItem('Authorization'),
        RefreshToken: localStorage.getItem('RefreshToken')
      }
    }).then((response) => {
      if (response.data.success) {
        if (response.data.data.nickname === localStorage.getItem("name"))
          setLeader(true);
      } else {
        return;
      }
    })
  }

  const exitPromist = async () => {
    Swal.fire({
      title: `약속을 나가시겠습니까?`,
      showCancelButton: true,
      confirmButtonColor: '#3E09D1',
      cancelButtonColor: 'tomato',
      confirmButtonText: '확인',
      cancelButtonText: '취소',
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axios.delete(process.env.REACT_APP_SERVER_HOST + `/api/events/exit/${id}`, {
          headers: {
            Authorization: localStorage.getItem('Authorization'),
            RefreshToken: localStorage.getItem('RefreshToken'),
          }
        }).then(async (response) => {
          if (response.data.success) {
            await axios.get(process.env.REACT_APP_SERVER_HOST + `/api/chat/member/${id}`, {
              headers: {
                Authorization: localStorage.getItem('Authorization'),
                RefreshToken: localStorage.getItem('RefreshToken'),
              }
            }).then(async (res) => {
              if (res.data.data !== "채팅방에 없는 회원입니다") {
                navigate("/")
              } else {
                await axios.delete(process.env.REACT_APP_SERVER_HOST + `/api/chat/member/${id}`, {
                  headers: {
                    Authorization: localStorage.getItem('Authorization'),
                    RefreshToken: localStorage.getItem('RefreshToken'),
                  }
                })
                navigate("/")
              }
            })
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

  const removePromist = async () => {
    Swal.fire({
      title: `약속을 삭제하시겠습니까?`,
      showCancelButton: true,
      confirmButtonColor: '#3E09D1',
      cancelButtonColor: 'tomato',
      confirmButtonText: '삭제',
      cancelButtonText: '취소',
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axios.delete(process.env.REACT_APP_SERVER_HOST + `/api/events/${id}`, {
          headers: {
            Authorization: localStorage.getItem('Authorization'),
            RefreshToken: localStorage.getItem('RefreshToken'),
          }
        }).then((response) => {
          if (response.data.success) {
            navigate("/")
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
  const __endPromise = async () => {
    Swal.fire({
      title: `약속을 마치시겠습니까?`,
      showCancelButton: true,
      confirmButtonColor: '#3E09D1',
      cancelButtonColor: 'tomato',
      confirmButtonText: '확인',
      cancelButtonText: '취소',
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axios.put(process.env.REACT_APP_SERVER_HOST + `/api/events/confirm/${id}`, null, {
          headers: {
            Authorization: localStorage.getItem('Authorization'),
            RefreshToken: localStorage.getItem('RefreshToken'),
          }
        }).then((response) => {
          if (response.data.success) {
            Swal.fire(response.data.data, "　", "success");
            setChk(0);
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

  useEffect(() => {
    __isToken().then(() => {
      bangjang();
    });
  }, [])

  return (
    <>
      <BackIcon onClick={() => { navigate("/") }}>
        <p><ArrowBackIosNewRoundedIcon style={{ color: "#6B68F3", cursor:"pointer" }} /></p>
      </BackIcon>
      <div style={{ marginLeft: "1%" }}>
        <p>{head}</p>
      </div>
      <div style={{ marginLeft: "auto", marginRight: "2%", display: "flex" }}>
        {leader ?
          <div onClick={() => { if (chk === 0) { setChk(2); } else { setChk(0) } }} style={{ marginRight: "20px" }}>
            <p style={{ color: "#6B68F3", cursor:"pointer" }}><ManageAccountsRoundedIcon /></p>
          </div>
          : null}
        {chk === 2 ?
          <div style={{
            width: "150px",
            position: "absolute",
            backgroundColor: "white",
            top: "50px", right: "60px",
            textAlign: "center",
            borderRadius: "5px",
            border: "1px solid black",
            zIndex: "10"
          }}>
            <OptionMenu
              onClick={() => { __isToken().then(() => { __endPromise() }) }}>약속 종료</OptionMenu>
            <OptionMenu
              onClick={() => { navigate(`/promiseleader/id=${id}/type=leader`) }}>방장 위임</OptionMenu>
            <OptionMenu
              onClick={() => { navigate(`/promiseleader/id=${id}/type=kick`) }}>멤버 조정</OptionMenu>
            <OptionMenu
              onClick={() => {
                navigate(`/addpromise/edit${id}`)
              }}>약속 수정</OptionMenu>
            <OptionMenu
              onClick={() => { __isToken().then(() => { removePromist() }) }}>약속 삭제</OptionMenu>
            <OptionMenu style={{ borderBottom: "none" }}
              onClick={() => { setChk(0); }}>취소</OptionMenu>
          </div>
          : null}
        <div onClick={() => { if (chk === 0) { setChk(1); } else { setChk(0) } }} style={{ marginRight: "2%" }}>
          <p style={{ color: "#6B68F3", cursor:"pointer" }}><MoreVertIcon /></p>
        </div>
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
              onClick={() => { __isToken().then(() => { exitPromist() }) }}>약속 나가기</OptionMenu>
            <OptionMenu sstyle={{ borderBottom: "0px solid black" }}
              onClick={() => { setChk(!chk); }}>취소</OptionMenu>
          </div>
          : null
        }
      </div>
    </>
  )
}

export default Option3;

const OptionMenu = styled.div`
padding: 3px;
cursor: pointer;
&:hover{
  background-color:#6B68F3;
  color:white;
}`

const BackIcon = styled.div`
  /* background-color: pink; */
  @media screen and (min-width: 769px) {
    display: none;
  }
`
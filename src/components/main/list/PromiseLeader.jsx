import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { __getCheckIn } from "../../../redux/modules/checkIn";
import styled from "styled-components";
import axios from "axios";
import Swal from "sweetalert2";

//약속 방장 기능 (방장위임, 멤버 조정)
const PromiseLeader = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
  // 약속 상세정보 받아오기 (멤버리스트 활용)
  const promise = useSelector((state) => state.checkIn);
  const { id, type } = useParams();
  useEffect(() => {
    __isToken().then(() => {
      dispatch(__getCheckIn(id));
    })
  }, [dispatch])

  // 방장위임
  const __giveLeader = async (member) => {
    Swal.fire({
      title: `방장을 위임하시겠습니까?`,
      showCancelButton: true,
      confirmButtonColor: '#3E09D1',
      cancelButtonColor: 'tomato',
      confirmButtonText: '위임',
      cancelButtonText: '취소',
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axios.post(process.env.REACT_APP_SERVER_HOST + `/api/events/master/${id}`, { targetId: member }, {
          headers: {
            Authorization: localStorage.getItem('Authorization'),
            RefreshToken: localStorage.getItem('RefreshToken')
          }
        }).then((response) => {
          if (response.data.success) {
            navigate(`/detailpromise/${id}`)
          } else {
            return;
          }
        })
      }
    })
  }

  // 멤버 조정
  const __kickMember = async (member, nickname) => {
    Swal.fire({
      title: `${nickname}님을 제외하시겠습니까?`,
      showCancelButton: true,
      confirmButtonColor: '#3E09D1',
      cancelButtonColor: 'tomato',
      confirmButtonText: '제외',
      cancelButtonText: '취소',
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axios.post(process.env.REACT_APP_SERVER_HOST + `/api/events/master/deport/${id}`, { targetId: member }, {
          headers: {
            Authorization: localStorage.getItem('Authorization'),
            RefreshToken: localStorage.getItem('RefreshToken')
          }
        }).then((response) => {
          if (response.data.success) {
            navigate(`/detailpromise/${id}`)
          } else {
            return;
          }
        })
      } else {
        return;
      }
    })
  }

  return (
    <>
      {/* 멤버목록에서 방장 제외 리스트 출력 */}
      {promise?.data?.data?.map((member) => {
        if (promise?.data?.data?.length === 1) {
          return (
            <div>
              다른 멤버가 없습니다.
            </div>
          )
        }
        if (member.nicknameByFriend === localStorage.getItem("name")) {
          return;
        } else {
          return (
            <div style={{ display: "flex", border: "1px solid black", margin: "10px" }} key={member.id}>
              {member.profileImageUrl === null ?
                <img src={process.env.PUBLIC_URL + `/assets/user_svg.svg`} style={{ width: "50px" }} />
                : <img src={member.profileImageUrl} style={{ width: "50px" }} />
              }
              {member.nicknameByOwner === null ?
                <p>{member.nicknameByFriend}</p>
                : <div>
                  <div>{member.nicknameByOwner}</div>
                  <div style={{ color: "#a4a4a4" }}>{member.nicknameByFriend}</div>
                </div>
              }
              <AddFriend onClick={() => {
                __isToken().then(() => {
                  if (type === "leader") {
                    __giveLeader(member.id);
                  } else {
                    __kickMember(member.id, member.nicknameByFriend);
                  }
                })
              }}>선택</AddFriend>
            </div>
          )
        }
      })}
    </>
  )
}

export default PromiseLeader;

const AddFriend = styled.p`
margin-left:auto;
margin-right:2%;
background-color:#6D09D1;
color:white;
border-radius:6px;
padding:5px;
cursor:pointer;
`
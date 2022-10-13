import axios from "axios";
import styled from "styled-components"
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { __invitePromise } from "../../redux/modules/detailPromise";
import { __getMember, removeFriend, __secondName } from "../../redux/modules/member";
import Swal from "sweetalert2";

// 친구목록 컴포넌트
// type = none - 무반응, give - 별칭 주기, remove - 삭제
const Member = ({ type, setType }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
  // 친구목록 받아오기
  const member = useSelector((state) => state.member);
  // 친구목록에서 동작하는 기능 체크용도 (add = 신용도 추가, id = 약속 목록 초대(게시글 번호))
  const { id, add } = useParams();

  useEffect(() => {
    __isToken().then(() => {
      dispatch(__getMember());
    })
  }, [dispatch])

  // 친구 삭제 함수
  const removeMember = async (id) => {
    Swal.fire({
      title: `정말로 친구삭제 하시겠습니까?`,
      showCancelButton: true,
      confirmButtonColor: '#3E09D1',
      cancelButtonColor: 'tomato',
      confirmButtonText: '삭제',
      cancelButtonText: '취소',
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axios.delete(process.env.REACT_APP_SERVER_HOST + `/api/friends/${id}`, {
          headers: {
            Authorization: localStorage.getItem('Authorization'),
            RefreshToken: localStorage.getItem('RefreshToken')
          }
        }).then(() => {
          dispatch(removeFriend(id));
          setType(0);
        })
        return;
      } else {
        return;
      }
    })
  }

  // 별칭 주기 함수
  const giveName = async (nickname) => {
    Swal.fire({
      title: `변경할 별명을 지어주세요.`,
      input: 'text',
      showCancelButton: true,
      confirmButtonColor: '#3E09D1',
      cancelButtonColor: 'tomato',
      confirmButtonText: '확인',
      cancelButtonText: '취소',
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(__secondName({ friendNickname: nickname, secondName: result.value }))
          .then((res) => {
            if (res.payload.success) {
              setType("none");
              Swal.fire("별칭이 변경되었습니다", "　", "success");
            }
          })
      }
    })
  }

  // 약속 초대 함수
  const inviteMember = async (nickname) => {
    Swal.fire({
      title: `${nickname}님을 약속에 초대하시겠습니까?`,
      showCancelButton: true,
      confirmButtonColor: '#3E09D1',
      cancelButtonColor: 'tomato',
      confirmButtonText: '초대',
      cancelButtonText: '취소',
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(__invitePromise({ id: id, nickname: nickname }))
          .then(() => {
            navigate(`/detailpromise/${id}`)
          })
        return;
      } else {
        return;
      }
    })
  }

  // 신용도 추가 함수
  const __addFriendCredit = async (nickname, num) => {
    Swal.fire({
      title: `${nickname}님의 신용점수를 ${num}점 구매하시겠습니까?`,
      showCancelButton: true,
      confirmButtonColor: '#3E09D1',
      cancelButtonColor: 'tomato',
      confirmButtonText: '구매',
      cancelButtonText: '취소',
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axios.put(process.env.REACT_APP_SERVER_HOST + `/api/user/point`, { point: 2000 * num, nickname: nickname }, {
          headers: {
            Authorization: localStorage.getItem('Authorization'),
            RefreshToken: localStorage.getItem('RefreshToken')
          }
        }).then((response) => {
          if (response.data.success) {
            Swal.fire(response.data.data.context, "　", "success");
            navigate("/addcredit");
            setType("none");
          }
        })
        return;
      } else {
        return;
      }
    })
  }

  return (
    <div>
      <Wrap>
        {member?.data?.data?.map((friend, i) => {
          return (
            <Card key={i}
              onClick={() => {
                // 타입이 none이면 기능 동작 x
                if (type === "none") {
                  // 기능 없을 때 id값이 존재하면 약속 초대
                  if (id !== undefined) {
                    __isToken().then(() => {
                    inviteMember(friend.nicknameByFriend);
                    })
                    // add 값이 존재하면 신용점수 추가
                  } else if (add !== undefined) {
                    __isToken().then(() => {
                    __addFriendCredit(friend.nicknameByFriend, add)
                    })
                  }
                  return;
                  // type이 give이면 선택 멤버 별칭 추가
                } else if (type === "give") {
                  __isToken().then(() => {
                  giveName(friend.nicknameByFriend);
                  })
                }
                // type이 remove이면 선택 멤버 삭제
                else if (type === "remove") {
                  __isToken().then(() => {
                  removeMember(friend.id);
                  })
                }
              }}>
              {/* 사진이 없으면 기본이미지, 있다면 프로필 사진 출력 */}
              {friend.profileImgUrl === null ?
                <ProfileImg src={process.env.PUBLIC_URL + `/assets/user_svg.svg`} />
                : <ProfileImg src={friend.profileImgUrl} />
              }
              <div style={{ fontSize: "0" }}>
                {friend.nicknameByOwner === null ?
                  // 닉네임 출력
                  <Username>{friend.nicknameByFriend}</Username>
                  : <div>
                    <Username>{friend.nicknameByOwner}</Username>
                    <Nickname>{friend.nicknameByFriend}</Nickname>
                  </div>}
              </div>
              {/* 신용도 출력 */}
              <Credit>
                <span style={{ backgroundColor: "#D9DCFB", borderRadius: "50%" }}>C</span>
                <span>{friend.creditScore}</span>
              </Credit>
            </Card>
          )
        })}
      </Wrap>
    </div>
  )
}

export default Member;

const Wrap = styled.div`
  /* background-color: green; */
  width: 80%;
  margin: 50px auto;

  @media screen and (min-width: 769px) {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 10px;    
  }
`

const Card = styled.div`
  display:flex;
  height: 80px;
  border: none;
  border-radius: 8px;
  background-color: #FAFAFA;
  margin:10px;
  padding-right: 10px;
  position: relative;
  box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.1);

  @media screen and (min-width: 769px) {
    width: 160px;
    font-size: 12px;
    box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.1);
    :hover{
      transform: translateY(-5px);
      box-shadow: 3px 3px 3px 1px rgba(0, 0, 0, 0.2);
    }
  }
`

const ProfileImg = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin: 15px;
  
  @media screen and (min-width: 769px) {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    margin: auto 0;
    margin-left: 10px;
  }
`

const Username = styled.div`
font-weight:600;
margin-Top: 15px;
font-size: 14px;
  @media screen and (min-width: 769px) {
    font-size: 12px;
    font-weight: bold;
    position: absolute;
    left: 48px;
    top: 10px;
  }
`

const Nickname = styled.p`
 color: #a4a4a4;
 font-size: 14px;
 margin-top: 6px;
  @media screen and (min-width: 769px) {
      font-size: 11px;
      position: absolute;
      left: 48px;
      top: 36px;
  }
`

const Credit = styled.p`  
  height: 20px;
  margin-left: auto;
  margin-right: 5%;
  display: flex;
  span {
    width: 20px;
    text-align: center;
    line-height: 18px;
    margin-right: 1px;
  }
  @media screen and (min-width: 769px) {
    font-size: 10px;
    position: absolute;
    right: 8px;
    text-align: center;
    span {
      width: 14px;
      height: 14px;
      line-height: 12px;
    }
  }
`
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";

// 게시물 상세보기 푸터
const PromiseFooter = () => {
  const navigate = useNavigate();
  const promise = useSelector((state) => state.detailPromise);
  // 게시글 번호
  const { id } = useParams();

  return (
    <Menu>
      {/* 약속 멤버 초대 */}
      <Invite onClick={() => { navigate(`/member/invite${promise?.data?.data?.id}`) }}>초대</Invite>
      {/* 채팅하기 방으로 이동 */}
      <Chat onClick={() => { navigate(`/chat/${id}`) }}>채팅하기</Chat>
    </Menu>
  )
}

export default PromiseFooter;

const Menu = styled.div`
width:100%;

display:grid;
grid-template-columns: 1fr 2fr;
place-items: center;
position:fixed;
bottom: 0;
margin: 0 auto;
z-index: 100;
`

const Invite = styled.div`
background-color:#EDFFEB;
cursor: pointer;
width:100%;
text-align:center;
padding:10px;
font-weight:bold;
@media screen and (min-width: 769px) {
    width: 100px;
    position: fixed;
    right: 30px;
    bottom: 120px;
    border-top-left-radius: 6px;
    border-top-right-radius: 6px;
  }
`

const Chat = styled.div`
background-color: #D9DCFB;
cursor:pointer;
width:100%;
text-align:center;
padding:10px;
font-weight:bold;
@media screen and (min-width: 769px) {
    width: 100px;
    position: fixed;
    right: 30px;
    bottom: 80px;
    border-bottom-left-radius: 6px;
    border-bottom-right-radius: 6px;
  }
`
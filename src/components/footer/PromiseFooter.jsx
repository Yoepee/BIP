import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const PromiseFooter = () => {
  const navigate= useNavigate();
  const promise = useSelector((state)=>state.detailPromise);

  return (
    <Menu>
        <Invite onClick={()=>{navigate(`/member/invite${promise?.data?.data?.id}`)}}>초대</Invite>
        <Chat>채팅하기</Chat>
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
background-color:#F5EAFB;
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
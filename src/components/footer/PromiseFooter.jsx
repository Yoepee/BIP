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
bottom:0;
`

const Invite = styled.div`
background-color:#6D09D1;
color:white;
cursor:pointer;
width:80%;
text-align:center;
padding:10px;
margin: 15px;
font-weight:bold;
`

const Chat = styled.div`
background-color:#F5EAFB;
cursor:pointer;
width:80%;
text-align:center;
padding:10px;
margin: 15px;
font-weight:bold;
`
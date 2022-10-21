import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Chat from "../components/chat/Chat";
import WebHeader from "../components/header/WebHeader";
import { clearChat } from "../redux/modules/chat";
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';

import styled from "styled-components";

const ChatPage = () =>{ 
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {id} = useParams();
  const detail = useSelector((state)=>state.detailPromise);
  
  return (
    <>
    <div style={{backgroundColor:"#FAFAFA"}}>
      <WebHeader />
      {/* 헤더 후에 수정필요 */}
      <div style={{display:"flex"}}>
      <BackIcon onClick={() => { dispatch(clearChat()); navigate(`/detailpromise/${id}`) }}><ArrowBackIosNewRoundedIcon /></BackIcon>
      <BackIcon style={{width: "100%", cursor:"default"}}>{detail?.data?.data?.title}</BackIcon>
      </div>
      {/* 채팅내용 불러오기(채팅 작성 footer식으로 빼도 됨) */}
      <Chat/>
    </div>
    </>
  )
}

export default ChatPage;

const BackIcon = styled.div`
  width: 24px;
  padding-top: 26px;
  padding-left: 26px;
  cursor: pointer;
`
import { useNavigate } from "react-router-dom";
import Chat from "../components/chat/Chat";

const ChatPage = () =>{ 
  const navigate = useNavigate();
  return (
    <>
    {/* 헤더 후에 수정필요 */}
    <div onClick={() => { navigate("/") }}>홈으로</div>
    {/* 채팅내용 불러오기(채팅 작성 footer식으로 빼도 됨) */}
    <Chat/>
    </>
  )
}

export default ChatPage;
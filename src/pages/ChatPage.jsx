import { useNavigate } from "react-router-dom";
import Chat from "../components/chat/Chat";

const ChatPage = () =>{ 
  const navigate = useNavigate();
  return (
    <>
    <div onClick={() => { navigate("/") }}>홈으로</div>
    <Chat/>
    </>
  )
}

export default ChatPage;
import SockJS from 'sockjs-client'
import * as StompJs from '@stomp/stompjs'
import { useParams } from 'react-router-dom'
import { useEffect, useRef, useState, useCallback } from 'react';
import styled from 'styled-components';
import { __getChat } from '../../redux/modules/chat';
import { useDispatch, useSelector } from 'react-redux';




const Chat = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const client = useRef({});
  const chatList = useSelector((state)=>state.chat)
  const [page,setPage] = useState(0);

  const [messages, setMessages] = useState([{
    message: "",
    sender: ""
  }]);
  const inputRef = useRef("");
  const [ment, setMent] = useState("");
  let index=0;
  
  const scrollRef = useRef(null); //스크롤 하단 고정


  
  useEffect(() => {
    connect();
    dispatch(__getChat({id,page}));
    return () =>
      disconnect();
  }, []);


  //스크롤 하단 고정
  useEffect(()=>{
    scrollRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages]);
  
  useEffect(()=>{
    scrollRef.current?.scrollIntoView({ behavior: "smooth" })
  }, []);
  


  const connect = () => {
    client.current = new StompJs.Client({
      brokerURL: process.env.REACT_APP_CHAT_HOST + "/websocket",
      connectHeaders: {
        Authorization: localStorage.getItem('Authorization'),
        RefreshToken: localStorage.getItem('RefreshToken'),
      },
      debug: function (str) {
        console.log(str);
      },
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
      onConnect: () => {
        //구독요청
        subscribe();
        client.current.publish({
          destination: "/pub/chat/enter",
          headers: {
            Authorization: localStorage.getItem('Authorization'),
            RefreshToken: localStorage.getItem('RefreshToken'),
          },
          //전송할 데이터를 입력
          body: JSON.stringify({
            message:"",
            roomId: Number(id),
          }),
        });
      },
    });
    client.current.activate();
  };
  if (typeof WebSocket !== 'function') {
    client.webSocketFactory = () => {
      return new SockJS(process.env.REACT_APP_CHAT_HOST);
    };
  }
  const subscribe = () => {
    client.current.subscribe(`/sub/chat/room/${id}`, function (chat) {
      let content = JSON.parse(chat.body);
      console.log(content);
      setMessages((_messages) => [
        ..._messages,
        { message: content.message, sender: content.sender },
      ]);
    });
  };

  const submit = () => {
    console.log(JSON.stringify({
      type: 1,
      message: inputRef.current.value,
      roomId: id,
    }));
    if(inputRef.current.value === ""){
      return;
    }
    client.current.publish({
      destination: `/pub/chat/message`,
      headers: {
        Authorization: localStorage.getItem('Authorization'),
        RefreshToken: localStorage.getItem('RefreshToken'),
      },
      //전송할 데이터를 입력
      body: JSON.stringify({
        type: 1,
        message: inputRef.current.value,
        roomId: id,
      }),
    });
    setMent("")
  };

  client.current.onStompError = function (frame) {
    console.log("Broker reported error: " + frame.headers["message"]);
    console.log("Additional details: " + frame.body);
  };

  //연결 중단
  const disconnect = () => {

    //퇴장메시징(type1)
    client.current.publish({
      destination: "/pub/chat/message",
      headers: {
        Authorization: localStorage.getItem('Authorization'),
        RefreshToken: localStorage.getItem('RefreshToken'),
      },
      //전송할 데이터를 입력
      body: JSON.stringify({
        type: 1,
        roomId: Number(id),
      }),
    });
    //구독해제
    client.current.unsubscribe();
    //웹소켓 비활성화
    client.current.deactivate();

  };

  const handleKeyPress = e => {
    if (e.key === 'Enter') {
      submit();
    }
  }

  return (
    <>
      <div style={{border:"1px solid black", margin:"2%"}}>
        {chatList?.data?.map((chat,i)=>{
          if(chat.message === null){
            return;
          }else{
            if (chat.sender === localStorage.getItem("name")) {
              if(i>0&&chatList?.data[i]?.sender===chatList?.data[index]?.sender){
                index=i;
                return(
                  <div key={i}>
                  <ChatMessage style={{ display: "flex", justifyContent: "flex-end" }}>
                    <MyChat>{chat.message}</MyChat>
                  </ChatMessage>
                </div>
                )
              }else{
                index=i;
                return(
                  <div key={i}>
                  <ChatMessage>
                    <MyNick>{chat.sender}</MyNick>
                  </ChatMessage>
                  <ChatMessage style={{ display: "flex", justifyContent: "flex-end" }}>
                    <MyChat>{chat.message}</MyChat>
                  </ChatMessage>
                </div>
                )}
            } else {
              if(i>0&&chatList?.data[i]?.sender===chatList?.data[index]?.sender){
                index=i;
                return(
                  <div key={i}>
                  <ChatMessage>
                    <Chatting>{chat.message}</Chatting>
                  </ChatMessage>
                </div>
                )
              }else{
                index=i;
                return (
                  <div key={i}>
                  <ChatMessage>
                    <NickName>{chat.sender}</NickName>
                  </ChatMessage>
                  <ChatMessage>
                    <Chatting>{chat.message}</Chatting>
                  </ChatMessage>
                </div>
                )}
            }
          }
        })}
        {messages.map((msg, i) => {
          if (msg.sender === "알림") {
            return (
              <div key={i}>
                <p>{msg.message}</p>
              </div>
            )
          } else if (msg.sender === "") {
            return;
          }
          else {
            if (msg.sender === localStorage.getItem("name")) {
              return (
                <div key={i}>
                  <ChatMessage>
                    <MyNick>{msg.sender}</MyNick>
                  </ChatMessage>
                  <ChatMessage style={{ display: "flex", justifyContent: "flex-end" }}>
                    <MyChat>{msg.message}</MyChat>
                  </ChatMessage>
                </div>
              )
            } else {
              return (
                <div key={i}>
                  <ChatMessage>
                    <NickName>{msg.sender}</NickName>
                  </ChatMessage>
                  <ChatMessage>
                    <Chatting>{msg.message}</Chatting>
                  </ChatMessage>
                </div>
              )
            }
          }
        })}
      </div>
      <div>
        <input ref={inputRef}
          onKeyPress={handleKeyPress}
          value={ment} onChange={(e) => { setMent(e.target.value) }} />
        <button onClick={() => { submit() }}>전송</button>
      </div>
      <div ref={scrollRef}/>
    </>
  )
}
export default Chat;

const ChatMessage = styled.div`
background-color: white;
`
const MyNick = styled.p`
background-color: white;
margin-right:10px;
text-align:right;
`
const MyChat = styled.p`
background-color:#6D09D1;
color:white;
text-align:right;
width : fit-content;
padding:10px;
border-radius:10px;
`

const NickName = styled.p`
background-color: white;
margin-right:10px;
`

const Chatting = styled.p`
background-color: #EDFFEB;
width:fit-content;
padding:10px;
border-radius:10px;
margin-left:10px;
`
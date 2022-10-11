import SockJS from 'sockjs-client'
import * as StompJs from '@stomp/stompjs'
import { useParams } from 'react-router-dom'
import { useEffect, useRef, useState, useCallback } from 'react';
import styled from 'styled-components';
import { __getChat } from '../../redux/modules/chat';
import { useDispatch, useSelector } from 'react-redux';
import { useInView } from 'react-intersection-observer';
import axios from 'axios';
import Swal from 'sweetalert2';

// 채팅 기능 컴포넌트
const Chat = () => {
  // 게시물 id로 채팅 룸 아이디 연동
  const { id } = useParams();
  const dispatch = useDispatch();
  // 사용자랑 연결
  const client = useRef({});
  // 이전에 채팅내용 불러오기
  const chatList = useSelector((state) => state.chat)
  // 인피니티스크롤로 다음페이지 채팅내역 불러오기
  const page = useRef(0);
  const [ref, inView] = useInView();
  const [hasNextPage, setHasNextPage] = useState(true);

  // 실시간 채팅 쌓이는 스테이트
  const [messages, setMessages] = useState([{
    message: "",
    sender: ""
  }]);
  // 타이핑 치는 부분과 연동
  const inputRef = useRef("");
  const [ment, setMent] = useState("");
  // 채팅 불러오기 - 닉네임 비교하여 출력여부 결정하는 용도
  let index = 0;
  // 실시간 채팅 닉네임 비교하여 출력여부 결정하는 용도
  let index2 = 0;
  let dayIndex = 0;
  let timeIndex = 0;

  const scrollRef = useRef(null); //스크롤 하단 고정

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

  // 랜더링시 이전 채팅내용 불러오는 함수 및 stomp채팅 연결
  useEffect(() => {
    __isToken().then(async() => {
      await axios.get(process.env.REACT_APP_SERVER_HOST + `/api/events/member/${id}`, {
        headers: {
          Authorization: localStorage.getItem('Authorization'),
          RefreshToken: localStorage.getItem('RefreshToken'),
        }
      }).then((res)=>{
        if(res.data.data){
          connect();
          dispatch(__getChat({ id, page: page.current }));
        }else{
          Swal.fire("채팅방 멤버가 아닙니다.","　","error")
        }
      })
    })
    return () =>
      __isToken().then(() => {
        disconnect();
      })
  }, []);

  // 인피니티 스크롤 기능 (다음페이지 데이터 받아옴)
  const fetch = useCallback(() => { __isToken().then(() => { dispatch(__getChat({ id, page: page.current })); page.current += 1; }) }, []);
  useEffect(() => {
    if (inView && hasNextPage) {
      fetch();
    }
  }, [fetch, hasNextPage, inView])


  //스크롤 하단 고정
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" })
  }, []);



  // 웹소켓 서버와 연결 
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
        // 구독을 통한 채팅방 연결
        // 처음 입장시 채팅방 서버에 입장한 것으로 인식
        subscribe();
        client.current.publish({
          destination: "/pub/chat/enter",
          headers: {
            Authorization: localStorage.getItem('Authorization'),
            RefreshToken: localStorage.getItem('RefreshToken'),
          },
          //전송할 데이터를 입력
          body: JSON.stringify({
            message: "",
            roomId: Number(id),
          }),
        });
      },
    });
    client.current.activate();
  };
  // sockJS로 소켓 미지원 브라우저 대응하기
  if (typeof WebSocket !== 'function') {
    client.webSocketFactory = () => {
      return new SockJS(process.env.REACT_APP_CHAT_HOST);
    };
  }
  // 구독하기
  const subscribe = () => {
    client.current.subscribe(`/sub/chat/room/${id}`, function (chat) {
      let content = JSON.parse(chat.body);
      console.log(content);
      setMessages((_messages) => [
        ..._messages,
        { message: content.message, sender: content.sender, sendTime:content.sendTime },
      ]);
    });
  };

  // 메세지 보내는 함수
  const submit = () => {
    console.log(JSON.stringify({
      // 타입 1 = 메세지 보내기
      type: 1,
      message: inputRef.current.value,
      roomId: id,
    }));
    // 값이 없으면 전달 x
    if (inputRef.current.value === "") {
      return;
    }
    // 메세지 보내는 동작
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
    // 보내고나서 채팅 입력 초기화
    setMent("")
  };

  // 에러발생시 콘솔에 출력
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

  // 엔터로 댓글쓰기
  const handleKeyPress = e => {
    if (e.key === 'Enter') {
      submit();
    }
  }
  console.log(messages);
  console.log(chatList)
  return (
    <>
      {/* 인피니티 스크롤 인식 ref */}
      <div ref={ref} style={{ position: "absolute", top: "600px" }} />

      <div style={{ border: "1px solid black", margin: "2%" }}>
        {/* 채팅내용 불러오기 */}
        {chatList?.data?.map((chat, i) => {
          if (chat.message === null) {
            return;
          } else {
            if (chat.sender === localStorage.getItem("name")) {
              if (i > 0 && chatList?.data[i]?.sender === chatList?.data[index]?.sender) {
                index = i;
                return (
                  <div key={i}>
                    <ChatMessage style={{ display: "flex", justifyContent: "flex-end" }}>
                      <MyChat>{chat.message}</MyChat>
                    </ChatMessage>
                  </div>
                )
              } else {
                index = i;
                return (
                  <div key={i}>
                    <ChatMessage>
                      <MyNick>{chat.sender}</MyNick>
                    </ChatMessage>
                    <ChatMessage style={{ display: "flex", justifyContent: "flex-end" }}>
                      <MyChat>{chat.message}</MyChat>
                    </ChatMessage>
                  </div>
                )
              }
            } else {
              if (i > 0 && chatList?.data[i]?.sender === chatList?.data[index]?.sender) {
                index = i;
                return (
                  <div key={i}>
                    <ChatMessage>
                      <Chatting>{chat.message}</Chatting>
                    </ChatMessage>
                  </div>
                )
              } else {
                index = i;
                return (
                  <div key={i}>
                    <ChatMessage>
                      <NickName>{chat.sender}</NickName>
                    </ChatMessage>
                    <ChatMessage>
                      <Chatting>{chat.message}</Chatting>
                    </ChatMessage>
                  </div>
                )
              }
            }
          }
        })}
        {/* 실시간 채팅 불러오기 */}
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
              if (i > 0 && messages[i]?.sender === messages[index2]?.sender) {
                index2 = i;
                return (
                  <div key={i}>
                    <ChatMessage style={{ display: "flex", justifyContent: "flex-end" }}>
                      <MyChat>{msg.message}</MyChat>
                    </ChatMessage>
                  </div>
                )
              } else {
                index2 = i;
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
              }
            } else {
              if (i > 0 && messages[i]?.sender === messages[index2]?.sender) {
                index2 = i;
                return (
                  <div key={i}>
                    <ChatMessage>
                      <Chatting>{msg.message}</Chatting>
                    </ChatMessage>
                  </div>
                )
              } else {
                index2 = i;
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
          }
        })}
      </div>
      {/* 스크롤 하단 고정 */}
      <div>
        <input ref={inputRef}
          onKeyPress={handleKeyPress}
          value={ment} onChange={(e) => { setMent(e.target.value) }} />
        <button onClick={() => { submit() }}>전송</button>
      </div>
      <div ref={scrollRef} />
    </>
  )
}
export default Chat;

const ChatMessage = styled.div`
background-color: white;
`
const MyNick = styled.div`
background-color: white;
margin-right:10px;
text-align:right;
`
const MyChat = styled.div`
background-color:#6D09D1;
color:white;
text-align:right;
width : fit-content;
padding:10px;
border-radius:10px;
margin:3px;
`

const NickName = styled.div`
background-color: white;
margin-right:10px;
`

const Chatting = styled.div`
background-color: #EDFFEB;
width:fit-content;
padding:10px;
border-radius:10px;
margin-left:10px;
margin:3px;
`
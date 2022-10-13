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
import SendIcon from '@mui/icons-material/Send';


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
  const [messages, setMessages] = useState([]);
  // 타이핑 치는 부분과 연동
  const inputRef = useRef("");
  const [ment, setMent] = useState("");
  // 채팅 불러오기 - 닉네임 비교하여 출력여부 결정하는 용도
  let index = 0;
  // 실시간 채팅 닉네임 비교하여 출력여부 결정하는 용도
  let index2 = 0;

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
    __isToken().then(async () => {
      await axios.get(process.env.REACT_APP_SERVER_HOST + `/api/events/member/${id}`, {
        headers: {
          Authorization: localStorage.getItem('Authorization'),
          RefreshToken: localStorage.getItem('RefreshToken'),
        }
      }).then((res) => {
        if (res.data.data) {
          connect();
          dispatch(__getChat({ id, page: page.current }));
        } else {
          Swal.fire("채팅방 멤버가 아닙니다.", "　", "error")
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
        { message: content.message, sender: content.sender, sendTime: content.sendTime },
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
      <Wrap>
        {/* 인피니티 스크롤 인식 ref */}
        <div ref={ref} style={{ position: "absolute", top: "600px" }} />

        <div style={{ border: "0.8px solid #494949", borderRadius: "8px", padding: "10px" }}>
          {/* 채팅내용 불러오기 */}
          {chatList?.data?.map((chat, i) => {
            // null 값으로 출력나오는 내용 x
            if (chat.message === null) {
              return;
            } else {
              // 본인이 작성한 게시글일 경우
              if (chat.sender === localStorage.getItem("name")) {
                // 게시글 작성자가 중복일 경우 출력x
                if (i > 0 && chatList?.data[i]?.sender === chatList?.data[index]?.sender) {
                  // 날짜가 동일할 경우 출력 x
                  if (chatList?.data[i]?.sendTime.split("-")[0] === chatList?.data[index]?.sendTime.split("-")[0]) {
                    index = i;
                    return (
                      <div key={i}>
                        <ChatMessage style={{ display: "flex", justifyContent: "flex-end" }}>
                          <MyChat>{chat.message}</MyChat>
                        </ChatMessage>
                        {chatList?.data[i]?.sendTime === chatList?.data[i + 1]?.sendTime ?
                          chatList?.data[i]?.sender === chatList?.data[i + 1]?.sender ?
                            null :
                            <ChatMessage>
                              <StTime style={{ display: "flex", justifyContent: "flex-end" }}>{chat.sendTime.split("-")[1]}</StTime>
                            </ChatMessage>
                          : <ChatMessage>
                            <StTime style={{ display: "flex", justifyContent: "flex-end" }}>{chat.sendTime.split("-")[1]}</StTime>
                          </ChatMessage>
                        }
                      </div>
                    )
                  }
                  // 날짜가 다를 경우 출력 o
                  else {
                    index = i;
                    return (
                      <div key={i}>
                        <StDate>{chat.sendTime.split("-")[0]}</StDate>
                        <ChatMessage style={{ display: "flex", justifyContent: "flex-end" }}>
                          <MyChat>{chat.message}</MyChat>
                        </ChatMessage>
                        {chatList?.data[i]?.sendTime === chatList?.data[i + 1]?.sendTime ?
                          chatList?.data[i]?.sender === chatList?.data[i + 1]?.sender ?
                            null :
                            <ChatMessage>
                              <StTime style={{ display: "flex", justifyContent: "flex-end" }}>{chat.sendTime.split("-")[1]}</StTime>
                            </ChatMessage>
                          : <ChatMessage>
                            <StTime style={{ display: "flex", justifyContent: "flex-end" }}>{chat.sendTime.split("-")[1]}</StTime>
                          </ChatMessage>
                        }
                      </div>
                    )
                  }
                  // 게시글 작성자가 중복이 아닌경우
                } else {
                  // 날짜가 중복인 경우 출력x
                  if (chatList?.data[i]?.sendTime.split("-")[0] === chatList?.data[index]?.sendTime.split("-")[0]) {
                    index = i;
                    return (
                      <div key={i}>
                        <ChatMessage>
                          {i === 0 ? <StDate>{chat.sendTime.split("-")[0]}</StDate> : null}
                          <MyNick>{chat.sender}</MyNick>
                        </ChatMessage>
                        <ChatMessage style={{ display: "flex", justifyContent: "flex-end" }}>
                          <MyChat>{chat.message}</MyChat>
                        </ChatMessage>
                        {chatList?.data[i]?.sendTime === chatList?.data[i + 1]?.sendTime ?
                          chatList?.data[i]?.sender === chatList?.data[i + 1]?.sender ?
                            null :
                            <ChatMessage>
                              <StTime style={{ display: "flex", justifyContent: "flex-end" }}>{chat.sendTime.split("-")[1]}</StTime>
                            </ChatMessage>
                          : <ChatMessage>
                            <StTime style={{ display: "flex", justifyContent: "flex-end" }}>{chat.sendTime.split("-")[1]}</StTime>
                          </ChatMessage>
                        }
                      </div>
                    )
                  }
                  // 날짜가 중복이 아닌 경우 출력
                  else {
                    index = i;
                    return (
                      <div key={i}>
                        <StDate>{chat.sendTime.split("-")[0]}</StDate>
                        <ChatMessage>
                          {i === 0 ? <StDate>{chat.sendTime.split("-")[0]}</StDate> : null}
                          <MyNick>{chat.sender}</MyNick>
                        </ChatMessage>
                        <ChatMessage style={{ display: "flex", justifyContent: "flex-end" }}>
                          <MyChat>{chat.message}</MyChat>
                        </ChatMessage>
                        {chatList?.data[i]?.sendTime === chatList?.data[i + 1]?.sendTime ?
                          chatList?.data[i]?.sender === chatList?.data[i + 1]?.sender ?
                            null :
                            <ChatMessage>
                              <StTime style={{ display: "flex", justifyContent: "flex-end" }}>{chat.sendTime.split("-")[1]}</StTime>
                            </ChatMessage>
                          : <ChatMessage>
                            <StTime style={{ display: "flex", justifyContent: "flex-end" }}>{chat.sendTime.split("-")[1]}</StTime>
                          </ChatMessage>
                        }
                      </div>
                    )
                  }
                }
                // 본인이 작성자가 아닌경우
              } else {
                // 작성자가 중복인 경우 출력 x
                if (i > 0 && chatList?.data[i]?.sender === chatList?.data[index]?.sender) {
                  // 날짜가 중복인 경우 출력 x
                  if (chatList?.data[i]?.sendTime.split("-")[0] === chatList?.data[index]?.sendTime.split("-")[0]) {
                    index = i;
                    return (
                      <div key={i}>
                        <ChatMessage>
                          <Chatting>{chat.message}</Chatting>
                        </ChatMessage>
                        {chatList?.data[i]?.sendTime === chatList?.data[i + 1]?.sendTime ?
                          chatList?.data[i]?.sender === chatList?.data[i + 1]?.sender ?
                            null :
                            <ChatMessage>
                              <StTime>{chat.sendTime.split("-")[1]}</StTime>
                            </ChatMessage>
                          : <ChatMessage>
                            <StTime>{chat.sendTime.split("-")[1]}</StTime>
                          </ChatMessage>
                        }
                      </div>
                    )
                  }
                  // 날짜가 중복이 아닌경우 출력o
                  else {
                    index = i;
                    return (
                      <div key={i}>
                        {i === 0 ? <StDate>{chat.sendTime.split("-")[0]}</StDate> : null}
                        <StDate>{chat.sendTime.split("-")[0]}</StDate>
                        <ChatMessage>
                          <Chatting>{chat.message}</Chatting>
                        </ChatMessage>
                        {chatList?.data[i]?.sendTime === chatList?.data[i + 1]?.sendTime ?
                          chatList?.data[i]?.sender === chatList?.data[i + 1]?.sender ?
                            null :
                            <ChatMessage>
                              <StTime>{chat.sendTime.split("-")[1]}</StTime>
                            </ChatMessage>
                          : <ChatMessage>
                            <StTime>{chat.sendTime.split("-")[1]}</StTime>
                          </ChatMessage>
                        }
                      </div>
                    )
                  }
                  // 작성자가 타인인데 중복이 아닌경우
                } else {
                  // 날짜가 중복인 경우 출력 x
                  if (chatList?.data[i]?.sendTime.split("-")[0] === chatList?.data[index]?.sendTime.split("-")[0]) {
                    index = i;
                    return (
                      <div key={i}>
                        <ChatMessage>
                          <NickName>{chat.sender}</NickName>
                        </ChatMessage>
                        <ChatMessage>
                          <Chatting>{chat.message}</Chatting>
                        </ChatMessage>
                        {chatList?.data[i]?.sendTime === chatList?.data[i + 1]?.sendTime ?
                          chatList?.data[i]?.sender === chatList?.data[i + 1]?.sender ?
                            null :
                            <ChatMessage>
                              <StTime>{chat.sendTime.split("-")[1]}</StTime>
                            </ChatMessage>
                          : <ChatMessage>
                            <StTime>{chat.sendTime.split("-")[1]}</StTime>
                          </ChatMessage>
                        }
                      </div>
                    )
                  }
                  // 날짜가 중복이 아닌경우 출력 o
                  else {
                    index = i;
                    return (
                      <div key={i}>
                        {i === 0 ? <StDate>{chat.sendTime.split("-")[0]}</StDate> : null}
                        <StDate>{chat.sendTime.split("-")[0]}</StDate>
                        <ChatMessage>
                          <NickName>{chat.sender}</NickName>
                        </ChatMessage>
                        <ChatMessage>
                          <Chatting>{chat.message}</Chatting>
                        </ChatMessage>
                        {chatList?.data[i]?.sendTime === chatList?.data[i + 1]?.sendTime ?
                          chatList?.data[i]?.sender === chatList?.data[i + 1]?.sender ?
                            null :
                            <ChatMessage>
                              <StTime>{chat.sendTime.split("-")[1]}</StTime>
                            </ChatMessage>
                          : <ChatMessage>
                            <StTime>{chat.sendTime.split("-")[1]}</StTime>
                          </ChatMessage>
                        }
                      </div>
                    )
                  }
                }
              }
            }
          })}
          {/* 실시간 채팅 불러오기 */}
          {messages.map((msg, i) => {
            // 알림 출력시 표시
            if (msg.sender === "알림") {
              return (
                <div key={i}>
                  <StDate>{msg.sendTime.split("-")[0]}</StDate>
                  <p>{msg.message}</p>
                </div>
              )
              // 불 필요 내용 출력x
            } else if (msg.message === null) {
              return;
            }
            else {
              // 본인 채팅 출력
              if (msg.sender === localStorage.getItem("name")) {
                // 작성자가 본인인 경우 중복 작성시 작성자 출력 생략
                if (i > 0 && messages[i]?.sender === messages[index2]?.sender) {
                  // 날짜가 중복인 경우 출력x
                  if (messages[i]?.sendTime.split("-")[0] === messages[index2]?.sendTime.split("-")[0]) {
                    index2 = i;
                    return (
                      <div key={i}>
                        <ChatMessage style={{ display: "flex", justifyContent: "flex-end" }}>
                          <MyChat>{msg.message}</MyChat>
                        </ChatMessage>
                        {messages[i]?.sendTime === messages[i + 1]?.sendTime ?
                          messages[i]?.sender === messages[i + 1]?.sender ?
                            null :
                            <ChatMessage>
                              <StTime style={{ display: "flex", justifyContent: "flex-end" }}>{msg.sendTime.split("-")[1]}</StTime>
                            </ChatMessage>
                          : <ChatMessage>
                            <StTime style={{ display: "flex", justifyContent: "flex-end" }}>{msg.sendTime.split("-")[1]}</StTime>
                          </ChatMessage>
                        }
                      </div>
                    )
                  }
                  // 날짜가 중복이 아닌경우 출력o
                  else {
                    index2 = i;
                    return (
                      <div key={i}>
                        {i === 0 && messages[i]?.sendTime.split("-")[0] !== chatList?.data[index]?.sendTime.split("-")[0] ? <StDate>{msg.sendTime.split("-")[0]}</StDate> : null}
                        {i !== 0 ? <StDate>{msg.sendTime.split("-")[0]}</StDate> : null}
                        <ChatMessage style={{ display: "flex", justifyContent: "flex-end" }}>
                          <MyChat>{msg.message}</MyChat>
                        </ChatMessage>
                        {messages[i]?.sendTime === messages[i + 1]?.sendTime ?
                          messages[i]?.sender === messages[i + 1]?.sender ?
                            null :
                            <ChatMessage>
                              <StTime style={{ display: "flex", justifyContent: "flex-end" }}>{msg.sendTime.split("-")[1]}</StTime>
                            </ChatMessage>
                          : <ChatMessage>
                            <StTime style={{ display: "flex", justifyContent: "flex-end" }}>{msg.sendTime.split("-")[1]}</StTime>
                          </ChatMessage>
                        }
                      </div>
                    )
                  }
                  // 작성자가 본인인 경우 중복이 아닌 경우 출력o
                } else {
                  // 날짜가 중복인 경우 출력x
                  if (messages[i]?.sendTime.split("-")[0] === messages[index2]?.sendTime.split("-")[0]) {
                    index2 = i;
                    return (
                      <div key={i}>
                        <ChatMessage>
                          <MyNick>{msg.sender}</MyNick>
                        </ChatMessage>
                        <ChatMessage style={{ display: "flex", justifyContent: "flex-end" }}>
                          <MyChat>{msg.message}</MyChat>
                        </ChatMessage>
                        {messages[i]?.sendTime === messages[i + 1]?.sendTime ?
                          messages[i]?.sender === messages[i + 1]?.sender ?
                            null :
                            <ChatMessage>
                              <StTime style={{ display: "flex", justifyContent: "flex-end" }}>{msg.sendTime.split("-")[1]}</StTime>
                            </ChatMessage>
                          : <ChatMessage>
                            <StTime style={{ display: "flex", justifyContent: "flex-end" }}>{msg.sendTime.split("-")[1]}</StTime>
                          </ChatMessage>
                        }
                      </div>
                    )
                  }
                  // 날짜가 중복이 아닌 경우 출력o
                  else {
                    index2 = i;
                    return (
                      <div key={i}>
                        {i === 0 && messages[i]?.sendTime.split("-")[0] !== chatList?.data[index]?.sendTime.split("-")[0] ? <StDate>{msg.sendTime.split("-")[0]}</StDate> : null}
                        {i !== 0 ? <StDate>{msg.sendTime.split("-")[0]}</StDate> : null}
                        <ChatMessage>
                          <MyNick>{msg.sender}</MyNick>
                        </ChatMessage>
                        <ChatMessage style={{ display: "flex", justifyContent: "flex-end" }}>
                          <MyChat>{msg.message}</MyChat>
                        </ChatMessage>
                        {messages[i]?.sendTime === messages[i + 1]?.sendTime ?
                          messages[i]?.sender === messages[i + 1]?.sender ? null :
                            <ChatMessage>
                              <StTime style={{ display: "flex", justifyContent: "flex-end" }}>{msg.sendTime.split("-")[1]}</StTime>
                            </ChatMessage>
                          : <ChatMessage>
                            <StTime style={{ display: "flex", justifyContent: "flex-end" }}>{msg.sendTime.split("-")[1]}</StTime>
                          </ChatMessage>
                        }
                      </div>
                    )
                  }
                }
                // 작성자가 본인이 아닌 경우
              } else {
                // 작성자가 본인인 아닌 경우 중복일 경우 출력x
                if (i > 0 && messages[i]?.sender === messages[index2]?.sender) {
                  // 날짜가 중복인 경우 출력x
                  if (messages[i]?.sendTime.split("-")[0] === messages[index2]?.sendTime.split("-")[0]) {
                    index2 = i;
                    return (
                      <div key={i}>
                        <ChatMessage>
                          <Chatting>{msg.message}</Chatting>
                        </ChatMessage>
                        {messages[i]?.sendTime === messages[i + 1]?.sendTime ?
                          messages[i]?.sender === messages[i + 1]?.sender ?
                            null :
                            <ChatMessage>
                              <StTime>{msg.sendTime.split("-")[1]}</StTime>
                            </ChatMessage>
                          : <ChatMessage>
                            <StTime>{msg.sendTime.split("-")[1]}</StTime>
                          </ChatMessage>
                        }
                      </div>
                    )
                  }
                  // 날짜 중복이 아닌경우 출력o
                  else {
                    index2 = i;
                    return (
                      <div key={i}>
                        {i === 0 && messages[i]?.sendTime.split("-")[0] !== chatList?.data[index]?.sendTime.split("-")[0] ? <div>{msg.sendTime.split("-")[0]}</div> : null}
                        {i !== 0 ? <StTime>{msg.sendTime.split("-")[0]}</StTime> : null}
                        <ChatMessage>
                          <Chatting>{msg.message}</Chatting>
                        </ChatMessage>
                        {messages[i]?.sendTime === messages[i + 1]?.sendTime ?
                          messages[i]?.sender === messages[i + 1]?.sender ?
                            null :
                            <ChatMessage>
                              <StTime>{msg.sendTime.split("-")[1]}</StTime>
                            </ChatMessage>
                          : <ChatMessage>
                            <StTime>{msg.sendTime.split("-")[1]}</StTime>
                          </ChatMessage>
                        }
                      </div>
                    )
                  }
                  // 작성자가 본인인 아닌 경우 중복일 경우 출력o
                } else {
                  // 날짜가 중복인 경우 출력x
                  if (messages[i]?.sendTime.split("-")[0] === messages[index2]?.sendTime.split("-")[0]) {
                    index2 = i;
                    return (
                      <div key={i}>
                        <ChatMessage>
                          <NickName>{msg.sender}</NickName>
                        </ChatMessage>
                        <ChatMessage>
                          <Chatting>{msg.message}</Chatting>
                        </ChatMessage>
                        {messages[i]?.sendTime === messages[i + 1]?.sendTime ?
                          messages[i]?.sender === messages[i + 1]?.sender ?
                            null :
                            <ChatMessage>
                              <StTime>{msg.sendTime.split("-")[1]}</StTime>
                            </ChatMessage>
                          : <ChatMessage>
                            <StTime>{msg.sendTime.split("-")[1]}</StTime>
                          </ChatMessage>
                        }
                      </div>
                    )
                  }
                  // 날짜가 중복이 아닌 경우 출력o
                  else {
                    index2 = i;
                    return (
                      <div key={i}>
                        {i === 0 && messages[i]?.sendTime.split("-")[0] !== chatList?.data[index]?.sendTime.split("-")[0] ? <div>{msg.sendTime.split("-")[0]}</div> : null}
                        {i !== 0 ? <StTime>{msg.sendTime.split("-")[0]}</StTime> : null}
                        <ChatMessage>
                          <NickName>{msg.sender}</NickName>
                        </ChatMessage>
                        <ChatMessage>
                          <Chatting>{msg.message}</Chatting>
                        </ChatMessage>
                        {messages[i]?.sendTime === messages[i + 1]?.sendTime ?
                          null :
                          <ChatMessage>
                            <StTime>{msg.sendTime.split("-")[1]}</StTime>
                          </ChatMessage>
                        }
                      </div>
                    )
                  }
                }
              }
            }
          })}
        </div>
        {/* 스크롤 하단 고정 */}
        <InputArea style={{ display: "flex" }}>
          <StInput ref={inputRef}
            onKeyPress={handleKeyPress}
            value={ment} onChange={(e) => { setMent(e.target.value) }} />
          <div><ChatBtn onClick={() => { submit() }}><SendIcon /></ChatBtn></div>
        </InputArea>
        <div ref={scrollRef} />
      </Wrap>
    </>
  )
}
export default Chat;

const Wrap = styled.div`
  background-color: white;
  border-radius: 8px;
  width: 80%;
  max-width: 800px;
  margin: 30px auto 0 auto;
`

const ChatMessage = styled.div`
background-color: white;
`
const MyNick = styled.div`
background-color: white;
margin-right:10px;
text-align:right;
`
const MyChat = styled.div`
/* background-color: #6b68f3; */
background-color:#6a68f3dd;
color: white;
/* text-align: right; */
width : fit-content;
max-width: 58%;
padding: 5px 10px;
border-radius: 13px;
margin: 3px;
font-size: 15px;
`

const NickName = styled.div`
background-color: white;
margin-right:10px;
`

const Chatting = styled.div`
/* background-color: #EDFFEB; */
background-color: #D9DCFB;
width:fit-content;
max-width: 58%;
padding: 5px 10px;
border-radius: 13px;
margin-left:10px;
margin:3px;
font-size: 15px;
`

const StDate = styled.div`
  /* background-color: orange; */
  text-align: center;
  color: #494949;
`
const StTime = styled.div`
  /* background-color: skyblue; */
  font-size: 13px;
  padding: 0 5px;
  color: #707070;
`

const InputArea = styled.div`
  background-color: #FAFAFA;
  padding-top: 10px;
  padding-bottom: 100px;
`

const StInput = styled.input`
  width: 100%;
  border-radius: 8px;
  border: 1px solid #292929; 
  outline: none;
  padding: 6px;
`
const ChatBtn = styled.div`
  padding-top: 3px;
  padding-left: 5px;
  color: #3E09D1;
  cursor: pointer;
`
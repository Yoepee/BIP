import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import FavoriteIcon from '@mui/icons-material/Favorite';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import PersonIcon from "@mui/icons-material/Person";
import styled from "styled-components";

const MyHistory = () => {
  const { type } = useParams();
  const navigate = useNavigate();

  let [list, setList] = useState();

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

  // 활동내역 조회
  const __getActivity = async () => {
    await axios.get(process.env.REACT_APP_SERVER_HOST + `/api/user/event`, {
      headers: {
        Authorization: localStorage.getItem("Authorization"),
        RefreshToken: localStorage.getItem("RefreshToken"),
      },
    }
    ).then((res) => {
      setList(res);
    });
  };

  const __getLike = async () => {
    await axios.get(process.env.REACT_APP_SERVER_HOST + `/api/like/list`, {
      headers: {
        Authorization: localStorage.getItem("Authorization"),
        RefreshToken: localStorage.getItem("RefreshToken"),
      },
    }
    ).then((res) => {
      setList(res);
    });
  };

  const __getWrite = async () => {
    await axios.get(process.env.REACT_APP_SERVER_HOST + `/api/user/myposts`, {
      headers: {
        Authorization: localStorage.getItem("Authorization"),
        RefreshToken: localStorage.getItem("RefreshToken"),
      },
    }
    ).then((res) => {
      setList(res);
    });
  };

  useEffect(() => {
    __isToken().then(() => {
      if (type === "promise") {
        __getActivity();
      } else if (type === "like") {
        __getLike();
      } else {
        __getWrite();
      }
    })
  }, [])

  return (
    <>
    {type === "promise"?
    <div>
    {list?.data?.data?.length === 0?<div style={{display:"flex", margin:"0 auto", width:"80%"}}><p style={{margin:"0 auto"}}>지난 약속이 없습니다</p></div>:list?.data?.data.map((item) => {
        if (type === "promise") {
          return (
            <PromiseCard
              key={item.id}
              onClick={() => {
                navigate(`/detailpromise/${item.id}`);
              }}>
              <div style={{ display: "flex" }}>
                <p style={{ fontSize: "15px", fontWeight: "bold" }}>
                  {item.title}
                </p>
                {/* 포인트 받아야할듯 */}
                <People>
                  <PersonIcon />
                </People>
                <p style={{ fontWeight: "500" }}>{item.memberCount}</p>
              </div>
              <div>
                <p
                  className="place"
                  style={{ marginTop: "0", marginBottom: "0" }}>
                  {item.place}
                </p>
              </div>
              <div>
                <div style={{ display: "flex" }}>
                  <p>{item.eventDateTime.split("-")[0]}년 {item.eventDateTime.split("-")[1]}월 {item.eventDateTime.split("-")[2]}일　</p>
                  {/* 시간값 split으로 잘라서 사용 */}
                  {Number(item.eventDateTime.split("-")[3]) < 12 ? (
                    <>
                      <p>오전</p>
                      <p>{item.eventDateTime.split("-")[3]}시</p>
                    </>
                  ) : Number(item.eventDateTime.split("-")[3]) === 12 ? (
                    <>
                      <p>오후</p>
                      <p>{item.eventDateTime.split("-")[3]}시</p>
                    </>
                  ) : (
                    <>
                      <p>오후</p>
                      <p>
                        {Number(item.eventDateTime.split("-")[3]) - 12}시
                      </p>
                    </>
                  )}
                  <p style={{ marginRight: "10px" }}>
                    {item.eventDateTime.split("-")[4]}분
                  </p>
                </div>
              </div>
            </PromiseCard>
          )
        } 
      })}
    </div>
    :<Cards>
      {list?.data?.data?.length === 0&& type=="like" ?<div style={{display:"flex", margin:"0 auto", width:"80%"}}><p style={{margin:"0 auto"}}>관심 내역이 없습니다</p></div>:null}
      {list?.data?.data?.length === 0&& type=="write"?<div style={{display:"flex", margin:"0 auto", width:"80%"}}><p style={{margin:"0 auto"}}>작성 내역이 없습니다</p></div>:null}
     
      {list?.data?.data.map((item) => {
        if (type === "like") { 

          return (
            <div style={{ boxShadow: "rgb(0 0 0 / 10%) 0 1px 20px 0px", borderRadius: "8px", padding: "10px 20px", marginBottom: "10px" }} key={item.id}
              onClick={() => { navigate(`/detaildonation/${item.id}`) }}>
              <div>
                <div style={{ display: "flex" }}>
                  <div>
                    {item.board === "request" && <Category style={{ marginTop: "10px" }}>재능요청</Category>}
                    {item.board === "donation" && <Category style={{ marginTop: "10px" }}>재능기부</Category>}
                  </div>
                  <div style={{ marginTop: "10px" }}>
                    {item.category === "volunteer" && <Category style={{ marginLeft: "10px" }}>봉사</Category>}
                    {item.category === "care" && <Category style={{ marginLeft: "10px" }}>돌봄</Category>}
                    {item.category === "edu" && <Category style={{ marginLeft: "10px" }}>교육</Category>}
                    {item.category === "share" && <Category style={{ marginLeft: "10px" }}>나눔</Category>}
                    {item.category === "cultureart" && <Category style={{ marginLeft: "10px" }}>문화/예술</Category>}
                    {item.category === "people" && <Category style={{ marginLeft: "10px" }}>모임/구인</Category>}
                    {item.category === "etc" && <Category style={{ marginLeft: "10px" }}>기타</Category>}
                  </div>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <p style={{ fontSize: "18px", fontWeight: "bold" }}>{item.content}</p>
                  <p><PointIcon>P</PointIcon>{item.point}</p>
                </div>
                <div>
                {item.firstImgUrl !== null ?
                  <img style={{width:"100%", height:"100%", objectFit:"cover"}} src={item.firstImgUrl} />
                  : null}
                </div>
                <div style={{ fontSize: "14px", color: "#757575" }}>{item.nickname}</div>
              </div>
              <div style={{ display: "flex", marginTop: "10px", color: "#a1a0a0" }}>
                <div><ChatBubbleIcon style={{ fontSize: "18px", verticalAlign: "sub", color:"#d0d0d0" }} /> {item.numOfComment}</div>
                <div><FavoriteIcon style={{ marginLeft: "5px", fontSize: "18px", verticalAlign: "sub", color:"pink"  }} />{item.likes}</div>
                <div style={{ marginLeft: "auto", fontSize: "14px", color: "#757575" }}>{item.timePast}</div>
              </div>
            </div>
          )
        } else {
        
          return (
            <div style={{ boxShadow: "rgb(0 0 0 / 10%) 0 1px 20px 0px", borderRadius: "8px", padding: "10px 20px", marginBottom: "10px" }} key={item.id}
              onClick={() => { navigate(`/detaildonation/${item.id}`) }}>
              <div>
                <div style={{ display: "flex" }}>
                  <div>
                    {item.board === "request" && <Category style={{ marginTop: "10px" }}>재능요청</Category>}
                    {item.board === "donation" && <Category style={{ marginTop: "10px" }}>재능기부</Category>}
                  </div>
                  <div style={{ marginTop: "10px" }}>
                    {item.category === "volunteer" && <Category style={{ marginLeft: "10px" }}>봉사</Category>}
                    {item.category === "care" && <Category style={{ marginLeft: "10px" }}>돌봄</Category>}
                    {item.category === "edu" && <Category style={{ marginLeft: "10px" }}>교육</Category>}
                    {item.category === "share" && <Category style={{ marginLeft: "10px" }}>나눔</Category>}
                    {item.category === "cultureart" && <Category style={{ marginLeft: "10px" }}>문화/예술</Category>}
                    {item.category === "people" && <Category style={{ marginLeft: "10px" }}>모임/구인</Category>}
                    {item.category === "etc" && <Category style={{ marginLeft: "10px" }}>기타</Category>}
                  </div>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <p style={{ fontSize: "18px", fontWeight: "bold" }}>{item.content}</p>
                  <p><PointIcon>P</PointIcon>{item.point}</p>
                </div>
                <div>
                  {item.firstImgUrl !== null ?
                  <img style={{width:"100%", height:"100%", objectFit:"cover"}} src={item.firstImgUrl} />
                  : null}
                </div>
                <div style={{ fontSize: "14px", color: "#757575" }}>{item.nickname}</div>
              </div>
              <div style={{ display: "flex", marginTop: "10px", color: "#a1a0a0" }}>
                <div><ChatBubbleIcon style={{ fontSize: "18px", verticalAlign: "sub", color:"#d0d0d0" }} /> {item.numOfComment}</div>
                <div><FavoriteIcon style={{ marginLeft: "5px", fontSize: "18px", verticalAlign: "sub", color:"pink" }} />{item.likes}</div>
                <div style={{ marginLeft: "auto", fontSize: "14px", color: "#757575" }}>{item.createdAt}</div>
              </div>
            </div>
          )
        }
      })}
    </Cards>}
    </>    
  )
}

export default MyHistory;

const Cards = styled.div`
  width: 80%;
  min-width: 360px;
  max-width: 1000px;
  margin: 30px auto;
  cursor: pointer;

  @media screen and (min-width: 769px) {
    max-width :769px ;
  }
`;

const Category = styled.div`
  padding: 5px;
  margin-bottom: 10px;
  border: none;
  background-color: #D9DCFB;
  border-radius: 4px;
  text-align: center;
  color:#494949;
  font-weight: bold;
  font-size: 15px;
`
const PointIcon = styled.span`
  background-color: #3e09d1;
  border-radius: 50%;
  padding: 0 6px;// 숙제
  margin-right: 2px;
  color: white;
  font-weight: bold;
  
`


const PromiseCard = styled.div`
  /* min-width: 350px; */
  width: 80%;
  max-width: 1000px;
  background-color: #FAFAFA;
  /* border: 1px solid #F0F0F0; */
  box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.1);
  margin: 10px auto;
  padding: 0 10px;
  border-radius: 4px;
  font-size: 13px;
  position: relative;
  cursor: pointer;
  
  .lastTime {
    position: absolute;
    right: 10px;
  }
  /* @media screen and (min-width: 769px) {
    width: 220px;
    height: 120px;
    font-size: 12px;
    margin: 0 auto;
  } */
`;

const People = styled.p`
  color: #3E09D1;
  border-radius: 50%;
  width: 20px;
  text-align: center;
  margin-left: auto;
  margin-right: 2px;
`;

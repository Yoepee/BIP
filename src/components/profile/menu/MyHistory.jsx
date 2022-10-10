import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import FavoriteIcon from '@mui/icons-material/Favorite';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import styled from "styled-components";

const MyHistory = () => {
  const { type } = useParams();
  const navigate = useNavigate();

  let [list, setList] = useState();

  // 활동내역 조회
  const __getActivity = async () => {
    await axios.get(process.env.REACT_APP_SERVER_HOST + `/api/user/event`, {
      headers: {
        Authorization: localStorage.getItem("Authorization"),
        RefreshToken: localStorage.getItem("RefreshToken"),
      },
    }
    ).then((res)=>{
      console.log(res);
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
    ).then((res)=>{
      console.log(res);
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
    ).then((res)=>{
      console.log(res);
      setList(res);
    });
  };

  useEffect(() => {
    if (type === "promise") {
      __getActivity();
    } else if (type === "like") {
      __getLike();
    } else {
      __getWrite();
    }
  }, [])

  console.log(list);
  return (
    <div>
      {list?.data?.data.map((item)=>{
        if(type==="promise"){
          return (
            <div key={item.id} style={{border:"1px solid black"}}>
              <div>{item.title}</div>
              <div>{item.place}</div>
              <div>{item.eventDateTime}</div>
              <div>{item.memberCount}</div>
              <div>{item.lastTime}</div>
              <div>{item.weatherResponseDto}</div>
            </div>
          )
        }else if(type==="like"){
          return (
            // <div key={item.id} style={{border:"1px solid black"}}>
            //   <div>{item.category}</div>
            // </div>
            <div  style={{boxShadow:"rgb(0 0 0 / 10%) 0 1px 20px 0px", borderRadius:"8px", padding:"10px 20px",marginBottom:"10px"}} key={item.id}
            onClick={() => { navigate(`/detaildonation/${item.id}`) }}>
            <div>
              <div style={{ display: "flex" }}>
                <div>
                  {item.board === "request" && <Category style={{marginTop:"10px"}}>재능요청</Category>}
                  {item.board === "donation" && <Category style={{marginTop:"10px"}}>재능기부</Category>}
                </div>
                <div style={{marginTop:"10px"}}>
                  {item.category === "volunteer" && <Category style={{marginLeft:"10px" }}>봉사</Category>}
                  {item.category === "care" && <Category style={{marginLeft:"10px"}}>돌봄</Category>}
                  {item.category === "edu" && <Category style={{marginLeft:"10px"}}>교육</Category>}
                  {item.category === "share" && <Category style={{marginLeft:"10px"}}>나눔</Category>}
                  {item.category === "cultureart" && <Category style={{marginLeft:"10px"}}>문화/예술</Category>}
                  {item.category === "people" && <Category style={{marginLeft:"10px"}}>모임/구인</Category>}
                  {item.category === "etc" && <Category style={{marginLeft:"10px"}}>기타</Category>}
                </div>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <p style={{fontSize:"18px", fontWeight: "bold"}}>{item.content}</p>
                 <p><PointIcon>P</PointIcon>{item.point}</p>
              </div>
              {item.imgUrl !== null ?
                <div>{item.imgUrl}</div>
                : null}
              <div style={{fontSize:"14px", color:"#757575"}}>{item.nickname}</div>
            </div>
            <div style={{ display: "flex", marginTop:"10px",color:"#a1a0a0" }}>
              <div><ChatBubbleIcon style={{fontSize:"18px",verticalAlign: "sub"}}/> {item.numOfComment}</div>
              <div><FavoriteIcon style={{marginLeft:"5px",fontSize:"18px",verticalAlign: "sub"}}/>{item.likes}</div>
              <div style={{ marginLeft: "auto",fontSize:"14px", color:"#757575"}}>{item.timePast}</div>
            </div>
          </div>
          )
        }else{
          return (
            <div key={item.id} style={{border:"1px solid black"}}>
              <div>{item.board}</div>
              <div>{item.category}</div>
              <div>{item.content}</div>
              <div>{item.createdAt}</div>
              {/* 포인트 */}
              <div>{item.point}</div>
              {/* 댓글수 */}
              <div>{item.numOfComment}</div>
              {/* 좋아요 */}
              <div>{item.likes}</div>
              {/* 조회수 */}
              <div>{item.views}</div>
              <div>{item.timePast}</div>
            </div>
          )
        }
      })}
    </div>
  )
}

export default MyHistory;

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
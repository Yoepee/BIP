import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const MyHistory = () => {
  const { type } = useParams();

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
            <div key={item.post_id} style={{border:"1px solid black"}}>
              <div>{item.category}</div>
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
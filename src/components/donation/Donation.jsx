import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { __getDonation } from "../../redux/modules/donation";
import styled from "styled-components"
import FavoriteIcon from '@mui/icons-material/Favorite';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import axios from "axios";

const Donation = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const donationList = useSelector((state) => state.donation);
  const [type, setType] = useState("all");

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

  useEffect(() => {
    __isToken().then(() => {
      dispatch(__getDonation(type));
    });
  }, [dispatch, type]);

  return (
    <Wrap style={{ width: "80%", margin: "0 auto" }}>
      <div style={{ display: "flex", cursor: "pointer" }}>
        <Category
          onClick={() => { setType("all") }}>전체</Category>
        <Category style={{ marginLeft: "10px" }}
          onClick={() => { setType("donation") }}>기부</Category>
        <Category style={{ marginLeft: "10px" }}
          onClick={() => { setType("request") }}>요청</Category>
      </div>
      <div>
        {donationList?.data?.data?.map((post) => {
          return (
            <Card key={post.id}
              onClick={() => { navigate(`/detaildonation/${post.id}`) }}>
              <div>
                <div style={{ display: "flex" }}>
                  <div>
                    {post.board === "request" && <Category style={{ marginTop: "10px" }}>재능요청</Category>}
                    {post.board === "donation" && <Category style={{ marginTop: "10px" }}>재능기부</Category>}
                  </div>
                  <div style={{ marginTop: "10px" }}>
                    {post.category === "volunteer" && <Category style={{ marginLeft: "10px" }}>봉사</Category>}
                    {post.category === "care" && <Category style={{ marginLeft: "10px" }}>돌봄</Category>}
                    {post.category === "edu" && <Category style={{ marginLeft: "10px" }}>교육</Category>}
                    {post.category === "share" && <Category style={{ marginLeft: "10px" }}>나눔</Category>}
                    {post.category === "cultureart" && <Category style={{ marginLeft: "10px" }}>문화/예술</Category>}
                    {post.category === "people" && <Category style={{ marginLeft: "10px" }}>모임/구인</Category>}
                    {post.category === "etc" && <Category style={{ marginLeft: "10px" }}>기타</Category>}
                  </div>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between"}}>
                  <p style={{ fontSize: "18px", fontWeight: "bold" }}>{post.content}</p>
                  <p><PointIcon>P</PointIcon>{post.point}</p>
                </div>
                <div style={{display:"flex", flexDirection:"column", alignItems:"center",marginBottom:"10px" }}>

                {post.firstImgUrl !== null ?
                  <img src={post.firstImgUrl} style={{ width:"100%" }} />
                  : null}
                </div>
                <div style={{ fontSize: "14px", color: "#757575" }}>{post.nickname}</div>
              </div>
              <div style={{ display: "flex", marginTop: "10px", color: "#a1a0a0" }}>
                <div><ChatBubbleIcon style={{ fontSize: "18px", verticalAlign: "sub" }} /> {post.numOfComment}</div>
                <div><FavoriteIcon style={{ marginLeft: "5px", fontSize: "18px", verticalAlign: "sub" }} />{post.likes}</div>
                <div style={{ marginLeft: "auto", fontSize: "14px", color: "#757575" }}>{post.timePast}</div>
              </div>
            </Card>
          )
        })}
      </div>
    </Wrap>
  )
}
export default Donation;


const Wrap = styled.div`
  
  @media screen and (min-width: 769px) {
    max-width: 769px;
  }
  margin: 0 auto;

`
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
const Card = styled.div`
  box-shadow: rgb(0 0 0 / 10%) 0 1px 20px 0px;
  border-radius: 8px;
  padding: 10px 20px;
  margin-bottom: 20px;
  @media screen and (min-width:769px) {
   max-width :769px ;
  }
  margin: 10px auto;

`
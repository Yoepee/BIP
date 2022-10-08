import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { __getDetailDonation } from "../../redux/modules/detailDonation";
import styled from 'styled-components'
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import { flexbox } from "@mui/system";
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import axios from "axios";
const DetailDonation = () => {
  const dispatch = useDispatch();
  const donation = useSelector((state) => state.detailDonation);
  const { id } = useParams();
  const [like,setLike] = useState();

  // console.log(donation)
  useEffect(() => {
    dispatch(__getDetailDonation(id));
    __getLike();
  }, [dispatch]);

  const __getLike = async() =>{
    await axios.get(process.env.REACT_APP_SERVER_HOST+`/api/like/check/${id}`, {
      headers: {
          Authorization: localStorage.getItem('Authorization'),
          RefreshToken: localStorage.getItem('RefreshToken'),
    }}).then((res)=>{
      if(res.data.success){
        setLike(res.data.data)
      }
    })
  }
  const __doLike = async() =>{
    await axios.post(process.env.REACT_APP_SERVER_HOST+`/api/like/mark/${id}`, null, {
      headers: {
          Authorization: localStorage.getItem('Authorization'),
          RefreshToken: localStorage.getItem('RefreshToken'),
    }}).then((res)=>{
      console.log(res)
      if(res.data.success){
        setLike(!like)
      }
    })
  }
  const __unLike = async() =>{
    await axios.post(process.env.REACT_APP_SERVER_HOST+`/api/like/cancel/${id}`, null, {
      headers: {
          Authorization: localStorage.getItem('Authorization'),
          RefreshToken: localStorage.getItem('RefreshToken'),
    }}).then((res)=>{
      console.log(res)
      if(res.data.success){
        setLike(!like)
      }
    })
  }
  const __notifyPost = async() =>{
    if (window.confirm("게시글을 신고하시겠습니까?")) {
    await axios.post(process.env.REACT_APP_SERVER_HOST+`/api/posts/report/${id}`, null, {
      headers: {
          Authorization: localStorage.getItem('Authorization'),
          RefreshToken: localStorage.getItem('RefreshToken'),
    }}).then((res)=>{
      console.log(res)
      if(res.data.success){
        alert(res.data.data);
      }else{
        alert(res.data.data);
      }
    })
    }else{
      return;
    }
  }
  return (
    <div style={{width:"80%", margin:"0 auto"}}>
      <div style={{ display: "flex", marginBottom:"10px"}}>
        <Category style={{ marginRight:"10px"}}>
          {donation?.data?.data?.board === "request" && <div> 재능요청</div>}
          {donation?.data?.data?.board === "donation" && <div>  재능기부</div>}
        </Category>
        <Category>
          {donation?.data?.data?.category === "volunteer" && <div> 봉사</div>}
          {donation?.data?.data?.category === "care" && <div>  돌봄</div>}
          {donation?.data?.data?.category === "edu" && <div> 교육</div>}
          {donation?.data?.data?.category === "share" && <div> 나눔</div>}
          {donation?.data?.data?.category === "cultureart" && <div> 문화/예술</div>}
          {donation?.data?.data?.category === "people" && <div> 모임/구인</div>}
          {donation?.data?.data?.category === "etc" && <div> 기타</div>}
        </Category>
      </div>

      <div style={{boxShadow:"rgb(0 0 0 / 10%) 0 1px 20px 0px", borderRadius:"8px", padding:"10px 20px"}}>
        {donation?.data?.data?.imgUrlList?.map((x,i)=>{
        return (
          <div key={i}>
            <img src={x}/>
          </div>
        )
      })}
      <div style={{ border: "none",fontWeight:"bold", display:"flex", justifyContent:"space-between" }}>
          <p>{donation?.data?.data?.content}</p>
          <div>

          {donation?.data?.data?.point === 0?
          <p style={{marginRight:"2%"}}><PointIcon>P</PointIcon>{donation?.data?.data?.point}</p>
          :null
          }
        </div>
      </div>
      <div style={{ border: "none"}}>
        {/* 이미지 */}
        <div>
        <div style={{display:"flex", fontSize:"15px"}}> 
            <div>{donation?.data?.data?.address}</div>
           {/* 지도 */}
        </div>
          <div style={{ fontSize:"14px", color:"#757575",margin:"10px 0"}}>{donation?.data?.data?.nickname}</div>
          <div style={{ display:"flex",  justifyContent:"space-between"}}>
            <div style={{ fontSize:"14px", color:"#757575"}}>관심 {donation?.data?.data?.likes} 조회수 {donation?.data?.data?.views} </div>
            <div style={{ fontSize:"14px", color:"#757575"}}>{donation?.data?.data?.createdAt}</div>
          </div>
          <div style={{display:"flex"}}>
            {like?
                <div style={{display:"flex", margin:"15px", color:"#9e9e9e"}}onClick={()=>{__unLike()}}>
                  <div style={{color:"red"}}><FavoriteIcon/></div>
                  공감하기
                  </div>
                :<div style={{display:"flex", margin:"15px", color:"#9e9e9e"}} onClick={()=>{__doLike()}}><FavoriteBorderIcon/>공감하기</div>
            }
                <div style={{display:"flex", margin:"15px", color:"#9e9e9e"}} onClick={()=>{__notifyPost()}}>🚨신고하기</div>
          </div>
        </div>
      </div>
      </div>
    </div>
  )
}
export default DetailDonation;

const Category = styled.div`
  border: none;
  text-align: center;
  background-color: #D9DCFB;
  border-radius: 4px;
  padding: 5px;
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
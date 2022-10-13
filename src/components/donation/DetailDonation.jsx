import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { likeDonate, unlikeDonate, __getDetailDonation } from "../../redux/modules/detailDonation";
import styled from 'styled-components'
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import axios from "axios";
import KaKaoMap from "../map/KakaoMap";
import Swal from "sweetalert2";

const DetailDonation = () => {
  const dispatch = useDispatch();
  const donation = useSelector((state) => state.detailDonation);
  const { id } = useParams();
  const [like, setLike] = useState();

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
      dispatch(__getDetailDonation(id));
      __getLike();
    })
  }, []);

  useEffect(() => {
    if (donation?.data?.data !== undefined) {
      if (like === true) {
        dispatch(likeDonate());
      } else {
        dispatch(unlikeDonate());
      }
    }
  }, [like])

  const __getLike = async () => {
    await axios.get(process.env.REACT_APP_SERVER_HOST + `/api/like/check/${id}`, {
      headers: {
        Authorization: localStorage.getItem('Authorization'),
        RefreshToken: localStorage.getItem('RefreshToken'),
      }
    }).then((res) => {
      if (res.data.success) {
        setLike(res.data.data)
      }
    })
  }
  const __doLike = async () => {
    await axios.post(process.env.REACT_APP_SERVER_HOST + `/api/like/mark/${id}`, null, {
      headers: {
        Authorization: localStorage.getItem('Authorization'),
        RefreshToken: localStorage.getItem('RefreshToken'),
      }
    }).then((res) => {
      if (res.data.success) {
        setLike(!like)
      }
    })
  }
  const __unLike = async () => {
    await axios.post(process.env.REACT_APP_SERVER_HOST + `/api/like/cancel/${id}`, null, {
      headers: {
        Authorization: localStorage.getItem('Authorization'),
        RefreshToken: localStorage.getItem('RefreshToken'),
      }
    }).then((res) => {
      if (res.data.success) {
        setLike(!like)
      }
    })
  }
  const __notifyPost = async () => {
    Swal.fire({
      title: `게시글을 신고하시겠습니까?`,
      showCancelButton: true,
      confirmButtonColor: '#3E09D1',
      cancelButtonColor: 'tomato',
      confirmButtonText: '신고',
      cancelButtonText: '취소',
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axios.post(process.env.REACT_APP_SERVER_HOST + `/api/posts/report/${id}`, null, {
          headers: {
            Authorization: localStorage.getItem('Authorization'),
            RefreshToken: localStorage.getItem('RefreshToken'),
          }
        }).then((res) => {
          console.log(res)
          if (res.data.success) {
            Swal.fire(res.data.data, "　", "success");
          } else {
            Swal.fire(res.data.data, "　", "error");
          }
        })
      }
    })
  }
  return (
    <Wrap style={{ width: "80%", margin: "0 auto" }}>
      <div style={{ display: "flex", marginBottom: "10px" }}>
        <Category style={{ marginRight: "10px" }}>
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

      <Card>
        {donation?.data?.data?.imgUrlList?.map((x, i) => {
          return (
            <Wrapper>
              <Container key={i}>
                <img src={x} style={{ objectFit: "cover" }} />
              </Container>
            </Wrapper>

          )
        })}
        <div style={{ border: "none", fontWeight: "bold", display: "flex", justifyContent: "space-between" }}>
          <p>{donation?.data?.data?.content}</p>
          <div>

            {donation?.data?.data?.point === 0 ?
              <p style={{ marginRight: "2%" }}><PointIcon>P</PointIcon>{donation?.data?.data?.point}</p>
              : null
            }
          </div>
        </div>
        <div style={{ border: "none" }}>
          {/* 이미지 */}
          <div>
            <div style={{ fontSize: "15px" }}>
              <div>{donation?.data?.data?.address}</div>
              {/* 지도 */}
              {donation?.data?.data?.coordinate === null ?
                <Map><KaKaoMap lat={37.5656} lng={126.9769} width={"340px"} height={"340px"} /></Map>
                : <Map><KaKaoMap lat={donation?.data?.data?.coordinate.split(",")[0]} lng={donation?.data?.data?.coordinate.split(",")[1]} width={"340px"} height={"340px"} /></Map>}
            </div>
            <div style={{ fontSize: "14px", color: "#757575", margin: "10px 0" }}>{donation?.data?.data?.nickname}</div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div style={{ fontSize: "14px", color: "#757575" }}>관심 {donation?.data?.data?.likes} 조회수 {donation?.data?.data?.views} </div>
              <div style={{ fontSize: "14px", color: "#757575" }}>{donation?.data?.data?.createdAt}</div>
            </div>
            <div style={{ display: "flex" }}>
              {like ?
                <div style={{ display: "flex", margin: "15px", color: "#9e9e9e" }} onClick={() => { __isToken().then(() => { __unLike() }) }}>
                  <div style={{ color: "red" }}><FavoriteIcon /></div>
                  공감하기
                </div>
                : <div style={{ display: "flex", margin: "15px", color: "#9e9e9e" }} onClick={() => { __isToken().then(() => { __doLike() }) }}><FavoriteBorderIcon />공감하기</div>
              }
              <div style={{ display: "flex", margin: "15px", color: "#9e9e9e" }} onClick={() => { __isToken().then(() => { __notifyPost() }) }}>🚨신고하기</div>
            </div>
          </div>
        </div>
      </Card>
    </Wrap>
  )
}
export default DetailDonation;

const Wrap = styled.div`
  
  @media screen and (min-width: 769px) {
    max-width: 1400px;
  }
  margin: 0 auto;

`

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
const Map = styled.div`
  /* position: absolute; */
  margin-top: 20px;
  margin-bottom: 100px;
  
  /* background-color: #F5EAFB; */
  @media screen and (min-width: 769px) {
   margin: 110px auto;
   margin-bottom: 0;
  }
`

const Wrapper = styled.div`
  display: inline-flex;
  padding: 8px;
`
const Container = styled.div`
  display: flex;
  align-items: center;
  box-sizing: border-box;
  @media screen and (min-width: 625px){
    width: 200px;
  }
  @media screen and (min-width: 700px){
    width: 236px;
  }
  @media screen and (min-width: 775px){
    width: 270px;
  }
  @media screen and (min-width: 850px){
    width: 300px;
  }
  @media screen and (min-width: 925px){
    width: 330px;
  }
  @media screen and (min-width: 1007px){
    width: 390px;
  }
  @media screen and (min-width: 1400px){
    width: 435px;
  }
  img {
    display: flex;
    width: 100%;
    @media screen and (min-width: 625px){
    
      height: 170px;
    }
    @media screen and (min-width: 700px){
    
      height: 206px;
    }
    @media screen and (min-width: 775px){
    
      height: 242px;
    }
    @media screen and (min-width: 850px){
    
      height: 278px;
    }
    @media screen and (min-width: 925px){
    
      height: 314px;
    }
    border-radius: 5px;
    object-fit: cover;
  }
`
const Card = styled.div`
  box-shadow: rgb(0 0 0 / 10%) 0 1px 20px 0px;
  border-radius: 8px;
  padding: 10px 20px;
  margin-bottom: 20px;
  @media screen and (min-width:1400px) {
   max-width :1400px ;
  }
  margin: 10px auto;

`
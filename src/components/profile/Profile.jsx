import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import base from "../../img/baseProfile.jpg";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import FavoriteIcon from '@mui/icons-material/Favorite';
import ReceiptIcon from '@mui/icons-material/Receipt';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { __getProfile } from "../../redux/modules/profile";
import axios from "axios";

// 프로필 페이지
const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.profile);

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

  // 활동내역 받는 함수 동작
  useEffect(() => {
    __isToken().then(() => {
      dispatch(__getProfile());
    })
  }, [dispatch]);

  return (
    <div>
      <div>
        {/* 프로필 수정연결된 상세페이지 이동 */}
        <Prodiv
          onClick={() => {
            navigate("/detailprofile");
          }}>
          {/* 이미지 파일 없으면 기본 이미지 출력 */}
          {!profile?.data?.data?.profileImgUrl ? (
            <ImgArea>
              <Img src={base} />
            </ImgArea>
          ) : (
            <ImgArea>
              <Img src={profile?.data?.data?.profileImgUrl} />
            </ImgArea>
          )}
          <div>
            <p>{profile?.data?.data?.nickname}</p>
            <p>{profile?.data?.data?.phoneNumber}</p>
            {profile?.data?.data?.email ? (
              <p>{profile?.data?.data?.email}</p>
            ) : (
              <p>
                이메일 정보를 입력해야 <br />
                휴대폰 분실 시 접속할 수 있습니다.
              </p>
            )}
          </div>
          <div
            style={{
              marginLeft: "auto",
              alignItems: "center",
              display: "flex",
            }}>
            <p>
              <ArrowForwardIosRoundedIcon style={{ color: "#3E09D1" }} />
            </p>
          </div>
        </Prodiv>
        <Prodiv>
          <BtnSet>
            <Btn onClick={() => { navigate("/profile/history/like") }}>
              <label>
                <IconBtn><FavoriteIcon /></IconBtn>
                <p>관심목록</p>
              </label>
            </Btn>
            <Btn onClick={() => { navigate("/profile/history/promise") }}>
              <label>
                <IconBtn><ReceiptIcon /></IconBtn>
                <p>약속내역</p>
              </label>
            </Btn>
            <Btn onClick={() => { navigate("/profile/history/write") }}>
              <label>
                <IconBtn><VolunteerActivismIcon /></IconBtn>
                <p>작성목록</p>
              </label>
            </Btn>
          </BtnSet>
        </Prodiv>
        <Prodiv style={{ flexDirection: "column" }}>
          <p>포인트 : {profile?.data?.data?.point}</p>
          <p>신용 점수 : {profile?.data?.data?.creditScore}</p>
          <p>약속이행 : {profile?.data?.data?.numOfDone}</p>
        </Prodiv>
      </div>
    </div>
  );
};

export default Profile;




const Prodiv = styled.div`
  display: flex;
  margin: 0 auto;
  width: 80%;
  border-bottom: 1px solid #D9DCFB;
`;

const ImgArea = styled.div`
    width:80px; 
    height:80px; 
    border-radius:100%; 
    overflow:hidden;
    margin: 20px 10px 20px 0;

`

const Img = styled.img`

  /*
  max-width: 307px;
  min-width: 80px;
  max-height: 307px; // 놃이 큰 화면일때 307px 작은 화면일때 80px
  min-height: 80px;
  width: 20%; */
  object-fit: cover;
  width: 100%;
  height: 100%;
 
`;

const BtnSet = styled.div`
display: grid;
align-items: center;
width:100%;
grid-template-columns: repeat(3, 1fr);
place-content:center;
margin-top: 10px;
`
const Btn = styled.div`
display:flex;
justify-content:center;
align-items:center;
`

const IconBtn = styled.div`
display:flex;
justify-content:center;
align-items:center;
border-radius:50%;
background-color: #6B68F3;
width: 70px;
height: 70px;
color:white;
cursor:pointer;
`
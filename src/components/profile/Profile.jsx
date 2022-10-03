import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import base from "../../img/baseProfile.jpg";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { __getProfile } from "../../redux/modules/profile";
import axios from "axios";

// 프로필 페이지
const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.profile);
  let a;

  // 활동내역 조회
  const __activity = async () => {
    a = await axios.get(
      process.env.REACT_APP_SERVER_HOST + `/api/user/event/`,
      {
        headers: {
          Authorization: localStorage.getItem("Authorization"),
          RefreshToken: localStorage.getItem("RefreshToken"),
        },
      }
    );
    console.log(a);
  };

  // 활동내역 받는 함수 동작
  useEffect(() => {
    dispatch(__getProfile());
    __activity();
  }, [dispatch]);
  console.log(profile);

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
              <ArrowForwardIosRoundedIcon style={{ color: "#6D09D1" }} />
            </p>
          </div>
        </Prodiv>
        <Prodiv style={{ flexDirection: "column" }}>
          <p>포인트 : {profile?.data?.data?.point}</p>
          <p>신용 점수 : {profile?.data?.data?.creditScore}</p>
          <p>약속이행 : {profile?.data?.data?.numOfDone}</p>
        </Prodiv>
        <Prodiv>
          <p>활동 내역</p>
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
  border-bottom: 1px solid #f5eafb;
`;

const ImgArea = styled.div `
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

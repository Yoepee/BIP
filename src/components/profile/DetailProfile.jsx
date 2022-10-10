import styled from "styled-components";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { __getProfile } from "../../redux/modules/profile";
import axios from "axios";

const DetailProfile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // 프로필 정보 받아오기
  const profile = useSelector((state)=>state.profile);

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

  // 프로필 정보 받아서 출력하기 필요
    useEffect(()=>{
      __isToken().then(()=>{
        dispatch(__getProfile());
      });
    },[dispatch])
  return (
    <div style={{margin:"40px"}}>
      <TypeDiv>
        <div style={{ display: "flex" }}>
          <img/>사진
          <div onClick={()=>{navigate("/editprofile/picture")}}
          style={{ marginLeft: "auto", alignItems: "center", display: "flex"}}>
            <p><EditOutlinedIcon style={{color:"#A67EED"}}/></p>
          </div>
        </div>
      </TypeDiv>
      <TypeDiv>
        <div style={{ display: "flex"}}>
          <p>닉네임</p>
          <div onClick={()=>{navigate("/editprofile/name")}}
          style={{ marginLeft: "auto", alignItems: "center", display: "flex" }}>
            <p><EditOutlinedIcon style={{color:"#A67EED"}} /></p>
          </div>
        </div>
      </TypeDiv>
      <TypeDiv>
        <div style={{ display: "flex" }}>
        <p>전화번호</p>
          <div onClick={()=>{navigate("/editprofile/call")}}
          style={{ marginLeft: "auto", alignItems: "center", display: "flex" }}>
            <p><EditOutlinedIcon style={{color:"#A67EED"}}/></p>
          </div>
        </div>
      </TypeDiv>
      <TypeDiv>
        <div style={{ display: "flex" }}>
        <p>이메일</p>
          <div onClick={()=>{navigate("/editprofile/mail")}}
          style={{ marginLeft: "auto", alignItems: "center", display: "flex" }}>
            <p><EditOutlinedIcon style={{color:"#A67EED"}} /></p>
          </div>
        </div>
      </TypeDiv>
    </div>
  )
}

export default DetailProfile;

const TypeDiv = styled.div`
border-bottom: 1px solid #F5EAFB;
width: 90%;
margin: 0 auto;
`
import styled from "styled-components";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { __getProfile } from "../../redux/modules/profile";

const DetailProfile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const profile = useSelector((state)=>state.profile);

    useEffect(()=>{
        dispatch(__getProfile());
    },[dispatch])
  return (
    <div>
      <TypeDiv>
        <div style={{ display: "flex" }}>
          <img/>사진
          <div onClick={()=>{navigate("/editprofile/picture")}}
          style={{ marginLeft: "auto", alignItems: "center", display: "flex"}}>
            <p><EditOutlinedIcon /></p>
          </div>
        </div>
      </TypeDiv>
      <TypeDiv>
        <div style={{ display: "flex"}}>
          <p>닉네임</p>
          <div onClick={()=>{navigate("/editprofile/name")}}
          style={{ marginLeft: "auto", alignItems: "center", display: "flex" }}>
            <p><EditOutlinedIcon /></p>
          </div>
        </div>
      </TypeDiv>
      <TypeDiv>
        <div style={{ display: "flex" }}>
        <p>전화번호</p>
          <div onClick={()=>{navigate("/editprofile/call")}}
          style={{ marginLeft: "auto", alignItems: "center", display: "flex" }}>
            <p><EditOutlinedIcon /></p>
          </div>
        </div>
      </TypeDiv>
      <TypeDiv>
        <div style={{ display: "flex" }}>
        <p>이메일</p>
          <div onClick={()=>{navigate("/editprofile/mail")}}
          style={{ marginLeft: "auto", alignItems: "center", display: "flex" }}>
            <p><EditOutlinedIcon /></p>
          </div>
        </div>
      </TypeDiv>
    </div>
  )
}

export default DetailProfile;

const TypeDiv = styled.div`
border-bottom: 1px solid black;
`
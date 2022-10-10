import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { readSocial } from "../../redux/modules/social";

// 네이버 로그인
const Naver = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // 네이버 로그인시 받아와야하는 값 2개 존재 (code, state)
  let code = new URL(window.location.href).searchParams.get("code");
  let state = new URL(window.location.href).searchParams.get("state");


  const __naverLogin = async() => {
    // 경로에서 받아온 값을 서버로 전달
    await axios.get(process.env.REACT_APP_SERVER_HOST + `/api/member/naverlogin?code=${code}&state=${state}`)
    .then((response)=>{
      if(response.data.success){
        localStorage.setItem("Authorization", response.headers.authorization);
        localStorage.setItem("RefreshToken", response.headers.refreshtoken);
        dispatch(readSocial(response.data.data));
        // 닉네임 없으면 수정하는 페이지로 전달
        if(response.data.data.nickname===null){
          navigate("/signup/nickname");
        }else{
          // 닉네임이 있다면, 닉네임을 로컬스토리지 저장
          localStorage.setItem("name", response.data.data.nickname);
          navigate("/")
        }
      }
    }).catch((error)=>{
      // alert(error.code)
    })
  }
// 랜더링 시 네이버 로그인 함수 동작
  useEffect(()=>{
    __naverLogin();
  },[])

  return (null)
}

export default Naver;
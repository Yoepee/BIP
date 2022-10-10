import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { readSocial } from "../../redux/modules/social";

// 카카오 로그인
const Kakao = () => {
  const navigate= useNavigate();
  const dispatch = useDispatch();
  // 네이버 로그인시 받아와야하는 값 존재 (code)
  let code = new URL(window.location.href).searchParams.get("code");

  const __kakaoLogin = async() => {
    // 경로에서 받아온 값을 서버로 전달
    await axios.get(process.env.REACT_APP_SERVER_HOST + `/api/member/kakaologin?code=${code}`)
    .then((response)=>{
      if(response.data.success){
        localStorage.setItem("Authorization", response.headers.authorization);
        localStorage.setItem("RefreshToken", response.headers.refreshtoken);
        dispatch(readSocial(response.data.data));
        // 닉네임이나 휴대폰 번호가 없으면 번호수정 후 닉네임 수정하도록 이동
        if( response.data.data.phoneNumber===null){
          navigate("/signup/change/kakao");
        }else if(response.data.data.nickname===null){
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
// 랜더링 시 카카오 로그인 함수 동작
  useEffect(()=>{
    __kakaoLogin();
  },[])

  return (null)
}

export default Kakao;
import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Kakao = () => {
  const navigate= useNavigate();
  let code = new URL(window.location.href).searchParams.get("code");

  const __kakaoLogin = async() => {
    let a = await axios.get(process.env.REACT_APP_SERVER_HOST + `/api/member/kakaologin?code=${code}`)
    .then((response)=>{
      console.log(response)
      if(response.data.success){
        localStorage.setItem("Authorization", response.headers.authorization);
        localStorage.setItem("RefreshToken", response.headers.refreshtoken);
        navigate("/signup/change");
      }
    }).catch((error)=>{
      // alert(error.code)
    })
  }

  useEffect(()=>{
    __kakaoLogin();
  },[])

  return (null
  )
}

export default Kakao;
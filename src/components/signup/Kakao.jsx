import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { readSocial, __kakaologin } from "../../redux/modules/social";

const Kakao = () => {
  const navigate= useNavigate();
  const dispatch = useDispatch();
  let code = new URL(window.location.href).searchParams.get("code");

  const __kakaoLogin = async() => {
    let a = await axios.get(process.env.REACT_APP_SERVER_HOST + `/api/member/kakaologin?code=${code}`)
    .then((response)=>{
      console.log(response)
      if(response.data.success){
        localStorage.setItem("Authorization", response.headers.authorization);
        localStorage.setItem("RefreshToken", response.headers.refreshtoken);
        dispatch(readSocial(response.data.data));
        if(response.data.data.nickname===null){
          navigate("/signup/change");
        }else{
          navigate("/")
        }

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
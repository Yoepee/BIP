import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { readSocial } from "../../redux/modules/social";

const Naver = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let code = new URL(window.location.href).searchParams.get("code");
  let state = new URL(window.location.href).searchParams.get("state");

  const __naverLogin = async() => {
    let a = await axios.get(process.env.REACT_APP_SERVER_HOST + `/api/member/naverlogin?code=${code}&state=${state}`)
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
    __naverLogin();
  },[])

  return (null
  )
}

export default Naver;
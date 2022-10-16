import Kakao from "../../components/signup/Kakao";

//카카오 로그인 url로 이동
const KakaoPage = ({__isSSE}) => {
  return (
    <>
    <Kakao __isSSE={__isSSE}/>
    </>
  )
}

export default KakaoPage;
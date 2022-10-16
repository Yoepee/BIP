import Naver from "../../components/signup/Naver";

//네이버 로그인 url로 이동
const NaverPage = ({__isSSE}) => {
  return (
    <>
    <Naver __isSSE={__isSSE}/>
    </>
  )
}

export default NaverPage;
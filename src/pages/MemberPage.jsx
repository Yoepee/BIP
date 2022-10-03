import { useState } from "react";
import Footer from "../components/footer/Footer";
import Header from "../components/header/Header";
import Member from "../components/member/Member";

const MemberPage = () =>{
  const [type, setType] = useState("none");
  return (
    <>
    {type==="search"?
    // 검색 기능시 헤더 변경 (헤더옵션 7)
    <Header option={7} setType={setType}/>
    // 평소 상태 헤더 옵션 4
    :<Header head={"친구 목록"} option={4} setType={setType} type={type} />}
    {/* 친구목록 */}
    <Member type={type} setType={setType}/>
    {/* 푸터메뉴 2번째 항목 선택 (0,1,2,3) */}
    <Footer foot={1}/>
    <div style={{height:"50px"}}></div>
    </>
  )
}

export default MemberPage;
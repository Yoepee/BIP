import { useState } from "react";
import Footer from "../components/footer/Footer";
import Header from "../components/header/Header";
import Member from "../components/member/Member";

const MemberPage = () =>{
  const [type, setType] = useState("none");
  return (
    <>
    {type==="search"?
    <Header option={7} setType={setType}/>
    :<Header head={"친구 목록"} option={4} setType={setType} type={type}/>}
    <Member type={type} setType={setType}/>
    <Footer foot={1}/>
    <div style={{height:"50px"}}></div>
    </>
  )
}

export default MemberPage;
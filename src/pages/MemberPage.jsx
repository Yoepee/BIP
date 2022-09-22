import Footer from "../components/footer/Footer";
import Header from "../components/header/Header";
import Member from "../components/member/Member";

const MemberPage = () =>{
  return (
    <>
    <Header head={"친구 목록"} option={4}/>
    <Member/>
    <Footer foot={1}/>
    <div style={{height:"50px"}}></div>
    </>
  )
}

export default MemberPage;
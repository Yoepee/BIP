import Comment from "../../components/comment/Comment";
import DetailDonation from "../../components/donation/DetailDonation";
import CommentFooter from "../../components/footer/CommentFooter";
import Header from "../../components/header/Header";
import WebHeader from "../../components/header/WebHeader";
import styled from "styled-components";

// 재능기부 상세 페이지
const DetailDonationPage = () =>{
  return (
    <>
    <div style={{display:"flex"}}>
      <WebHeader />
      <Header option={9}/>
    </div>
    <DetailDonation/>
    <Comment/>
    </>
  )
}

export default DetailDonationPage;


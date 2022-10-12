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
    <WebHeader />
    <StHeader><Header head={"기부 상세"} option={9}/></StHeader>
    <DetailDonation/>
    <Comment/>
    </>
  )
}

export default DetailDonationPage;

const StHeader = styled.div`
  @media screen and (min-width: 769px) {
    
    visibility: hidden;
  }
`
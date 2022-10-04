import Comment from "../../components/comment/Comment";
import DetailDonation from "../../components/donation/DetailDonation";
import Header from "../../components/header/Header";

// 재능기부 상세 페이지
const DetailDonationPage = () =>{
  return (
    <>
    <Header head={"기부 상세"} option={0}/>
      나는 기부 상세 페이지
    <DetailDonation/>
    <Comment/>
    </>
  )
}

export default DetailDonationPage;
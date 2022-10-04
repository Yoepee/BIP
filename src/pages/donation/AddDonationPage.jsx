import AddDonation from "../../components/donation/AddDonation";
import Header from "../../components/header/Header";

// 재능기부 수정 삭제 페이지
const AddDonationPage = () =>{
  return (
    <>
      <Header head={"기부 추가"} option={0}/>
      나는 기부 추가 페이지
      <AddDonation/>
    </>
  )
}

export default AddDonationPage;
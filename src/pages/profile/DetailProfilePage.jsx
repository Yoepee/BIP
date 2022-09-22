import Header from "../../components/header/Header";
import DetailProfile from "../../components/profile/DetailProfile";

const DetailProfilePage = () => {
  return (
    <>
      <Header head={"프로필 보기"} option={0}/>

      <DetailProfile />
    </>
  )
}

export default DetailProfilePage;
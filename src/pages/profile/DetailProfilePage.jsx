import Header from "../../components/header/Header";
import WebHeader from "../../components/header/WebHeader";
import DetailProfile from "../../components/profile/DetailProfile";

// 디테일 상세페이지 (현재 출력되는 부분이 거의 없어서 수정 필요)
const DetailProfilePage = () => {
  return (
    <>
    <WebHeader />
    {/* 헤더 옵션 0 (뒤로가기) */}
      <Header head={"프로필 보기"} option={0}/>
      {/* 상세 보기 선택칸 */}
      <DetailProfile />
    </>
  )
}

export default DetailProfilePage;
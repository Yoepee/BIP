import PromiseFooter from "../../components/footer/PromiseFooter";
import Header from "../../components/header/Header";
import DetailPromise from "../../components/main/list/DetailPromise";

// 약속 상세보기
const DetailPromisePage = () =>{
  return (
    <>
    {/* 헤더 -> 옵션 3 */}
      <Header option={3} />
      {/* 상세 데이터 출력 */}
      <DetailPromise/>
      {/* 약속 상세 푸터 (초대, 채팅) */}
      <PromiseFooter/>
    </>
  )
}

export default DetailPromisePage;
import Header from "../../components/header/Header";
import WebHeader from "../../components/header/WebHeader";
import AddCredit from "../../components/profile/menu/AddCredit";

const AddCreditPage = () => {
  return (
    <>
      <WebHeader />
      {/* 헤더 옵션 0 */}
      <Header head={"신용점수 구매"} option={0}/>
      {/* 신용점수 구매창 연결 (지정 값으로 작동) */}
      <AddCredit/>
    </>
  )
}
export default AddCreditPage;
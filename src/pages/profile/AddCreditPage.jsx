import Header from "../../components/header/Header";
import AddCredit from "../../components/profile/menu/AddCredit";

const AddCreditPage = () => {
  return (
    <div>
      {/* 헤더 옵션 0 */}
      <Header head={"신용점수 구매"} option={0}/>
      {/* 신용점수 구매창 연결 (지정 값으로 작동) */}
      <AddCredit/>
    </div>
  )
}
export default AddCreditPage;
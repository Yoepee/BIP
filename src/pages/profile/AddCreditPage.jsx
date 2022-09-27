import Header from "../../components/header/Header";
import AddCredit from "../../components/profile/menu/AddCredit";

const AddCreditPage = () => {
  return (
    <div>
      <Header head={"신용점수 구매"} option={0}/>
      <AddCredit/>
    </div>
  )
}
export default AddCreditPage;
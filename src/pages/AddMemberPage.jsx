import Header from "../components/header/Header"
import AddMember from "../components/member/AddMember";

const AddMemberPage = ()=>{
  return (
    <>
    <Header head={"친구추가"} option={5}/>
    <AddMember/>
    </>
  )
}

export default AddMemberPage;
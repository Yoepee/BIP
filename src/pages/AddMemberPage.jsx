import { useParams } from "react-router-dom";
import Header from "../components/header/Header"
import AddMemberPhone from "../components/member/AddMember";
import AddMemberName from "../components/member/AddMemberName";

const AddMemberPage = ()=>{
  const {type} = useParams();
  return (
    <>
    {type==="phone"?
    <>
    <Header head={"연락처로 친구 추가"} option={5}/>
    <AddMemberPhone/>
    </>
    :<>
    <Header head={"닉네임으로 친구 추가"} option={5}/>
    <AddMemberName/>
    </>}
    </>
  )
}

export default AddMemberPage;
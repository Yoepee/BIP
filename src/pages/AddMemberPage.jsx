import { useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/header/Header"
import AddMember from "../components/member/AddMember";

const AddMemberPage = ()=>{
  const {type} = useParams();
  const initialState = {
    value:""
   }
 
   const [member, setMember] = useState(initialState)
   
   const onChangeHandle = (e) => {
    const {name, value} = e.target;
    setMember({...member, [name]: value})
  }
  return (
    <>
    {type==="phone"?
    <>
    <Header head={"연락처로 친구 추가"} option={5} payload={member}/>
    <AddMember member={member} onChangeHandle={onChangeHandle}/>
    </>
    :<>
    <Header head={"닉네임으로 친구 추가"} option={5} payload={member}/>
    <AddMember member={member} onChangeHandle={onChangeHandle}/>
    </>}
    </>
  )
}

export default AddMemberPage;
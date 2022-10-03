import { useState } from "react";
import Header from "../components/header/Header"
import AddMember from "../components/member/AddMember";

// 친구추가 페이지 (현재 모달형식으로 전환)
// 상위 컴포넌트 = 헤더 : 옵션 4
// 친구목록 헤더 -> 옵션 4 -> addmemberpage
const AddMemberPage = ({type, setChk})=>{
  const initialState = {
    value:""
   }
  //  멤버 초기값 지정 (api명세서 참조)
   const [member, setMember] = useState(initialState)
   
   const onChangeHandle = (e) => {
    const {name, value} = e.target;
    setMember({...member, [name]: value})
  }
  return (
    <>
    {/* type에 phone 일 시 휴대폰으로 친구추가 */}
    {type==="phone"?
    <>
    <Header head={"연락처로 친구 추가"} option={5} payload={member} onChangeHandle={onChangeHandle}/>
    <AddMember member={member} onChangeHandle={onChangeHandle} type={type} setChk={setChk}/>
    </>
    // type이 name 일 시 닉네임으로 친구추가
    :<>
    <Header head={"닉네임으로 친구 추가"} option={5} payload={member} onChangeHandle={onChangeHandle}/>
    <AddMember member={member} onChangeHandle={onChangeHandle} type={type} setChk={setChk}/>
    </>}
    </>
  )
}

export default AddMemberPage;
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { __addMemberName} from "../../redux/modules/member";

const AddMemberName = () => {
  
  const initialState = {
   value:""
  }


  const [member, setMember] = useState(initialState)
  const dispatch = useDispatch()
  
  const onChangeHandle = (e) => {
   const {name, value} = e.target;
   setMember({...member, [name]: value})
 }

 const onSumbit = (e) => {
  e.preventDefault()
  dispatch(__addMemberName(member));
 }
  
  return (
    <form onSubmit={onSumbit}>
      <p>닉네임</p>
        <input type="text" onChange={onChangeHandle} name="value" value={member.value}/>
        <button>검색</button>
    </form>
  )
}

export default AddMemberName;
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { __addMember} from "../../redux/modules/member";

const AddMember = () => {
  
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
  dispatch(__addMember(member));
 }
  
  return (
    <form onSubmit={onSumbit}>
        <input type="text" onChange={onChangeHandle} name="value" value={member.value}/>
        <button>검색</button>
    </form>
  )
}

export default AddMember;
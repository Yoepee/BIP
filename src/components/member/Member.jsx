import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { __getMember } from "../../redux/modules/member";

const Member = () =>{
  const dispatch = useDispatch();
  const member = useSelector((state)=>state.member);

  useEffect(()=>{
    dispatch(__getMember());
  },[dispatch])

  console.log(member)
  return (
    <div>
      <div style={{ margin:"10px"}}>
        {member?.data?.data?.map((friend, i)=>{
          return (
            <div style={{display:"flex", border:"1px solid black", margin:"10px"}} key={i}>
            <p>/사진/</p>
            <p>{friend.nickname}</p>
            <p>/수정할 이름/</p>
            <p style={{marginLeft:"auto", marginRight:"2%"}}>{friend.creditScore}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Member;
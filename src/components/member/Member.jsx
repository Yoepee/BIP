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
      
        <div style={{display:"flex", border:"1px solid black", margin:"10px"}}>
          <p>사진</p>
          <p>이름</p>
        </div>
        <div style={{display:"flex", border:"1px solid black", margin:"10px"}}>
          <p>사진</p>
          <p>이름</p>
        </div>
        <div style={{display:"flex", border:"1px solid black", margin:"10px"}}>
          <p>사진</p>
          <p>이름</p>
        </div>
        <div style={{display:"flex", border:"1px solid black", margin:"10px"}}>
          <p>사진</p>
          <p>이름</p>
        </div>
        <div style={{display:"flex", border:"1px solid black", margin:"10px"}}>
          <p>사진</p>
          <p>이름</p>
        </div>
      </div>
    </div>
  )
}

export default Member;
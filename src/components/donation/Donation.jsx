import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { __getDonation } from "../../redux/modules/donation";

const Donation = () => {
  const dispatch = useDispatch();
  const donationList = useSelector((state) => state.donation);
  const [type,setType] = useState("all");

  useEffect(()=>{
    dispatch(__getDonation(type));
  },[dispatch,type]);

  return (
    <div>
      <div onClick={()=>{setType("all")}}>전체</div>
      <div onClick={()=>{setType("donation")}}>기부</div>
      <div onClick={()=>{setType("request")}}>요청</div>
    </div>
  )
}
export default Donation;
import { useState } from "react";
import { useParams } from "react-router-dom";
import AddDonation from "../../components/donation/AddDonation";
import Header from "../../components/header/Header";

// 재능기부 수정 삭제 페이지
const AddDonationPage = () =>{
  const {id} = useParams();
  const initialState = {
    board : "request",
    category:"volunteer",
    title:"",
    content : "",
    imgUrl:[],
    address:"",
    coordinate:"",
    point:0
  }
  const [donate,setDonate] = useState(initialState);

  const onChangeHandler = (e) => {
    const {name, value} = e.target;
    setDonate({...donate, [name]: value})
  }

  return (
    <>
      <Header head={"기부 추가"} option={8} payload={donate}/>
      나는 기부 추가 페이지
      <AddDonation donate={donate} setDonate={setDonate} onChangeHandler={onChangeHandler} />
    </>
  )
}

export default AddDonationPage;
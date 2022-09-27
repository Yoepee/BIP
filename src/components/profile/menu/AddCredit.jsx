import styled from "styled-components";
import axios from "axios";

const AddCredit = () =>{
  const __getMyCredit = async(num) =>{
    if(window.confirm(`신용점수를 ${num}점 구매하시겠습니까?`)){
    let a = await axios.put(process.env.REACT_APP_SERVER_HOST+`/api/user/point`,{point:1000*num, nickname:localStorage.getItem("name")},{
      headers: {
          Authorization:localStorage.getItem('Authorization'),
          RefreshToken:localStorage.getItem('RefreshToken')
      }}).then((response)=>{
        console.log(response)
      })
      return;
    }else{
      return;
    }
  }

  return (
    <div>
    <div>
      나의 신용점수 구매
      <div style={{ display: "flex", border: "1px solid black", margin: "10px", alignItems:"center" }}>
        <p>신용점수 1점 구매</p>
        <AddBox onClick={()=>{
          __getMyCredit(1);
        }}>선택</AddBox>
    </div>
    <div style={{ display: "flex", border: "1px solid black", margin: "10px", alignItems:"center" }}>
        <p>신용점수 5점 구매</p>
        <AddBox onClick={()=>{
          __getMyCredit(5);
        }}>선택</AddBox>
    </div>
    </div>
    <div>
      친구의 신용점수 구매
      <div style={{ display: "flex", border: "1px solid black", margin: "10px", alignItems:"center" }}>
      <p>신용점수 1점 구매</p>
        <AddBox onClick={()=>{
        }}>선택</AddBox>
    </div>
    <div style={{ display: "flex", border: "1px solid black", margin: "10px", alignItems:"center" }}>
      <p>신용점수 5점 구매</p>
        <AddBox onClick={()=>{
        }}>선택</AddBox>
    </div>
    </div>
    </div>
  )
}

export default AddCredit;

const AddBox = styled.p`
margin-left:auto;
margin-right:2%;
background-color:#6D09D1;
color:white;
border-radius:6px;
padding:5px;
cursor:pointer;
`
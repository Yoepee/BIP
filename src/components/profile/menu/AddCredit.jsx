import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

// 신용도 추가하기 페이지
const AddCredit = () => {
  const navigate = useNavigate();

  const __isToken = async () => {
    await axios.get(process.env.REACT_APP_SERVER_HOST + `/api/member/reissue`, {
      headers: {
        Authorization: localStorage.getItem('Authorization'),
        RefreshToken: localStorage.getItem('RefreshToken'),
      }
    }
    ).then((res) => {
      if (res.data.success) {
        localStorage.setItem("Authorization", res.headers.authorization);
        localStorage.setItem("RefreshToken", res.headers.refreshtoken);
      }
    })
  }
  // 나의 신용점수 구매 함수
  const __getMyCredit = async (num) => {
    Swal.fire({
      title: `신용점수를 ${num}점 구매하시겠습니까?`,
      showCancelButton: true,
      confirmButtonColor: '#3E09D1',
      cancelButtonColor: 'tomato',
      confirmButtonText: '구매',
      cancelButtonText: '취소',
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axios.put(process.env.REACT_APP_SERVER_HOST + `/api/user/point`, { point: 2000 * num, nickname: localStorage.getItem("name") }, {
          headers: {
            Authorization: localStorage.getItem('Authorization'),
            RefreshToken: localStorage.getItem('RefreshToken')
          }
        }).then((response) => {
          console.log(response)
        })
        return;
      } else {
        return;
      }
    })
  }

  return (
    <div>
      <div>
        나의 신용점수 구매
        <div style={{ display: "flex", border: "1px solid black", margin: "10px", alignItems: "center" }}>
          <p>신용점수 1점 구매</p>
          <p><PointIcon>P</PointIcon>2000</p>
          <AddBox onClick={() => {
            __isToken().then(()=>{
            __getMyCredit(1);
          })
          }}>선택</AddBox>
        </div>
        <div style={{ display: "flex", border: "1px solid black", margin: "10px", alignItems: "center" }}>
          <p>신용점수 5점 구매</p>
          <p><PointIcon>P</PointIcon>10000</p>
          <AddBox onClick={() => {
            __isToken().then(()=>{
              __getMyCredit(5);
            })
          }}>선택</AddBox>
        </div>
      </div>
      {/* 선택시 친구목록으로 연결 */}
      <div>
        친구의 신용점수 구매
        <div style={{ display: "flex", border: "1px solid black", margin: "10px", alignItems: "center" }}>
          <p>신용점수 1점 구매</p>
          <p><PointIcon>P</PointIcon>2000</p>
          <AddBox onClick={() => {
            navigate("/member/add1");
          }}>선택</AddBox>
        </div>
        <div style={{ display: "flex", border: "1px solid black", margin: "10px", alignItems: "center" }}>
          <p>신용점수 5점 구매</p>
          <p><PointIcon>P</PointIcon>10000</p>
          <AddBox onClick={() => {
            navigate("/member/add5");
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

const PointIcon = styled.span`
  background-color: #3e09d1;
  border-radius: 50%;
  padding: 0 6px;// 숙제
  margin-right: 2px;
  color: white;
  font-weight: bold;
  
`
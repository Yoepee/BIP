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
    <>
    <Wrap>
      <Container>
        <span style={{padding:"10px", fontWeight:"bold"}}>나의 신용점수</span>
        <StBox>
          <p style={{padding:"0 2%"}}>신용점수 1점</p>
          <p><PointIcon>P</PointIcon>2000</p>
          <AddBox onClick={() => {
            __isToken().then(()=>{
            __getMyCredit(1);
          })
          }}>구매</AddBox>
        </StBox>
        <StBox>
          <p style={{padding:"0 2%"}}>신용점수 5점</p>
          <p><PointIcon>P</PointIcon>10000</p>
          <AddBox onClick={() => {
            __isToken().then(()=>{
              __getMyCredit(5);
            })
          }}>구매</AddBox>
        </StBox>
      </Container>
      {/* 선택시 친구목록으로 연결 */}
      <Container>
        <span style={{padding:"10px", fontWeight:"bold"}}>친구의 신용점수</span>
        <StBox>
          <p style={{padding:"0 2%"}}>신용점수 1점</p>
          <p><PointIcon>P</PointIcon>2000</p>
          <AddBox onClick={() => {
            navigate("/member/add1");
          }}>구매</AddBox>
        </StBox>
        <StBox>
          <p style={{padding:"0 2%"}}>신용점수 5점</p>
          <p><PointIcon>P</PointIcon>10000</p>
          <AddBox onClick={() => {
            navigate("/member/add5");
          }}>구매</AddBox>
        </StBox>
      </Container>
    </Wrap>
    </>
  )
}

export default AddCredit;

const Wrap = styled.div`
  /* background-color: pink; */
  width: 80%;
  margin: 30px auto;
`

const Container = styled.div`
  /* background-color: skyblue; */
  margin-bottom: 40px;
`


const StBox = styled.div`
  background-color: #FAFAFA;
  display: flex;
  border: 0.8px solid #e0e0e0;
  border-radius: 10px;
  margin: 18px 10px;
  align-items: center;  
`

const AddBox = styled.p`
margin-left:auto;
margin-right:2%;
background-color:#D9DCFB;
border-radius: 10px;
padding: 4px 8px;
font-size: 14px;
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
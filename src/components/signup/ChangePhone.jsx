import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Button } from "@material-ui/core";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";

// 휴대폰번호 미입력 계정 번호 입력 페이지 (카카오 최초 로그인 or 이메일 로그인)
const ChangePhone = () => {
  const navigate = useNavigate();
  const social = useSelector((state) => state.social);
  // type : mail - 이메일 로그인, kakao - 카카오 최초 로그인
  const { type } = useParams();

  // 휴대폰 번호 초기값
  const initialState = {
    value: '',
  }
  const [member, setMember] = useState(initialState);
  // 인증번호 발급 변수
  const [visble, setVisble] = useState(false);
  const [chkBtn, setChkBtn] = useState("인증번호 받기")
  // 경고문구
  const [ment] = useState("");
  // 인증번호 변수
  const [test, setTest] = useState("")
  // 휴대폰 유효성 검사
  const regexPhone = /^01([0|1|6|7|8|9])-?([0-9]{4})-?([0-9]{4})$/;
  // 인증번호 유효성 검사
  const regtest = /^[0-9]{6}$/;

  // 타이머 동작 변수
  const time = useRef(180);
  const [min, setMin] = useState(parseInt(3));
  const [sec, setSec] = useState(0);
  const timer = useRef(null);

  // 랜더링 시 타이머 초기화
  useEffect(() => {
    return () => clearInterval(timer.current);
  }, [])

  // 시간이 0보다 작아지면 타이머 종료
  useEffect(() => {
    if (time.current < 0) {
      clearInterval(timer.current);
    }
  }, [sec])

  // 시간이 흐를때마다 시간출력부가 동작됨
  const countDown = () => {
    setMin(parseInt(time.current / 60));
    setSec(time.current % 60);
    time.current -= 1;
  }

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setMember({ ...member, [name]: value })
  }

  // 인증번호 발송을 콘솔로 대신하는 역할
  const __testPhone = async (payload) => {
    await axios.post(process.env.REACT_APP_SERVER_HOST + "/api/member/auth/test", payload)
      .then((response) => {
        console.log(response)
        if (response.data.success) {
          Swal.fire("인증번호 전송완료", "　", "success");
        } else {
          Swal.fire(response.data.data, "　", "error");
          setVisble(false);
        }
      });
  }
  // 실제 휴대폰으로 인증번호가 전송되는 함수
  const __examPhone = async (payload) => {
    await axios.post(process.env.REACT_APP_SERVER_HOST + "/api/member/auth/sms", payload)
      .then((response) => {
        if(response.data.success){
          Swal.fire(response.data.data,"　","success");
        }else{
          Swal.fire(response.data.data,"　","error");
          setVisble(false);
        }
      });
  }

  // 휴대폰 번호 수정 함수
  const __editPhone = async (payload) => {
    // 이메일 로그인
    if (type === "mail") {
      await axios.put(process.env.REACT_APP_SERVER_HOST + "/api/user/phonenumber", { authCode: test, phoneNumber: payload.value }, {
        headers: {
          Authorization: localStorage.getItem('Authorization'),
          RefreshToken: localStorage.getItem('RefreshToken'),
        }
      }).then((response) => {
        if (response.data.success) {
          // 닉네임 없으면 닉네임 설정 페이지 이동
          if (social?.data?.nickname === null) {
            navigate("/signup/nickname")
          } else {
            // 이상 없으면 메인페이지
            navigate("/")
          }
        } else {
          Swal.fire(response.data.data,"　","error");
        }
        // 카카오 최초 로그인
      })
    } else {
      await axios.put(process.env.REACT_APP_SERVER_HOST + "/api/user/phonenumber/kakao", { authCode: test, phoneNumber: payload.value }, {
        headers: {
          Authorization: localStorage.getItem('Authorization'),
          RefreshToken: localStorage.getItem('RefreshToken'),
        }
      }).then((response) => {
        if (response.data.success) {
          // 카카오 최초 로그인시 토큰 재발급으로 새로 저장필요
          localStorage.setItem("Authorization", response.headers.authorization);
          localStorage.setItem("RefreshToken", response.headers.refreshtoken);
          // 닉네임 없으면 닉네임 설정 페이지 이동
          if (social?.data?.nickname === null) {
            navigate("/signup/nickname")
            // 이상 없으면 메인페이지
          } else {
            navigate("/")
          }
        } else {
          Swal.fire(response.data.data,"　","error");
        }
      })
    }
  }

  return (
    <Wrapper>
      <HeaderArea>
        <HeaderTitle>휴대폰 설정</HeaderTitle>
        <Button className="next_btn" onClick={() => { __editPhone(member) }}>완료</Button>
      </HeaderArea>


      <form action="">

        <input variant="outlined" label="휴대폰 번호" placeholder="휴대폰 번호를 입력하세요" name="value"
          value={member.value}
          onChange={onChangeHandler} />
        {/* 휴대폰 값 이상 시 경고문구 출력 */}
        {member.value === "" ? null :
          regexPhone.test(member.value) ? ment === "사용 가능한 번호 입니다" ?
            (<div style={{ color: "#00766c", fontSize: "14px" }}>{ment}</div>)
            : (<div style={{ color: "red", fonSize: "14px" }}>{ment}</div>)
            : (<><div style={{ color: "red", fonSize: "14px" }}>올바른 휴대폰 번호가 아닙니다</div></>)}
        {/* 인증번호 받기 시 입력창 출력 */}
        {visble && <input variant="outlined" label="인증번호" placeholder="인증번호를 입력해주세요" value={test} onChange={(e) => { setTest(e.target.value) }} minLength={6} maxLength={6} />}
        {/* 인증번호 이상 시 경고문구 출력 */}
        {test === "" ? null :
          regtest.test(test) ? null : (<><div style={{ color: "red", fonSize: "14px" }}>6자리 인증번호를 입력해주세요</div></>)}
      </form>



      <BtnArea>
         {/* 인증번호 발급키를 누르면 인증번호 재발급 버튼 생성, 타이머 동작도 출력 */}
         {visble && <Button variant="contained" className="default_btn" onClick={() => { __testPhone(member); }}>인증번호 다시 받기({min}:{sec < 10 ? <>0{sec}</> : <>{sec}</>})</Button>}
          {/* 번호가 이상이 없을 시 버튼 색깔 변경 */}
          {!visble &&
            regexPhone.test(member.value) ?
            <Button
              variant="contained"
              style={{ backgroundColor: "#3E09D1" }}
              onClick={() => {
                if (regexPhone.test(member.value)) {
                  if (!visble) {
                    setChkBtn("인증번호 확인하기");
                    __testPhone(member);
                    timer.current = setInterval(() => {
                      countDown();
                    }, 1000);
                    setVisble(!visble);
                  } else {
                    if (regtest.test(test)) {
                      // __chkPhone(member);
                    } else {
                      Swal.fire("인증번호를 확인해주세요","　","error")
                    }
                  }
                } else {
                  Swal.fire("휴대폰 번호를 확인해주세요","　","error")
                }
              }}>
              {chkBtn}
            </Button>
            : visble ? null : <Button
              variant="contained"
              onClick={() => {
                if (regexPhone.test(member.value)) {
                  if (!visble) {
                    setChkBtn("인증번호 확인하기");
                    __testPhone(member);
                    timer.current = setInterval(() => {
                      countDown();
                    }, 1000);
                    setVisble(!visble);
                  } else {
                    if (regtest.test(test)) {
                      // __chkPhone(member);
                    } else {
                      Swal.fire("인증번호를 확인해주세요","　","error")
                    }
                  }
                } else {
                  Swal.fire("휴대폰 번호를 확인해주세요","　","error")
                }
              }}>
              {chkBtn}
            </Button>}
        </BtnArea>
    </Wrapper>
  )
}

export default ChangePhone;

const Wrapper = styled.div`
  display: flex;
  width: 80%;
  min-width: 360px;
  flex-direction: column;
  margin: 20px auto;

	div{
		margin-bottom: 10px;	
	}

  form{
    display: flex;
    flex-direction: column;
    margin: 20px auto;
    width: 100%;
    
    input{
      width: 70%;
      margin: 10px auto;
      max-width: 366px;
      border:2px solid #D9DCFB;
      padding: 16px;
      border-radius: 6px;
      &:focus{
        border-color:#3E09D1;
        outline: none;
      }
    }
    div{
      width: 70%;
      margin: 5px auto;
      max-width: 366px;
    }
  }
`;


const HeaderArea = styled.div`
  display: flex;
  width: 100%;
  max-width: 400px;
  height: 50px;
  margin: 0 auto;
  justify-content: space-between;
  border-bottom: 1px solid #D9DCFB;
  Button {
    font-weight: 600;
    font-size: 20px;
    margin-bottom: 20px;
  } 
`;

const HeaderTitle = styled.span`
  margin-right: auto;
  font-weight: 600;
  font-size: 20px;
`;


const BtnArea = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  margin: 5px auto;
  text-align: center;
  .default_btn{
    background-color: #D9DCFB;
    color:  white;
  }
  Button {
    background-color: #D9DCFB;
    width: 100%;
    margin: 5px auto;
    max-width: 400px;
		height: 50px;
		font-weight: 700;
    &:hover{
      background-color: #3E09D1;
      color: white;
    }
  }
`;
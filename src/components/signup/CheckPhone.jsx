import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Button } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import Header from "../../components/header/Header";
import axios from "axios";
import Swal from "sweetalert2";

// 시작하기(휴대폰 번호)
const CheckPhone = () => {
  // 인증번호 받기 버튼을 클릭 여부 조사하는 변수들
  const [visble, setVisble] = useState(false);
  const [chkBtn, setChkBtn] = useState("인증번호 받기")
  const navigate = useNavigate();

  // 휴대폰 번호를 인식하는 초기값
  const initialState = {
    value: ''
  }
  const [member, setMember] = useState(initialState);
  // 인증코드를 인식하는 초기값
  const [test, setTest] = useState("")
  /** 휴대폰 번호 인증 유효검사*/
  const regexPhone = /^01([0|1|6|7|8|9])-?([0-9]{4})-?([0-9]{4})$/;
  // 인증코드 유효성 검사
  const regtest = /^[0-9]{6}$/;

  // 코드 받기를 누르면 인증코드 타이머 동작
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

  const reset = () => {
    clearInterval(timer.current);
    time.current = 180;
    setMin(parseInt(time.current / 60));
    setSec(time.current % 60);
    timer.current = setInterval(() => {
      countDown();
    }, 1000);
  }

  // 휴대폰번호 입력칸 동작
  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setMember({ ...member, [name]: value })
  }

  // 휴대폰번호 중복여부를 확인하여 결과값 출력
  const __chkPhone = async (payload) => {
    if (regexPhone.test(member.value)) {
      await axios.post(process.env.REACT_APP_SERVER_HOST + "/api/member/chkphonenumber", payload)
        .then((response) => {
          if (response.data.data) {
            // 중복값이 없으면 회원가입
            __signup({ authCode: test, phoneNumber: payload.value })
          } else {
            // 중복계정이 있을경우 로그인으로 동작
            __login({ authCode: test, phoneNumber: payload.value })
          }
        });
    }
  }

  // 인증번호 발송을 콘솔로 대신하는 역할
  const __testPhone = async (payload) => {
    await axios.post(process.env.REACT_APP_SERVER_HOST + "/api/member/auth/test", payload)
      .then((response) => {
        // 콘솔에 인증번호 출력
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
        if (response.data.success) {
          Swal.fire(response.data.data, "　", "success");
        } else {
          Swal.fire(response.data.data, "　", "error");
          setVisble(false);
        }
      });
  }
  // 회원가입 함수
  const __signup = async (payload) => {
    await axios.post(process.env.REACT_APP_SERVER_HOST + "/api/member/signup", payload)
      .then((response) => {
        if (response.data.success === true) {
          localStorage.setItem("Authorization", response.headers.authorization);
          localStorage.setItem("RefreshToken", response.headers.refreshtoken);
          // 닉네임이 없기때문에 닉네임 설정 페이지로 이동
          navigate("/signup/nickname")
        } else {
          Swal.fire(response.data.data, "　", "error");
        }
      });
  }
  // 로그인 함수
  const __login = async (payload) => {
    await axios.post(process.env.REACT_APP_SERVER_HOST + "/api/member/login", payload)
      .then((response) => {
        if (response.data.success === true) {
          // 닉네임까지 저장 후 메인페이지로 이동
          localStorage.setItem("Authorization", response.headers.authorization);
          localStorage.setItem("RefreshToken", response.headers.refreshtoken);
          localStorage.setItem("name", response.data.data.nickname);
          navigate("/")
        } else {
          Swal.fire(response.data.data, "　", "error");
        }
      });
  }

    // 엔터로 인증번호 받기 & 인증번호 확인
    const handleKeyPress = e => {
      if (e.key === 'Enter') {
        if (regexPhone.test(member.value)) {
          if (!visble) {
            setVisble(!visble);
            setChkBtn("인증번호 확인하기");
            __testPhone(member);
            timer.current = setInterval(() => {
              countDown();
            }, 1000);
          } else {
            if (regtest.test(test)) {
              __chkPhone(member);
            } else {
              Swal.fire("인증번호를 확인해주세요.", "　", "error")
            }
          }
        } else {
          Swal.frie("휴대폰 번호를 확인해주세요.", "　", "error")
        }
      }
    }

  return (
    <div>
      <Wrapper>
        {/* 헤더 옵션 0 (뒤로가기) */}
        <Header option={0} />
        <InfoArea>
          <p>
            휴대폰 인증으로 가입해요<br />
            번호는 안전하게 보안되어 어디에도 공개되지 않아요
          </p>
        </InfoArea>
        {/* 휴대폰번호 입력칸 */}
        <form action="">
          <input
            id="outlined-basic"
            label="휴대폰 번호"
            variant="outlined"
            name="value"
            value={member.value}
            onChange={onChangeHandler}
            minLength={10}
            maxLength={11}
            onKeyPress={handleKeyPress}
            placeholder="휴대폰 번호를 입력해주세요" />
          {/* 입력값이 없거나 휴대폰번호가 바르게 적히면 x */}
          {/* 휴대폰 번호가 이상하면 경고문구 출력 */}
          {member.value === "" ? null :
            regexPhone.test(member.value) ? null : (<><div style={{ color: "red", fonSize: "14px"}}>올바른 휴대폰 번호이 아닙니다</div></>)}
          {/* 인증번호 발급 버튼 클릭시 동작, 입력창 생성 */}
          {visble && <input variant="outlined" label="인증번호" placeholder="인증번호를 입력해주세요" value={test} onKeyPress={handleKeyPress} onChange={(e) => { setTest(e.target.value) }} minLength={6} maxLength={6} />}
          {/* 인증코드가 이상하면 경고문구 출력 */}
          {test === "" ? null :
            regtest.test(test) ? null : (<><div style={{ color: "red", fonSize: "14px"}}>6자리 인증번호를 입력해주세요</div></>)}
        </form>



        <BtnArea>
          {/* 인증번호 발급키를 누르면 인증번호 재발급 버튼 생성, 타이머 동작도 출력 */}
          {visble && <Button variant="contained" className="default_btn" onClick={() => { reset();__testPhone(member); }}>인증번호 다시 받기({min}:{sec < 10 ? <>0{sec}</> : <>{sec}</>})</Button>}
          {/* 번호가 이상이 없을 시 버튼 색깔 변경 */}
          {!regexPhone.test(member.value) ?
            <Button
              variant="contained"
              onClick={() => {
                if (regexPhone.test(member.value)) {
                  if (!visble) {
                    setVisble(!visble);
                    setChkBtn("인증번호 확인하기");
                    __testPhone(member);
                    timer.current = setInterval(() => {
                      countDown();
                    }, 1000);
                  } else {
                    if (regtest.test(test)) {
                      __chkPhone(member);
                    } else {
                      Swal.fire("인증번호를 확인해주세요.", "　", "error")
                    }
                  }
                } else {
                  Swal.frie("휴대폰 번호를 확인해주세요.", "　", "error")
                }
              }}>
              {chkBtn}
            </Button>
            : <Button
              style={{ backgroundColor: "#3E09D1" }}
              variant="contained"
              onClick={() => {
                if (regexPhone.test(member.value)) {
                  if (!visble) {
                    setVisble(!visble);
                    setChkBtn("인증번호 확인하기");
                    __testPhone(member);
                    timer.current = setInterval(() => {
                      countDown();
                    }, 1000);
                  } else {
                    if (regtest.test(test)) {
                      __chkPhone(member);
                    } else {
                      Swal.fire("인증번호를 확인해주세요.", "　", "error")
                    }
                  }
                } else {
                  Swal.frie("휴대폰 번호를 확인해주세요.", "　", "error")
                }
              }}>
              {chkBtn}
            </Button>
          }
        </BtnArea>
        {/* 휴대폰 번호 분실시 이메일로 로그인 할 수 있도록 이동 */}
        <EmailDiv>
          <p>휴대폰 번호가 변경되었나요?</p>
          <EmailP onClick={() => { navigate("/signup/email") }}>이메일로 계정찾기</EmailP>
        </EmailDiv>
      </Wrapper>
    </div>
  );
};

export default CheckPhone;


const InfoArea = styled.div`
  display: flex;
  padding: 10px;
	align-items: center;
	justify-content: center;
  p {
    font-weight: 600;
    font-size: 17px;
  }
`


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
    margin: 0 auto;
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
`

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
    /* margin-bottom: 10px; */
		height: 50px;
		font-weight: 700;
		/* align-items: center; */
    &:hover{
      background-color: #3E09D1;
      color: white;
    }
  }
`

const EmailDiv = styled.div`
display:flex;
justify-content:center;
`

const EmailP = styled.p`
text-decoration : underline;
margin-left: 10px;
font-weight: bold;
&:hover{
  color: #3E09D1;
  cursor:pointer;
}
`

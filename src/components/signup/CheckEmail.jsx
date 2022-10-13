import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { Button } from "@material-ui/core";
import Header from "../../components/header/Header";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { readSocial } from "../../redux/modules/social";
import Swal from "sweetalert2";

// 이메일로 로그인 요청시 이동
const CheckEmail = () => {
  // 인증번호 받기 버튼을 클릭 여부 조사하는 변수들
  const [visble, setVisble] = useState(false);
  const [chkBtn, setChkBtn] = useState("인증메일 받기")
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // 이메일을 인식하는 초기값
  const initialState = {
    value: ''
  }
  const [member, setMember] = useState(initialState);
  // 인증코드 입력 변수
  const [test, setTest] = useState("");
  /** 이메일 주소 유효검사*/
  const regexEmail = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
  // 인증코드 유효성 검사
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

  const reset = () => {
    clearInterval(timer.current);
    time.current = 180;
    setMin(parseInt(time.current / 60));
    setSec(time.current % 60);
    timer.current = setInterval(() => {
      countDown();
    }, 1000);
  }

  // 이메일 입력칸 동작
  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setMember({ ...member, [name]: value })
  }

  // 이메일 인증코드 발급 함수
  const __examEmail = async (payload) => {
    await axios.post(process.env.REACT_APP_SERVER_HOST + "/api/member/auth/email", payload)
      .then((response) => {
        console.log(response)
        if (!response.data.success) {
          Swal.fire(response.data.data, "　", "error");
          setVisble(false)
        } else {
          Swal.fire(response.data.data, "　", "success");
        }
      });
  }

  // 이메일 로그인
  const __emailLogin = async (payload) => {
    await axios.post(process.env.REACT_APP_SERVER_HOST + "/api/member/login/email", { authCode: test, email: payload.value })
      .then((response) => {
        if (response.data.success === true) {
          localStorage.setItem("Authorization", response.headers.authorization);
          localStorage.setItem("RefreshToken", response.headers.refreshtoken);
          // localStorage.setItem("name", response.data.data);
          dispatch(readSocial(response.data.data))
          // 메일에서 휴대폰 변경으로 이동
          navigate("/signup/change/mail")
        } else {
          alert(response.data.data)
        }
      });
  }

  // 엔터로 인증번호 받기 & 인증번호 확인
  const handleKeyPress = e => {
    if (e.key === 'Enter') {
      // 이메일 이상여부 검사
      if (regexEmail.test(member.value)) {
        if (!visble) {
          setChkBtn("인증번호 확인하기");
          setVisble(!visble);
          __examEmail(member);
          timer.current = setInterval(() => {
            countDown();
          }, 1000);
        } else {
          if (regtest.test(test)) {
            __emailLogin(member);
          } else {
            Swal.fire("인증번호를 확인해주세요.", "　", "error");
          }
        }
        // 이메일 이상여부 검사
      } else {
        Swal.fire("인증번호를 확인해주세요.", "　", "error");
      }
    }
  }

  return (
    <div>
      <Wrapper>
        <Header option={0} />
        <InfoArea>
          <p>
            이메일로 계정 찾기
          </p>
        </InfoArea>
        <form action="">
          <input
            id="outlined-basic"
            name="value"
            value={member.value}
            onChange={onChangeHandler}
            label="이메일"
            variant="outlined"
            onKeyPress={handleKeyPress}
            placeholder="이메일을 입력해주세요" />
          {/* 이메일 입력 오류시 경고문구 */}
          {member.value === "" ? null : regexEmail.test(member.value) ? null : (<div style={{ color: "red", fonSizen: "14px" }}>올바른 이메일 형식이 아닙니다</div>)}
          {/* 인증번호 받기 클릭 후 입력창 출력 */}
          {visble && <input variant="outlined" label="인증번호" placeholder="인증번호를 입력해주세요" value={test} onKeyPress={handleKeyPress} onChange={(e) => { setTest(e.target.value) }} minLength={6} maxLength={6} />}
          {/* 인증번호 오류 시 경고 문구 */}
          {test === "" ? null :
            regtest.test(test) ? null : (<><div style={{ color: "red", fonSizen: "14px", margin: "0 10%" }}>6자리 인증번호를 입력해주세요</div></>)}

        </form>




        <BtnArea>
          {/* 인증번호 발급키를 누르면 인증번호 재발급 버튼 생성, 타이머 동작도 출력 */}
          {visble && <Button variant="contained" className="default_btn" onClick={() => { reset();__examEmail(member); }}>인증번호 다시 받기({min}:{sec < 10 ? <>0{sec}</> : <>{sec}</>})</Button>}
          {/* 이메일 이상이 없을 시 버튼 색깔 변경 */}
          {!regexEmail.test(member.value) ?
            <Button
              variant="contained"
              onClick={() => {
                // 이메일 이상여부 검사
                if (regexEmail.test(member.value)) {
                  if (!visble) {
                    setChkBtn("인증번호 확인하기");
                    setVisble(!visble);
                    __examEmail(member);
                    timer.current = setInterval(() => {
                      countDown();
                    }, 1000);
                  } else {
                    if (regtest.test(test)) {
                      __emailLogin(member);
                    } else {
                      Swal.fire("인증번호를 확인해주세요.", "　", "error");
                    }
                  }
                  // 이메일 이상여부 검사
                } else {
                  Swal.fire("인증번호를 확인해주세요.", "　", "error");
                }
              }}>
              {chkBtn}
            </Button>
            : <Button
              variant="contained"
              style={{ backgroundColor: "#6D09D1" }}
              onClick={() => {
                // 이메일 이상여부 검사
                if (regexEmail.test(member.value)) {
                  if (!visble) {
                    setChkBtn("인증번호 확인하기");
                    setVisble(!visble);
                    __examEmail(member);
                    timer.current = setInterval(() => {
                      countDown();
                    }, 1000);
                  } else {
                    if (regtest.test(test)) {
                      __emailLogin(member);
                    } else {
                      Swal.fire("인증번호를 확인해주세요.", "　", "error");
                    }
                  }
                  // 이메일 이상여부 검사
                } else {
                  Swal.fire("인증번호를 확인해주세요.", "　", "error");
                }
              }}>
              {chkBtn}
            </Button>
          }
        </BtnArea>
      </Wrapper>
    </div>
  );
};

export default CheckEmail;


const InfoArea = styled.div`
  display: flex;
  padding: 10px;
	align-items: center;
	justify-content: center;
  p {
    font-weight: 600;
    font-size: 20px;
  }
`;
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
  width: 100%;
  margin: 0 auto;
  input{
      width: 70%;
      margin: 5px auto;
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



const BtnArea = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  margin: 20px auto;
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
`

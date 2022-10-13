import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Button } from "@material-ui/core";
import styled from "styled-components";
import Swal from "sweetalert2";

// 프로필 수정 사진 외 (닉네임, 휴대폰번호, 이메일) 수정
// set = 입력값 담는 변수
// onChangeHandler 입력값 수정하는 함수 (input용)
// setChk 중복여부 확인하여 결과값 저장 함수
const ProEdit = ({ set, onChangeHandler, setChk }) => {
  // 휴대폰 번호 정규식
  const regexPhone = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/;
  // 닉네임 정규식
  const regexNickname = /^[\w\Wㄱ-ㅎㅏ-ㅣ가-힣]{2,8}$/;
  // 이메일 정규식
  const regexEmail = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
  // 인증코드 정규식
  const regtest = /^[0-9]{6}$/;

  // 수정하는 값 선택 ( 닉네임, 휴대폰번호, 이메일)
  const { type } = useParams();
  // 경고문구 출력
  const [ment, setMent] = useState("");
  // 입력코드 입력창 출력여부 및 버튼 조정
  const [visible, setVisible] = useState(false);
  const [chkBtn, setChkBtn] = useState("인증하기 받기")

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

  // 타입선별하여 작성된 내용 중복체크 진행
  useEffect(() => {
    // 닉네임
    if (type === "name") {
      if (regexNickname.test(set.value)) {
        __chkNickname({ value: set.value })
      } else {
        setMent("")
      }
      // 전화번호
    } else if (type === "call") {
      if (regexPhone.test(set.phonenumber)) {
        __chkPhone({ value: set.phonenumber })
      } else {
        setMent("")
      }
      // 이메일
    } else {
      if (regexEmail.test(set.email)) {
        __chkEmail({ value: set.email })
      } else {
        setMent("")
      }
    }
  }, [set]);

  // 인증코드 발급시 카운트 다운 변수
  const time = useRef(180);
  const [min, setMin] = useState(parseInt(3));
  const [sec, setSec] = useState(0);
  const timer = useRef(null);

  // 랜더링시 카운트다운 초기화
  useEffect(() => {
    return () => clearInterval(timer.current);
  }, [])

  // 시간이 0 이하일 때 카운트다운 종료
  useEffect(() => {
    if (time.current < 0) {
      clearInterval(timer.current);
    }
  }, [sec])

  // 시간 타이머 함수
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

  // 휴대폰 번호 중복검사 함수
  const __chkPhone = async (payload) => {
    if (regexPhone.test(set.phonenumber)) {
      await axios.post(process.env.REACT_APP_SERVER_HOST + "/api/member/chkphonenumber", payload)
        .then((response) => {
          if (response.data.data) {
            setMent("사용 가능한 번호 입니다.")
            setChk(true)
          } else {
            setMent("중복되는 번호가 존재합니다.")
          }
        });
    }
  }
  // 닉네임 중복검사 함수
  const __chkNickname = async (payload) => {
    if (regexNickname.test(set.value)) {
      await axios.post(process.env.REACT_APP_SERVER_HOST + "/api/member/chknickname", payload)
        .then((response) => {
          setMent(response.data.data)
          if (response.data.data === "사용 가능한 닉네임 입니다.") {
            setChk(true);
          } else {
            setChk(false);
          }
        });
    }
  }

  // 이메일 중복검사 함수
  const __chkEmail = async (payload) => {
    if (regexEmail.test(set.email)) {
      await axios.post(process.env.REACT_APP_SERVER_HOST + "/api/member/chkemail", payload)
        .then((response) => {
          setMent(response.data.data)
          if (response.data.data === "사용 가능한 이메일 입니다.") {
            setChk(true);
          } else {
            setChk(false);
          }
        });
    }
  }
  // 휴대폰 인증코드 (콘솔 검사용)
  const __testPhone = async (payload) => {
    let a = await axios.post(process.env.REACT_APP_SERVER_HOST + "/api/member/auth/test", { value: payload })
      .then((response) => {
        console.log(response)
        if (response.data.success) {
          Swal.fire(response.data.data, "　", "success");
        } else {
          Swal.fire(response.data.data, "　", "error");
          setVisible(false);
        }
      });
  }
  // 실제 휴대폰 문자 인증코드 발송
  const __examPhone = async (payload) => {
    await axios.post(process.env.REACT_APP_SERVER_HOST + "/api/member/auth/sms", { value: payload })
      .then((response) => {
        console.log(response)
        if (response.data.success) {
          Swal.fire(response.data.data, "　", "success");
        } else {
          Swal.fire(response.data.data, "　", "error");
          setVisible(false);
        }
      });
  }

  // 이메일 인증코드 발송
  const __examEmail = async (payload) => {
    await axios.post(process.env.REACT_APP_SERVER_HOST + "/api/user/auth/email", { value: payload }, {
      headers: {
        Authorization: localStorage.getItem('Authorization'),
        RefreshToken: localStorage.getItem('RefreshToken'),
      }
    })
      .then((response) => {
        if (response.data.success) {
          Swal.fire(response.data.data, "　", "success");
        } else {
          Swal.fire(response.data.data, "　", "error");
          setVisible(false);
        }
      });
  }
  return (
    <div style={{ display: "flex", flexDirection: "column", margin: "0 auto", width: "76%" }}>
      {/* 닉네임 수정 시에 동작하는 내용 */}
      {type === "name" ?
        <div style={{ margin: "0 auto", width: "100%", borderBottom: "1px solid #D9DCFB" }}>
          <p>닉네임</p>
          <input style={{ outline: "none", border: "none" }} placeholder="닉네임"
            name="value"
            type="text"
            value={set.value}
            onChange={(e) => { onChangeHandler(e) }} />
          {/* 닉네임 정규식 유효성 검사 */}
          {set.value === "" ? null : regexNickname.test(set.value) ?
            // 유효성 검사 통과 시 중복검사 결과 출력
            ment === "사용 가능한 닉네임 입니다" ?
              (<div style={{ color: "#00766c", fontSize: "14px" }}>{ment}</div>)
              : (<div style={{ color: "red", fonSize: "14px" }}>{ment}</div>)
            : (<div style={{ color: "red", fonSize: "14px" }}>사용가능한 닉네임이 아닙니다</div>)}
        </div>
        // 휴대폰번호 수정 시에 동작하는 내용
        : type === "call" ?
          <>
            <p>전화번호</p>
            <Input placeholder="전화번호"
              name="phonenumber"
              type="text"
              value={set.phonenumber}
              onChange={(e) => { onChangeHandler(e) }} />
            {set.phonenumber === "" ? null :
              // 휴대폰 번호 유효성 검사
              regexPhone.test(set.phonenumber) ? ment === "사용 가능한 번호 입니다" ?
                // 중복번호 수정 제한
                null
                : (<div style={{ color: "red", fonSize: "14px" }}>{ment}</div>)
                : (<><div style={{ color: "red", fonSize: "14px" }}>올바른 휴대폰 번호가 아닙니다</div></>)}
            <BtnArea>
              {/* 인증번호 발급 버튼 클릭시 입력창 출력 */}
              {visible && <Input variant="outlined" label="인증번호" placeholder="인증번호를 입력해주세요" name="authCode" value={set.authCode} onChange={(e) => { onChangeHandler(e) }} minLength={6} maxLength={6} />}
              {set.authCode === "" ? null :
                // 인증코드 형식에 어긋나면 경고문구 출력
                regtest.test(set.authCode) ? null : (<><div style={{ color: "red", fonSize: "14px" }}>6자리 인증번호를 입력해주세요</div></>)}
              {/* 인증번호 발급 시 재발급 버튼 및 카운트 다운 */}
              {visible && <Button style={{ marginTop: "15px" }} variant="contained" className="default_btn" onClick={() => { reset();__testPhone(set.phonenumber); }}>인증번호 다시 받기 ({min}:{sec < 10 ? <>0{sec}</> : <>{sec}</>})</Button>}
              {/* 휴대폰 번호 입력에 따른 버튼 색상 변경 */}
              {!visible &&
                regexPhone.test(set.phonenumber) ?
                <Button
                  variant="contained"
                  style={{ backgroundColor: "#3E09D1" }}
                  onClick={() => {
                    if (regexPhone.test(set.phonenumber)) {
                      if (!visible) {
                        setChkBtn("인증번호 확인하기");
                        __testPhone(set.phonenumber);
                        timer.current = setInterval(() => {
                          countDown();
                        }, 1000);
                        setVisible(!visible);
                      } else {
                        if (regtest.test(set.authCode)) {
                          __chkPhone(set.phonenumber);
                        } else {
                          Swal.fire("인증번호를 확인해주세요", "　", "error")
                        }
                      }
                    } else {
                      Swal.fire("휴대폰 번호를 확인해주세요", "　", "error")
                    }
                  }}>
                  {chkBtn}
                </Button>
                : visible ? null : <Button
                  variant="contained"
                  onClick={() => {
                    if (regexPhone.test(set.phonenumber)) {
                      if (!visible) {
                        setChkBtn("인증번호 확인하기");
                        __testPhone(set.phonenumber);
                        timer.current = setInterval(() => {
                          countDown();
                        }, 1000);
                        setVisible(!visible);
                      } else {
                        if (regtest.test(set.authCode)) {
                          __chkPhone({ value: set.phonenumber });
                        } else {
                          Swal.fire("인증번호를 확인해주세요", "　", "error")
                        }
                      }
                    } else {
                      Swal.fire("휴대폰 번호를 확인해주세요", "　", "error")
                    }
                  }}>
                  {chkBtn}
                </Button>}
            </BtnArea>
          </>
          // 이메일 수정 시에 동작하는 내용
          : <>
            <p>이메일</p>
            <Input placeholder="이메일"
              name="email"
              type="text"
              value={set.email}
              onChange={(e) => { onChangeHandler(e) }} />
            {/* 이메일 유효성 검사 경고문구 출력 */}
            {set.email === "" ? null : regexEmail.test(set.email) ?
              ment === "사용 가능한 이메일 입니다" ?
                null
                : (<div style={{ color: "red", fonSizen: "14px" }}>{ment}</div>)
              : (<div style={{ color: "red", fonSizen: "14px" }}>올바른 이메일 형식이 아닙니다</div>)}
            <BtnArea>
              {/* 인증코드 입력창 출력 */}
              {visible && <Input variant="outlined" label="인증번호" placeholder="인증번호를 입력해주세요" name="authCode" value={set.authCode} onChange={(e) => { onChangeHandler(e) }} minLength={6} maxLength={6} />}
              {/* 형식에 어긋난 인증코드 입력시 경고문구 출력 */}
              {set.authCode === "" ? null :
                regtest.test(set.authCode) ? null : (<><div style={{ color: "red", fonSizen: "14px" }}>6자리 인증번호를 입력해주세요</div></>)}
              {/* 인증코드 재발급 버튼 */}
              {visible && <Button style={{ marginTop: "20px" }} variant="contained" className="default_btn" onClick={() => { __isToken().then(() => { reset();__examEmail(set.email); });}}>인증번호 다시 받기 ({min}:{sec < 10 ? <>0{sec}</> : <>{sec}</>})</Button>}
              {/* 입력값에 따른 버튼 색상 변경 */}
              {!visible &&
                regexEmail.test(set.email) ?
                <Button
                  variant="contained"
                  style={{ backgroundColor: "#3E09D1" }}
                  onClick={() => {
                    if (regexEmail.test(set.email)) {
                      if (!visible) {
                        setChkBtn("인증번호 확인하기");
                        __isToken().then(() => {
                          __examEmail(set.email);
                        });
                        timer.current = setInterval(() => {
                          countDown();
                        }, 1000);
                        setVisible(!visible);
                      } else {
                        if (regtest.test(set.authCode)) {
                          __chkPhone(set.phonenumber);
                        } else {
                          Swal.fire("인증번호를 확인해주세요", "　", "error")
                        }
                      }
                    } else {
                      Swal.fire("이메일 주소를 확인해주세요", "　", "error")
                    }
                  }}>
                  {chkBtn}
                </Button>
                : visible ? null : <Button
                  variant="contained"
                  onClick={() => {
                    if (regexEmail.test(set.email)) {
                      if (!visible) {
                        setChkBtn("인증번호 확인하기");
                        __isToken().then(() => {
                          __examEmail(set.email);
                        })
                        timer.current = setInterval(() => {
                          countDown();
                        }, 1000);
                        setVisible(!visible);
                      } else {
                        if (regtest.test(set.authCode)) {
                          __chkEmail({ value: set.email })
                        } else {
                          Swal.fire("인증번호를 확인해주세요", "　", "error")
                        }
                      }
                    } else {
                      Swal.fire("이메일 주소를 확인해주세요", "　", "error")
                    }
                  }}>
                  {chkBtn}
                </Button>}
            </BtnArea>
          </>}
    </div>
  )
}

export default ProEdit;

const BtnArea = styled.div`
  width: 100%;
  margin-top: 20px;
  margin-bottom: 5px;
  .default_btn{
    background-color: #D9DCFB;
    color:  white;
  }
  Button {
    width: 100%;
    color: white;
    background-color: #D9DCFB;
    margin-bottom: 10px;
		height: 50px;
		font-weight: 600;
		align-items: center;
    &:hover{
      background-color: #3E09D1;
      color:white;
    }
  }
`;

const Input = styled.input`
  outline: none;
  border-radius: 8px;
  padding: 15px 0; 
  border:2px solid #D9DCFB; 
  width:99.5%;
`
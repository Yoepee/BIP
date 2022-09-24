import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { Button } from "@material-ui/core";

import Header from "../../components/header/Header";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { readSocial } from "../../redux/modules/social";
const CheckEmail = () => {
  const [visble, setVisble] = useState(false);
  const [chkBtn, setChkBtn] = useState("인증하기 받기")
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const initialState = {
    value: ''
  }
  const [member, setMember] = useState(initialState);
  const [chkmail, setChkmail] = useState("사용 가능한 이메일 입니다.")
  const [test, setTest] = useState("");
  /** 이메일 주소 유효검사*/
  const regexEmail = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
  const regtest = /^[0-9]{6}$/;

  const time = useRef(180);
  const [min, setMin] = useState(parseInt(3));
  const [sec, setSec] = useState(0);
  const timer = useRef(null);


  useEffect(()=>{
    return () => clearInterval(timer.current);
  },[])

  useEffect(()=>{
    if(time.current<0){
      clearInterval(timer.current);
    }
  },[sec])

  const countDown = () => {
    setMin(parseInt(time.current/60));
    setSec(time.current%60);
    time.current-=1;
  }

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setMember({ ...member, [name]: value })
  }

  const __chkEmail = async (payload) => {
    let a = await axios.post(process.env.REACT_APP_SERVER_HOST + "/api/member/chkemail", payload)
      .then((response) => {
      });
  }

  const __examEmail = async (payload) => {
    console.log(payload)
    let a = await axios.post(process.env.REACT_APP_SERVER_HOST + "/api/member/auth/email", payload)
      .then((response) => {
        console.log(response)
        setChkmail(response.data.data)
      });
  }

  useEffect(() => {
    if (regexEmail.test(member.value)) {
      __chkEmail(member);
    }
  }, [member])

  const __emailLogin = async (payload) => {
    let a = await axios.post(process.env.REACT_APP_SERVER_HOST + "/api/member/login/email", { authCode: test, email: payload.value })
      .then((response) => {
        if (response.data.success === true) {
          localStorage.setItem("Authorization", response.headers.authorization);
          localStorage.setItem("RefreshToken", response.headers.refreshtoken);
          // localStorage.setItem("name", response.data.data);
          dispatch(readSocial(response.data.data))
          navigate("/signup/change")
        } else {
          alert(response.data.data)
        }
      });
  }
  return (
    <div>
      <Wrapper>
      <Header option={0} />
        <InfoArea>
          <p>
            이메일로 계정찾기
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
            placeholder="이메일을 입력해주세요"

          />
          {member.value === "" ? null : regexEmail.test(member.value) ? null : (<div style={{ color: "red", fonSizen: "14px" }}>올바른 이메일 형식이 아닙니다.</div>)}

          {visble && <input variant="outlined" label="인증번호" placeholder="인증번호를 입력해주세요" value={test} onChange={(e) => { setTest(e.target.value) }} minLength={6} maxLength={6} />}
          {test === "" ? null :
            regtest.test(test) ? null : (<><div style={{ color: "red", fonSizen: "14px" }}>6자리 인증번호를 입력해주세요.</div></>)}

        </form>




        <BtnArea>
          {visble && <Button variant="contained" className="default_btn" onClick={()=>{__examEmail(member);}}>인증번호 다시 받기({min}:{sec<10?<>0{sec}</>:<>{sec}</>})</Button>}
          {!regexEmail.test(member.value)?
          <Button
            variant="contained"
            onClick={() => {
              if (regexEmail.test(member.value)) {
                // if (chkmail==="사용중인 이메일 입니다.") {
                if (!visble) {
                  setChkBtn("인증번호 확인하기");
                  setVisble(!visble);
                  __examEmail(member);
                  timer.current = setInterval(()=>{
                    countDown();
                  },1000);
                } else {
                  if (regtest.test(test)) {
                    __emailLogin(member);
                  } else {
                    alert("인증번호를 확인해주세요.")
                  }
                }
                // }else{
                //     alert("등록되지 않은 메일입니다.")
                //   }
              } else {
                alert("이메일을 확인해주세요.")
              }
            }}>
            {chkBtn}
          </Button>
          :<Button
          variant="contained"
          style={{backgroundColor: "#6D09D1"}}
          onClick={() => {
            if (regexEmail.test(member.value)) {
              // if (chkmail==="사용중인 이메일 입니다.") {
              if (!visble) {
                setChkBtn("인증번호 확인하기");
                setVisble(!visble);
                __examEmail(member);
                timer.current = setInterval(()=>{
                  countDown();
                },1000);
              } else {
                if (regtest.test(test)) {
                  __emailLogin(member);
                } else {
                  alert("인증번호를 확인해주세요.")
                }
              }
              // }else{
              //     alert("등록되지 않은 메일입니다.")
              //   }
            } else {
              alert("이메일을 확인해주세요.")
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
  flex-direction: column;
  margin: 20px auto;

	div{
		margin-bottom: 10px;
	
	}

 form{
  display: flex;
  flex-direction: column;
  input{
    border:2px solid #D5C2F8;
    padding: 20px;
    border-radius: 6px;
    margin-bottom: 13px;
    &:focus{
      border-color:#6D09D1;
      outline: none;
    }
   }
 }

`;



const BtnArea = styled.div`
  width: 100%;
  margin-top: 20px;
  margin-bottom: 5px;
  .default_btn{
    background-color:#D5C2F8;
    color:  white;
  }
  Button {
    width: 100%;
    color: white;
    background-color: #D5C2F8;
    margin-bottom: 10px;
		height: 50px;
		font-weight: 600;
		align-items: center;
    &:hover{
      background-color:#6D09D1;;
      color:white;
    }
  }
`;

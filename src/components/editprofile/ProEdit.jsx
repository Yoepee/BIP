import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Button } from "@material-ui/core";
import styled from "styled-components";
import { width } from "@mui/system";

const ProEdit = ({ set, onChangeHandler, setChk }) => {
  const regexPhone = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/;
  const regexNickname = /^[\w\Wㄱ-ㅎㅏ-ㅣ가-힣]{2,8}$/;
  const regexEmail = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
  const regtest = /^[0-9]{6}$/;
  const { type } = useParams();
  const [ment, setMent] = useState("");
  const [visible, setVisible] = useState(false);
  const [chkBtn, setChkBtn] = useState("인증하기 받기")

  useEffect(() => {
    if (type === "name") {
      if (regexNickname.test(set.value)) {
        __chkNickname({ value: set.value })
      } else {
        setMent("")
      }
    } else if (type === "call") {
      if (regexPhone.test(set.phonenumber)) {
        __chkPhone({ value: set.phonenumber })
      } else {
        setMent("")
      }
    } else {
      if (regexEmail.test(set.email)) {
        __chkEmail({ value: set.email})
      } else {
        setMent("")
      }
    }
  }, [set]);

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

  const __chkPhone = async (payload) => {
    if (regexPhone.test(set.phonenumber)) {
      let a = await axios.post(process.env.REACT_APP_SERVER_HOST + "/api/member/chkphonenumber", payload)
        .then((response) => {
          console.log(response)
          if (response.data.data) {
            setMent("사용 가능한 번호 입니다.")
            setChk(true)
          } else {
            setMent("중복되는 번호가 존재합니다.")
          }
        });
    }
  }
  const __chkNickname = async (payload) => {
    if (regexNickname.test(set.value)) {
      console.log(payload)
      let a = await axios.post(process.env.REACT_APP_SERVER_HOST + "/api/member/chknickname", payload)
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

  const __chkEmail = async (payload) => {
    if (regexEmail.test(set.email)) {
      let a = await axios.post(process.env.REACT_APP_SERVER_HOST + "/api/member/chkemail", payload)
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
  const __testPhone = async (payload) => {
    let a = await axios.post(process.env.REACT_APP_SERVER_HOST + "/api/member/auth/test", {value:payload})
    .then((response)=>{
      console.log(response)
    });
  }
  const __examPhone = async (payload) => {
    let a = await axios.post(process.env.REACT_APP_SERVER_HOST + "/api/member/auth/sms", {value:payload})
    .then((response)=>{
    });
  }

  const __examEmail = async (payload) => {
    console.log(payload)
    let a = await axios.post(process.env.REACT_APP_SERVER_HOST + "/api/user/auth/email", {value:payload})
      .then((response) => {
        console.log(response)
      });
  }
  return (
    <div style={{ display:"flex", flexDirection:"column", margin:"0 auto", width:"76%"}}>
      {type === "name" ?
        <div style={{ margin:"0 auto", width:"100%",borderBottom: "1px solid #F5EAFB"}}>
          <p>닉네임</p>
          <input style={{outline: "none",border:"none"}} placeholder="닉네임"
            name="value"
            type="text"
            value={set.value}
            onChange={(e) => { onChangeHandler(e) }} />
          {set.value === "" ? null : regexNickname.test(set.value) ?
            ment === "사용 가능한 닉네임 입니다." ?
              (<div style={{ color: "#00766c", fontSize: "14px" }}>{ment}</div>)
              : (<div style={{ color: "red", fonSizen: "14px" }}>{ment}</div>)
            : (<div style={{ color: "red", fonSizen: "14px" }}>사용가능한 닉네임이 아닙니다.</div>)}
        </div>
        : type === "call" ?
          <>
            <p>전화번호</p>
            <Input placeholder="전화번호"
              name="phonenumber"
              type="text"
              value={set.phonenumber}
              onChange={(e) => { onChangeHandler(e) }} />
            {set.phonenumber === "" ? null :
              regexPhone.test(set.phonenumber) ? ment === "사용 가능한 번호 입니다." ?
                // (<div style={{ color: "#00766c", fontSize: "14px" }}>{ment}</div>)
                null
                : (<div style={{ color: "red", fonSizen: "14px" }}>{ment}</div>)
                : (<><div style={{ color: "red", fonSizen: "14px" }}>올바른 휴대폰 번호이 아닙니다.</div></>)}
                <BtnArea>
            {visible && <Input variant="outlined" label="인증번호" placeholder="인증번호를 입력해주세요" name="authCode" value={set.authCode} onChange={(e) => { onChangeHandler(e) }} minLength={6} maxLength={6}/>}
          {set.authCode === "" ? null :
            regtest.test(set.authCode) ? null : (<><div style={{ color: "red", fonSizen: "14px" }}>6자리 인증번호를 입력해주세요.</div></>)}
            {visible && <Button style={{marginTop:"15px",width:"100px"}}variant="contained" className="default_btn" onClick={()=>{__testPhone(set.phonenumber);time.current=180;}}>인증번호 다시 받기 ({min}:{sec<10?<>0{sec}</>:<>{sec}</>})</Button>}
          {!visible&&
          regexPhone.test(set.phonenumber)?
          <Button
          
            variant="contained"
            style={{backgroundColor: "#6D09D1"}}
            onClick={() => {
              if (regexPhone.test(set.phonenumber)) {
                if (!visible) {
                  setChkBtn("인증번호 확인하기");
                  __testPhone(set.phonenumber);
                  timer.current = setInterval(()=>{
                    countDown();
                  },1000);
                  setVisible(!visible);
                } else {
                  if(regtest.test(set.authCode)){
                  __chkPhone(set.phonenumber);
                  }else{
                    alert("인증번호를 확인해주세요.")
                  }
                }
              } else {
                alert("휴대폰 번호를 확인해주세요.")
              }
            }}>
            {chkBtn}
          </Button>
          :visible?null:<Button
          variant="contained"
          onClick={() => {
            if (regexPhone.test(set.phonenumber)) {
              if (!visible) {
                setChkBtn("인증번호 확인하기");
                __testPhone(set.phonenumber);
                timer.current = setInterval(()=>{
                  countDown();
                },1000);
                setVisible(!visible);
              } else {
                if(regtest.test(set.authCode)){
                __chkPhone({value:set.phonenumber});
                }else{
                  alert("인증번호를 확인해주세요.")
                }
              }
            } else {
              alert("휴대폰 번호를 확인해주세요.")
            }
          }}>
          {chkBtn}
        </Button>}
          </BtnArea>
          </>
          : <>
            <p>이메일</p>
            <Input placeholder="이메일"
              name="email"
              type="text"
              value={set.email}
              onChange={(e) => { onChangeHandler(e) }} />
            {set.email === "" ? null : regexEmail.test(set.email) ?
              ment === "사용 가능한 이메일 입니다." ?
                // (<div style={{ color: "#00766c", fontSize: "14px" }}>{ment}</div>)
                null
                : (<div style={{ color: "red", fonSizen: "14px" }}>{ment}</div>)
              : (<div style={{ color: "red", fonSizen: "14px" }}>올바른 이메일 형식이 아닙니다.</div>)}
              <BtnArea>
            {visible && <Input variant="outlined" label="인증번호" placeholder="인증번호를 입력해주세요" name="authCode" value={set.authCode} onChange={(e) => { onChangeHandler(e) }} minLength={6} maxLength={6}/>}
          {set.authCode === "" ? null :
            regtest.test(set.authCode) ? null : (<><div style={{ color: "red", fonSizen: "14px" }}>6자리 인증번호를 입력해주세요.</div></>)}
            {visible && <Button style ={{marginTop:"20px"}} variant="contained" className="default_btn" onClick={()=>{__examEmail(set.email);time.current=180;}}>인증번호 다시 받기 ({min}:{sec<10?<>0{sec}</>:<>{sec}</>})</Button>}
          {!visible&&
          regexEmail.test(set.email)?
          <Button
            variant="contained"
            style={{backgroundColor: "#6D09D1"}}
            onClick={() => {
              if (regexEmail.test(set.email)) {
                if (!visible) {
                  setChkBtn("인증번호 확인하기");
                  __examEmail(set.email);
                  timer.current = setInterval(()=>{
                    countDown();
                  },1000);
                  setVisible(!visible);
                } else {
                  if(regtest.test(set.authCode)){
                  __chkPhone(set.phonenumber);
                  }else{
                    alert("인증번호를 확인해주세요.")
                  }
                }
              } else {
                alert("이메일 주소를 확인해주세요.")
              }
            }}>
            {chkBtn}
          </Button>
          :visible?null:<Button
          variant="contained"
          onClick={() => {
            if (regexEmail.test(set.email)) {
              if (!visible) {
                setChkBtn("인증번호 확인하기");
                __examEmail(set.email);
                timer.current = setInterval(()=>{
                  countDown();
                },1000);
                setVisible(!visible);
              } else {
                if(regtest.test(set.authCode)){
                  __chkEmail({value:set.email})
                }else{
                  alert("인증번호를 확인해주세요.")
                }
              }
            } else {
              alert("이메일 주소를 확인해주세요.")
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
    background-color: #D5C2F8;
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
      background-color: #6D09D1;
      color:white;
    }
  }
`;

const Input = styled.input`
  outline: none;
  border-radius: 8px;
  padding: 15px 0; 
  border:2px solid #F5EAFB; 
  width:99.5%;
`
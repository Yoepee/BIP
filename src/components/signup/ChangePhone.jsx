import React,{useEffect, useRef, useState} from "react";
import styled from "styled-components";
import { Button } from "@material-ui/core";

import { TextField } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";

const ChangePhone = () =>{
  const navigate = useNavigate();
  const social = useSelector((state)=> state.social);

  const initialState = {
    value:'',
  }
  const [member, setMember] = useState(initialState);
  const [visble, setVisble] = useState(false);
  const [chkBtn, setChkBtn] = useState("인증하기 받기")
  const [ment,setMent]=useState("");
  const [test,setTest] = useState("")
  const regexPhone = /^01([0|1|6|7|8|9])-?([0-9]{4})-?([0-9]{4})$/;
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
    const {name, value} = e.target;
    setMember({...member, [name]: value})
  }

  const __chkPhone = async (payload) => {
    if(regexPhone.test(member.value)){
      let a = await axios.post(process.env.REACT_APP_SERVER_HOST + "/api/member/chkphonenumber", payload)
        .then((response) => {
          if(response.data.data){
            setMent("사용 가능한 번호 입니다.")
          }else{
            setMent("중복되는 번호가 존재합니다.")
          }
        });
      }
  }

  const __testPhone = async (payload) => {
    let a = await axios.post(process.env.REACT_APP_SERVER_HOST + "/api/member/auth/test", payload)
    .then((response)=>{
      console.log(response)
    });
  }
  const __examPhone = async (payload) => {
    let a = await axios.post(process.env.REACT_APP_SERVER_HOST + "/api/member/auth/sms", payload)
    .then((response)=>{
    });
  }
  
  useEffect(()=>{
    if(regexPhone.test(member.value)){
      __chkPhone(member);
    }else{
      __chkPhone("")
    }
  },[member])

  const __editPhone = async(payload)=>{
    if(ment==="사용 가능한 번호 입니다."){
      let a = await axios.put(process.env.REACT_APP_SERVER_HOST+"/api/user/phonenumber", {authCode:test, phoneNumber:payload.value},{
        headers: {
          Authorization: localStorage.getItem('Authorization'),
          RefreshToken: localStorage.getItem('RefreshToken'),
      }}).then((response)=>{
        console.log(response)
        if(response.data.success){
        if(social?.data?.nickname===null){
          navigate("/signup/nickname")
        }else{
          navigate("/")
        }}else{
          alert(response.data.data)
        }
      })
    }
  }
  
  return (
    <Wrapper>
      <HeaderArea>

        <HeaderTitle>휴대폰 설정</HeaderTitle>
        <Button className="next_btn" onClick={()=>{__editPhone(member)}}>완료</Button>
      </HeaderArea>

      <Profile>

        <TextField  variant="outlined" label="휴대폰 번호" placeholder="휴대폰 번호를 입력하세요"  name="value"
            value={member.value}
            onChange={onChangeHandler}/>
            {member.value === "" ? null :
            regexPhone.test(member.value) ? ment === "사용 가능한 번호 입니다."?
            (<div style={{color: "#00766c", fontSize:"14px"}}>{ment}</div>)
            :(<div style={{color:"red", fonSizen:"14px"}}>{ment}</div>) 
            : (<><div style={{ color: "red", fonSizen: "14px" }}>올바른 휴대폰 번호이 아닙니다.</div></>)}

        {visble && <TextField variant="outlined" label="인증번호" placeholder="인증번호를 입력해주세요" value={test} onChange={(e)=>{setTest(e.target.value)}} minLength={6} maxLength={6}/>}
          {test === "" ? null :
            regtest.test(test) ? null : (<><div style={{ color: "red", fonSizen: "14px" }}>6자리 인증번호를 입력해주세요.</div></>)}
            <BtnArea>
          {visble && <Button variant="contained" className="default_btn" onClick={()=>{__testPhone(member);time.current=180;}}>인증번호 다시 받기 ({min}:{sec<10?<>0{sec}</>:<>{sec}</>})</Button>}
          {!visble&&
          <Button
            variant="contained"
            onClick={() => {
              if (regexPhone.test(member.value)) {
                if (!visble) {
                  setChkBtn("인증번호 확인하기");
                  __testPhone(member);
                  timer.current = setInterval(()=>{
                    countDown();
                  },1000);
                  setVisble(!visble);
                } else {
                  if(regtest.test(test)){
                  __chkPhone(member);
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
      </Profile>
    </Wrapper>
  )
}

export default ChangePhone;

// const Wrapper = styled.div`
//   display: flex;

//   width: 80%;
//   flex-direction: column;
//   margin: 30px auto;
 
// `;
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
 }

`;


const HeaderArea = styled.div`
  display: flex;
  width: 100%;
  height: 50px;
  
  justify-content: space-between;
  border-bottom: 1px solid #b1acac;

  Button {
    width: 1%;
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

const Profile = styled.form`
  margin: 150px auto 0 auto;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 500px;
`;

const BtnArea = styled.div`
  width: 100%;
  margin-top: 20px;
  margin-bottom: 5px;
  .default_btn{
    background-color: #ececec;
    color: black;
  }
  Button {
    width: 100%;
		color: black;
		background-color: #ececec;
    margin-bottom: 10px;
		height: 50px;
		font-weight: 600;
		align-items: center;
    &:hover{
      background-color: #00766c;
      color:white;
    }
  }
`;
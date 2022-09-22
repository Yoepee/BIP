import React,{useEffect, useState} from "react";
import styled from "styled-components";
import { Button } from "@material-ui/core";

import { TextField } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ChangePhone = () =>{
  const navigate = useNavigate();

  const initialState = {
    value:'',
  }
  const [member, setMember] = useState(initialState);
  const [ment,setMent]=useState("");
  /** 닉네임 검사*/ 
  const regexPhone = /^01([0|1|6|7|8|9])-?([0-9]{4})-?([0-9]{4})$/;

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
  
  useEffect(()=>{
    if(regexPhone.test(member.value)){
      __chkPhone(member);
    }else{
      __chkPhone("")
    }
  },[member])

  const __editPhone = async(payload)=>{
    if(ment==="사용 가능한 번호 입니다."){
      let a = await axios.put(process.env.REACT_APP_SERVER_HOST+"/api/user/phonenumber", payload,{
        headers: {
          Authorization: localStorage.getItem('Authorization'),
          RefreshToken: localStorage.getItem('RefreshToken'),
      }}).then((response)=>{
        console.log(response)
        navigate("/")
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

        <TextField label="휴대폰 번호" placeholder="휴대폰 번호를 입력하세요"  name="value"
            value={member.value}
            onChange={onChangeHandler}/>
            {member.value === "" ? null :
            regexPhone.test(member.value) ? ment === "사용 가능한 번호 입니다."?
            (<div style={{color: "#00766c", fontSize:"14px"}}>{ment}</div>)
            :(<div style={{color:"red", fonSizen:"14px"}}>{ment}</div>) 
            : (<><div style={{ color: "red", fonSizen: "14px" }}>올바른 휴대폰 번호이 아닙니다.</div></>)}
      </Profile>
    </Wrapper>
  )
}

export default ChangePhone;

const Wrapper = styled.div`
  display: flex;

  width: 80%;
  flex-direction: column;
  margin: 30px auto;
 
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
  label {
    margin-top: 100px;
  }
  input {
    margin-top: 150px;
  }
`;
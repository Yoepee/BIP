import React,{useEffect, useState} from "react";
import styled from "styled-components";
import { Button } from "@material-ui/core";

import { TextField } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CheckNickname = () => {
  const navigate = useNavigate();

  const initialState = {
    value:'',
  }
  const [member, setMember] = useState(initialState)
  const [chkname,setChkname] = useState("")
  /** 닉네임 검사*/ 
  const regexNickname =  /^[\w\Wㄱ-ㅎㅏ-ㅣ가-힣]{2,10}$/;

  const onChangeHandler = (e) => {
    const {name, value} = e.target;
    setMember({...member, [name]: value})
  }

  const __chkNickname = async(payload)=>{
    let a = await axios.post(process.env.REACT_APP_SERVER_HOST+"/api/member/chknickname", payload)
    .then((response)=>{
      setChkname(response.data.data)
    });
  }
  
  useEffect(()=>{
    if(regexNickname.test(member.value)){
      __chkNickname(member);
    }else{
      setChkname("")
    }
  },[member])

  const __editNickname = async(payload)=>{
    if(chkname==="사용 가능한 닉네임 입니다."){
      let a = await axios.put(process.env.REACT_APP_SERVER_HOST+"/api/user/nickname", payload,{
        headers: {
          Authorization: localStorage.getItem('Authorization'),
          RefreshToken: localStorage.getItem('RefreshToken'),
      }}).then((response)=>{
        localStorage.setItem("name", response.data.data.nickname);
        navigate("/")
      })
    }
  }

  return (
    <Wrapper>
      <HeaderArea>

        <HeaderTitle>닉네임 설정</HeaderTitle>
        <Button className="next_btn" onClick={()=>{__editNickname(member)}}>완료</Button>
      </HeaderArea>

      <Profile>

      <label style={{fontWeight:'600', fontSize:'18px'}}>닉네임</label>
        <input label="닉네임" placeholder="닉네임을 입력하세요"  name="value"
            value={member.value}
            onChange={onChangeHandler}/>
            {member.value=== "" ? null: regexNickname.test(member.value)?
            chkname === "사용 가능한 닉네임 입니다."?
            (<div style={{color: "#00766c", fontSize:"14px",marginTop:"9px" ,marginBottom:"9px"}}>{chkname}</div>)
            :(<div style={{color:"red", fonSizen:"14px" ,marginTop:"9px" ,marginBottom:"9px"}}>{chkname}</div>)
            :(<div style={{color:"red", fonSizen:"14px" ,marginTop:"9px" ,marginBottom:"9px"}}>사용가능한 닉네임이 아닙니다.</div>)}
      </Profile>
    </Wrapper>
  );
};

export default CheckNickname;

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
  margin: 69px auto 0 auto;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 500px;
  label {
    margin-top: 10px;
  }
  input {
    padding: 5px 10px;
    outline: none;
    border: none;
    font-size: 15px;
    border-bottom: 1px solid #D5C2F8;
    margin-top: 49px;
    &::placeholder{
      font-size: 15px;
    }
    &:focus{
      border-bottom: 2px solid #6D09D1;
    }
  }
`;

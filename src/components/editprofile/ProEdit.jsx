import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const ProEdit = ({value, onChangeHandler, setChk}) => {
  const regexPhone = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/;
  const regexNickname =  /^[\w\Wㄱ-ㅎㅏ-ㅣ가-힣]{2,10}$/;
  const regexEmail = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
  const {type} = useParams();
  const [ment,setMent]=useState("");
  
  useEffect(()=>{
    if(type==="name"){
      if(regexNickname.test(value.value)){
        __chkNickname(value)
      }else{
        setMent("")
      }
    }else if(type==="call"){
      if(regexPhone.test(value.value)){
        __chkPhone(value)
      }else{
        setMent("")
      }
    }else{
      if(regexEmail.test(value.value)){
        __chkEmail(value)
      }else{
        setMent("")
      }
    }
  },[value])

  console.log(ment)
    
      const __chkPhone = async (payload) => {
        if(regexPhone.test(value.value)){
          let a = await axios.post(process.env.REACT_APP_SERVER_HOST + "/api/member/chkphonenumber", payload)
            .then((response) => {
              if(response.data.data){
                setMent("사용 가능한 번호 입니다.")
                setChk(true)
              }else{
                setMent("중복되는 번호가 존재합니다.")
              }
            });
          }
      }
      const __chkNickname = async(payload)=>{
        if(regexNickname.test(value.value)){
        let a = await axios.post(process.env.REACT_APP_SERVER_HOST+"/api/member/chknickname", payload)
        .then((response)=>{
            setMent(response.data.data)
            if(response.data.data === "사용 가능한 닉네임 입니다."){
              setChk(true);
            }else{
              setChk(false);
            }
        });
      }
      }

      const __chkEmail = async(payload)=>{
        if(regexEmail.test(value.value)){
        let a = await axios.post(process.env.REACT_APP_SERVER_HOST+"/api/member/chkemail", payload)
        .then((response)=>{
            setMent(response.data.data)
            if(response.data.data === "사용 가능한 이메일 입니다."){
              setChk(true);
            }else{
              setChk(false);
            }
        });
      }
    }
  return (
    <div>
      {type==="name"?
      <>
      <p>닉네임</p>
      <input placeholder="닉네임"
        name="value"
        type="text"
        value={value.value}
        onChange={(e)=>{onChangeHandler(e)}} />
        {value.value=== "" ? null: regexNickname.test(value.value)?
            ment === "사용 가능한 닉네임 입니다."?
            (<div style={{color: "#00766c", fontSize:"14px"}}>{ment}</div>)
            :(<div style={{color:"red", fonSizen:"14px"}}>{ment}</div>)
            :(<div style={{color:"red", fonSizen:"14px"}}>사용가능한 닉네임이 아닙니다.</div>)}
      </>
      :type==="call"?
      <>
      <p>전화번호</p>
      <input placeholder="전화번호"
        name="value"
        type="text"
        value={value.value}
        onChange={(e)=>{onChangeHandler(e)}} />
        {value.value === "" ? null :
            regexPhone.test(value.value) ? ment === "사용 가능한 번호 입니다."?
            (<div style={{color: "#00766c", fontSize:"14px"}}>{ment}</div>)
            :(<div style={{color:"red", fonSizen:"14px"}}>{ment}</div>) 
            : (<><div style={{ color: "red", fonSizen: "14px" }}>올바른 휴대폰 번호이 아닙니다.</div></>)}
      </>
      :<>
      <p>이메일</p>
      <input placeholder="이메일"
        name="value"
        type="text"
        value={value.value}
        onChange={(e)=>{onChangeHandler(e)}} />
        {value.value===""?null: regexEmail.test(value.value)? 
        ment === "사용 가능한 이메일 입니다."?
          (<div style={{color: "#00766c", fontSize:"14px"}}>{ment}</div>)
          :(<div style={{color:"red", fonSizen:"14px"}}>{ment}</div>)
        :(<div style={{color:"red", fonSizen:"14px"}}>올바른 이메일 형식이 아닙니다.</div>)}
      </>}
    </div>
  )
}

export default ProEdit;
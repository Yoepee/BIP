import React, { useState } from "react";
import { TextField } from "@material-ui/core";
import styled from "styled-components";
import { Button } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";





const CheckPhone = () => {
  const [visble, setVisble] = useState(false);
  const [chkBtn,setChkBtn] = useState("인증하기 받기")
	const navigate = useNavigate();
  
  const initialState = {
    phone:''
  }
  const [member, setMember] = useState(initialState)
  /** 휴대폰 번호 인증 유효검사*/ 
  const regexPhone = /^01([0|1|6|7|8|9])-?([0-9]{4})-?([0-9]{4})$/;

  const onChangeHandler = (e) => {
    const {name, value} = e.target;
    setMember({...member, [name]: value})
  }

  return (
    <div>
      <Wrapper>
        <IconArea>
          <Button onClick={()=>{navigate('/')}}>
            <KeyboardArrowLeftIcon />
          </Button>
        </IconArea>

        <InfoArea>
          <p>
            휴대폰 인증으로 가입해요 번호는 안전하게 보안되어 어디에도 공개되지
            않아요
          </p>
        </InfoArea>
          <form action="">
          <TextField
            id="outlined-basic"
            label="휴대폰 번호"
            variant="outlined"
            name="phone"
            value={member.phone}
            onChange={onChangeHandler}
            minLength={10}
            maxLength={11}
            placeholder="휴대폰 번호를 입력해주세요"
						
          />
          { member.phone=== "" ? null:
          regexPhone.test(member.phone)?(<div style={{color: "#00766c", fontSize:"14px"}}>사용가능한 휴대폰 번호입니다.</div>):(<div style={{color:"red", fonSizen:"14px"}}>올바른 휴대폰 번호이 아닙니다.</div>)}

          {visble && <TextField variant="outlined" label="인증번호" placeholder="인증번호를 입력해주세요" />}
					
          </form>
          
          
         

        <BtnArea>
				{visble &&<Button variant="contained" className="default_btn">인증번호 다시 받기</Button>}
          <Button
            variant="contained" 
            onClick={() => {
              setVisble(!visble); 
              if(!visble){
                setChkBtn("인증번호 확인하기")
              }else{
                setChkBtn("인증하기 받기")
              }
              if(chkBtn==="인증번호 확인하기"){
                navigate("/signup/email")
              }
            }}>
              {chkBtn}
          </Button>
        </BtnArea>
      </Wrapper>
    </div>
  );
};

export default CheckPhone;



const IconArea = styled.div`
  width: 1%;
  Button {
    width: 20%;
    span {
      padding: 0;

      svg {
        margin-right: 40px;
      }
    }
  }
`;

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
 }

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

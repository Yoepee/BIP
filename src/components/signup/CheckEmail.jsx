import React, { useState } from "react";
import { TextField } from "@material-ui/core";
import styled from "styled-components";
import { Button } from "@material-ui/core";

import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import { useNavigate } from "react-router-dom";





const CheckEmail = () => {
  const [visble, setVisble] = useState(false);
  const [chkBtn,setChkBtn] = useState("인증하기 받기")
	const navigate = useNavigate();
	
  return (
    <div>
      <Wrapper>
        <IconArea>
          <Button onClick={()=>{navigate('/sign_up')}} >
            <KeyboardArrowLeftIcon />
          </Button>
        </IconArea>

        <InfoArea>
          <p>
            이메일 인증이 필요합니다.
          </p>
        </InfoArea>
          <form action="">
          <TextField
            id="outlined-basic"
            label="이메일"
            variant="outlined"
            placeholder="이메일을 입력해주세요"
						
          />

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
                navigate("/signup/email/nickname")
              }
            }}>
            {chkBtn}
          </Button>
        </BtnArea>
      </Wrapper>
    </div>
  );
};

export default CheckEmail;



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

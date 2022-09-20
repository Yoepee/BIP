import React from "react";
import styled from "styled-components";
import { Button } from "@material-ui/core";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";

import SearchIcon from '@mui/icons-material/Search';
import { TextField } from "@material-ui/core";
import { useNavigate } from "react-router-dom";

const CheckNickname = () => {
  const navigate = useNavigate();
  
  return (
    <Wrapper>
      <HeaderArea>
        <Button
          onClick={() => {
            navigate(-1);
          }}>
          <KeyboardArrowLeftIcon />
        </Button>

        <HeaderTitle>프로필 설정</HeaderTitle>
        <Button className="next_btn" onClick={()=>{navigate("/")}}>다음</Button>
      </HeaderArea>

      <Profile>
        <ImgArea>
        <img src={process.env.PUBLIC_URL + `/assets/user_svg.svg`}/>
        <label className="input_file_button" htmlFor="input_file"><SearchIcon fontSize="large"/></label>
        <input type="file" id="input_file" accept="image/jpg,/impge/png,image/jpeg" style={{display:"none"}}/></ImgArea>

        <TextField label="닉네임" placeholder="닉네임을 입력하세요" />
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
const ImgArea = styled.div`
  margin: 0 auto;
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background-color: #26a69a;
  img{
    margin: 45px 30px;
    width: 70%;
    height: 50%;
    
  }
  .input_file_button{
  display: flex;
  justify-content: center;
  width: 1%;
  margin: -40px 0 0 135px;
  box-shadow: rgb(0 0 0 / 10%) 0 1px 20px 0px;
  padding: 6px 25px;
  border-radius: 50%;
  background-color: #fff;
  color:black;
  
  cursor: pointer;
  
  
}
  
 
`;

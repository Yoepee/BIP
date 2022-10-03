import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { __searchName, __searchPhone } from '../../redux/modules/searchMember';
import styled from 'styled-components';
import { useState } from 'react';

const Option5 = ({ head, payload, onChangeHandle }) => {
  const dispatch = useDispatch();
  
  const searchMemberName = () => {
    dispatch(__searchName(payload));
   }
   const searchMemberPhone = () => {
    dispatch(__searchPhone(payload));
   }

  return (
    <>
      <div style={{ marginLeft: "1%" }}>
        <Input  placeholder={head} name="value" value={payload.value} onChange={(e)=>{onChangeHandle(e)}}/>
      </div>
      <div onClick={() => {
        if(head==="닉네임으로 친구 추가"){
          searchMemberName();
        }else{
          searchMemberPhone();
        }
        }} style={{ marginLeft: "auto", marginRight: "2%" }}>
        <p>확인</p>
      </div>
    </>
  )
}

export default Option5;

const Input = styled.input`
  margin-left: 20px;
  border: none;
  outline: none;
  width: 200px;
  border-bottom: 1px solid  #F5EAFB;
  margin-bottom: 31px;
`
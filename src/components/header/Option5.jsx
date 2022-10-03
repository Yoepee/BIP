import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { __searchName, __searchPhone } from '../../redux/modules/searchMember';
import styled from 'styled-components';
import { useState } from 'react';

const Option5 = ({ head, payload }) => {
  const dispatch = useDispatch();
  const initialState = {value:""}
  const [value, setValue] = useState(initialState);

  const onChangeHandle = (e) => {
    const {name, value} = e.target;
    setValue({...value, [name]: value})
  }
  
  const searchMemberName = () => {
    dispatch(__searchName(value));
   }
   const searchMemberPhone = () => {
    dispatch(__searchPhone(value));
   }

   console.log(value.value)
  return (
    <>
      <div style={{ marginLeft: "1%" }}>
        {/* <p>{head}</p> */}
        <Input  placeholder={head} name="value" value={value.value} onChange={onChangeHandle}/>
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
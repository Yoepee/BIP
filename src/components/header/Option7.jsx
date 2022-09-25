import SearchIcon from '@mui/icons-material/Search';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import styled from 'styled-components';
import { useState } from 'react';
import { __searchFriendName, __searchFriendPhone } from '../../redux/modules/member';
import { useDispatch } from 'react-redux';
const Option7 = ({ head, setType, type }) => {
  const dispatch = useDispatch();
  const [sort, setSort] = useState("닉네임");
  const [chk, setChk] = useState(false);
  const initialState = {
    value:""
  }
  const [value,setValue] =useState(initialState);

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setValue({...value, [name]: value})
  }

  const searchMemberName = (member) => {
    dispatch(__searchFriendName(member));
   }
   const searchMemberPhone = (member) => {
    dispatch(__searchFriendPhone(member));
   }
  return (
    <>
      {!chk ?
      <>
        <p onClick={() => { setChk(!chk) }} style={{ cursor: "pointer" }}>{sort} ▼</p>
        {/* <p onClick={() => { setChk(!chk) }} style={{ cursor: "pointer", color:"#6D09D1" }}>▼</p> */}
      </>
        : <>
          <p onClick={() => { setChk(!chk) }} style={{ cursor: "pointer" }}>{sort} ▲</p>
          {/* <p onClick={() => { setChk(!chk) }} style={{ cursor: "pointer", color:"#6D09D1" }}>▲</p> */}
          <div style={{
            width: "120px",
            position: "absolute",
            backgroundColor: "white",
            top: "50px", left: "-10px",
            textAlign: "center",
            borderRadius: "5px",
            border: "1px solid black"
          }}>
            <div style={{ borderBottom: "1px solid black", padding: "3px", cursor: "pointer" }}
              onClick={() => { setSort("닉네임"); setChk(!chk); }}>닉네임</div>
            <div style={{ padding: "3px", cursor: "pointer" }}
              onClick={() => { setSort("연락처"); setChk(!chk) }}>연락처</div>
          </div>
        </>
      }
      <div>
        <SearchInput placeholder='친구검색' name='value' value={value.value} onChange={onChangeHandler}/>
      </div>
      <div style={{ marginRight: "30px", cursor: "pointer" }}
        onClick={() => { 
          if(sort==="닉네임"){
            searchMemberName(value.value);
          }else{
            searchMemberPhone(value.value);
          }
        }}>
        <p><SearchIcon /></p>
      </div>
      <div style={{ marginRight: "30px", cursor: "pointer" }}
        onClick={() => { setType("none"); }}>
        <p><CloseRoundedIcon /></p>
      </div>
    </>
  )
}

export default Option7;


const SearchInput = styled.input`
outline: none;
border: none;
border-bottom: 1px solid #D5C2F8;
padding: 5px 10px;
margin-top: 20px;
&::placeholder{
  font-size: 15px;
}
`



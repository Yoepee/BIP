import SearchIcon from '@mui/icons-material/Search';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import styled from 'styled-components';
import { useState } from 'react';
import { __searchFriendName, __searchFriendPhone, __getMember } from '../../redux/modules/member';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

// 친구검색(친구목록창 검색기능)
const Option7 = ({ setType }) => {
  const dispatch = useDispatch();
  const [sort, setSort] = useState("닉네임");
  const [chk, setChk] = useState(false);
  const initialState = {
    value: ""
  }
  const [value, setValue] = useState(initialState);

  const __isToken = async () => {
    await axios.get(process.env.REACT_APP_SERVER_HOST + `/api/member/reissue`, {
      headers: {
        Authorization: localStorage.getItem('Authorization'),
        RefreshToken: localStorage.getItem('RefreshToken'),
      }
    }
    ).then((res) => {
      if (res.data.success) {
        localStorage.setItem("Authorization", res.headers.authorization);
        localStorage.setItem("RefreshToken", res.headers.refreshtoken);
      }
    })
  }

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setValue({ ...value, [name]: value })
  }

  const searchMemberName = (member) => {
    dispatch(__searchFriendName(member));
  }
  const searchMemberPhone = (member) => {
    dispatch(__searchFriendPhone(member));
  }

  const handleKeyPress = e => {
    if (e.key === 'Enter') {
      __isToken().then(() => {
        if (sort === "닉네임") {
          if (value.value === "") {
            dispatch(__getMember());
          } else {
            searchMemberName(value.value);
          }
        } else {
          if (value.value === "") {
            dispatch(__getMember());
          } else {
            searchMemberPhone(value.value);
          }
        }
      })
    }
  }

  return (
    <>
    <Wrap>
    {!chk ?
        <>
          <p onClick={() => { setChk(!chk) }} 
          style={{ cursor: "pointer", paddingTop:"5px" }}>
            <span>{sort}</span>
            <span style={{color:"#6B68F3", verticalAlign:"middle"}}><ExpandMoreIcon /></span></p>
          
        </>
        : <>
          <p onClick={() => { setChk(!chk) }}
          style={{ cursor: "pointer", paddingTop:"5px" }}>
            <span>{sort}</span>
            <span style={{color:"#6B68F3", verticalAlign:"middle"}}><ExpandLessIcon /></span></p>
          
          <div style={{
            width: "120px",
            position: "absolute",
            backgroundColor: "white",
            top: "50px", left: "5px",
            textAlign: "center",
            borderRadius: "5px",
            border: "1px solid #292929"
          }}>
            <OptionMenu
              onClick={() => { setSort("닉네임"); setChk(!chk); }}>닉네임</OptionMenu>
            <OptionMenu
              onClick={() => { setSort("연락처"); setChk(!chk) }}>연락처</OptionMenu>
          </div>
        </>
      }
      <div>
        <SearchInput placeholder='친구검색' name='value' value={value.value} onChange={onChangeHandler}  onKeyPress={handleKeyPress}/>
      </div>
      <div style={{ marginRight: "10px", cursor: "pointer" }}
        onClick={() => {
          __isToken().then(() => {
            if (sort === "닉네임") {
              if (value.value === "") {
                dispatch(__getMember());
              } else {
                searchMemberName(value.value);
              }
            } else {
              if (value.value === "") {
                dispatch(__getMember());
              } else {
                searchMemberPhone(value.value);
              }
            }
          })
        }}>
        <p><SearchIcon style={{ color: "#6B68F3", margin:"5px 0 0 5px" }} /></p>
      </div>
      <div style={{ marginRight: "40px", cursor: "pointer", marginTop:"5px" }}
        onClick={() => { setType("none"); }}>
        <p><CloseRoundedIcon style={{color:"#6B68F3"}}/></p>
      </div>
    </Wrap>
    </>
  )
}

export default Option7;


const Wrap = styled.div`
  /* background-color: pink; */
  display: flex;
  margin-left: auto;
`

const SearchInput = styled.input`
background-color: #ebebeb;
outline: none;
border: none;
border-radius: 8px;
/* border-bottom: 1px solid #FAFAFA; */
padding: 4px 10px;
margin-top: 20px;
&::placeholder{
  font-size: 13px;
}
`

const OptionMenu = styled.div`
padding: 3px;
cursor: pointer;
&:hover{
  background-color:#6B68F3;
  color:white;
}`

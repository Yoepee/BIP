import { useDispatch } from 'react-redux';
import { __searchName, __searchPhone } from '../../redux/modules/searchMember';
import styled from 'styled-components';
import axios from 'axios';

// 친구추가 뒤로가기(친구) 제목 완료
const Option5 = ({ head, payload, onChangeHandle }) => {
  const dispatch = useDispatch();

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

  const searchMemberName = () => {
    dispatch(__searchName(payload));
  }
  const searchMemberPhone = () => {
    dispatch(__searchPhone(payload));
  }

  // 엔터로 채팅하기
  const handleKeyPress = e => {
    if (e.key === 'Enter') {
      __isToken().then(() => {
        if (head === "닉네임으로 친구 추가") {
          searchMemberName();
        } else {
          searchMemberPhone();
        }
      })
    }
  }
  return (
    <>
      <div style={{ marginLeft: "1%" }}>
        <input
          type="text"
          style={{
            outline: "none",
            border: "none",
            borderBottom: "1px solid #D9DCFB",
            marginTop: "20px",
            width: "250px",
          }}
          onKeyPress={handleKeyPress}
          placeholder={head}
          name="value"
          value={payload.value}
          onChange={(e) => { onChangeHandle(e) }}
        />
      </div>
      <div
        onClick={() => {
          __isToken().then(() => {
            if (head === "닉네임으로 친구 추가") {
              searchMemberName();
            } else {
              searchMemberPhone();
            }
          })
        }}
        style={{ marginLeft: "auto", marginRight: "2%" }}>
        <p>찾기</p>
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
  border-bottom: 1px solid  #D9DCFB;
  margin-bottom: 31px;
`
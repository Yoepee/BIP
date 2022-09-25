import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import { useNavigate, useParams } from 'react-router-dom';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useState } from 'react';
import axios from 'axios';

const Option3 = ({head}) =>{
  const navigate = useNavigate();
  const [chk, setChk] = useState(false);
  const {id} = useParams();

  const exitPromist = async()=>{
    if (window.confirm("약속을 나가시겠습니까?")) {
      const data = await axios.delete(process.env.REACT_APP_SERVER_HOST + `/api/events/exit/${id}`, {
        headers: {
          Authorization: localStorage.getItem('Authorization'),
          RefreshToken: localStorage.getItem('RefreshToken'),
        }
      }).then((response) => {
        console.log(response)
        if (response.data.success) {
          navigate("/")
        } else {
          alert(response.data.data);
          setChk(!chk);
        }
      })
    } else {
      setChk(!chk);
    }
  }
  return (
    <>
    <div onClick={()=>{navigate("/")}}>
        <p><ArrowBackIosNewRoundedIcon /></p>
      </div>
    <div style={{marginLeft:"1%"}}>
        <p>{head}</p>
      </div>
      <div onClick={()=>{setChk(!chk);}} style={{marginLeft:"auto", marginRight:"2%"}}>
      <p><MoreVertIcon/></p>
    </div>
    {chk ?
        <div style={{
          width: "150px",
          position: "absolute",
          backgroundColor: "white",
          top: "50px", right: "20px",
          textAlign: "center",
          borderRadius: "5px",
          border: "1px solid black"
        }}>
          <div style={{ borderBottom: "1px solid black", padding: "3px", cursor: "pointer" }}
            onClick={() => {  }}>약속 수정</div>
          <div style={{ borderBottom: "1px solid black", padding: "3px", cursor: "pointer" }}
            onClick={() => {exitPromist()}}>약속 나가기</div>
          <div style={{ padding: "3px", cursor: "pointer" }}
            onClick={() => { setChk(!chk); }}>취소</div>
        </div>
        : null
      }
    </>
  )
}

export default Option3;
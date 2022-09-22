import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import { useNavigate } from 'react-router-dom';

const Option5 = ({ head }) => {
  const navigate = useNavigate();
  return (
    <>
      <div onClick={() => { navigate("/member") }}>
        <p><ArrowBackIosNewRoundedIcon /></p>
      </div>
      <div style={{ marginLeft: "1%" }}>
        <p>{head}</p>
      </div>
      <div onClick={() => {  }} style={{ marginLeft: "auto", marginRight: "2%" }}>
        <p>완료</p>
      </div>
    </>
  )
}

export default Option5;
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import { useNavigate } from 'react-router-dom';

const Option2 = ({ head }) => {
  const navigate = useNavigate();
  return (
    <>
      <div onClick={() => { navigate("/") }}>
        <p><ArrowBackIosNewRoundedIcon /></p>
      </div>
      <div style={{ marginLeft: "1%" }}>
        <p>{head}</p>
      </div>
      <div onClick={() => { navigate("/detailpromise") }} style={{ marginLeft: "auto", marginRight: "2%" }}>
        <p>완료</p>
      </div>
    </>
  )
}

export default Option2;
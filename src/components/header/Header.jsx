import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import { useNavigate } from 'react-router-dom';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Option0 from './Option0';
import Option from './Option';
import Option1 from './Option1';
import Option2 from './Option2';
import Option3 from './Option3';


const Header = ({ head, option, payload, chk }) => {
  const navigate = useNavigate();

  return (
    <div style={{ display: "flex", borderBottom: "1px solid #e0e0e0" }}>
      {/* 제목만 */}
      {!option?
      <Option head={head}/>
      :null}
      
      {/* 뒤로가기 제목 */}
      {option===0?
      <Option0 head={head}/>
      :null}

      {/* 프로필 변경 뒤로가기(프로필상세) 제목 완료 */}
      {option===1?
      <Option1 head={head} payload={payload} chk={chk}/>
      :null}

        {/* 약속생성 뒤로가기(홈) 제목 완료 */}
       {option===2?
      <Option2 head={head}/>
      :null}
      
      {/* 약속상세보기 뒤로가기(홈) 제목 메뉴 */}
      {option===3?
      <Option3 head={head}/>
      :null}

    </div>
  )
}

export default Header;


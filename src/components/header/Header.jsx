import Option from './Option';
import Option0 from './Option0';
import Option1 from './Option1';
import Option2 from './Option2';
import Option3 from './Option3';
import Option4 from './Option4';
import Option5 from './Option5';
import Option6 from './Option6';



const Header = ({ head, option, payload, chk}) => {
  
  return (
    <div style={{ display: "flex", borderBottom: "1px solid #e0e0e0" }}>
      {/* 제목만 */}
      {!option&&option!==0?
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
      
      {/* 친구목록 제목 친구추가 */}
      {option===4?
      <Option4 head={head}/>
      :null}

       {/* 친구추가 뒤로가기(친구) 제목 완료 */}
       {option===5?
      <Option5 head={head}/>
      :null}
      
      {/* 로그아웃 */}
      {option===6?
      <Option6 head={head}/>
      :null}


    </div>
  )
}

export default Header;


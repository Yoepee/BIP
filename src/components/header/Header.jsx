import Option from './Option';
import Option0 from './Option0';
import Option1 from './Option1';
import Option2 from './Option2';
import Option3 from './Option3';
import Option4 from './Option4';
import Option5 from './Option5';
import Option6 from './Option6';
import Option7 from './Option7';
import Option8 from './Option8';
import Option9 from './Option9';

// 헤더 옵션에 따른 차등 헤더 부여
// head - 헤더 제목
// option - 헤더 아이콘 및 기능별 옵션 번호 (번호는 하단 참조)
// payload - 입력값이 필요한 헤더에 보내지는 함수 매개값
// chk - 프로필 수정시 중복체크 여부 검사 값
// image - 프로필 수정시 보내지는 image값
// type, setType - 헤더에서 기능을 나누는 변수값
// onChangeHandle - 헤더에서 입력창 수정구문이 생길 때 사용하는 변수 값
const Header = ({ head, option, payload, chk, image, setType, type, onChangeHandle}) => {
  
  return (
    <div style={{ display: "flex", margin:"0 auto", width:"90%" }}>
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
      <Option1 head={head} payload={payload} chk={chk} image={image}/>
      :null}

        {/* 약속생성 뒤로가기(홈) 제목 완료 */}
       {option===2?
      <Option2 head={head} payload={payload}/>
      :null}
      
      {/* 약속상세보기 뒤로가기(홈) 제목 메뉴(방장-방장위임, 멤버 조정, 방장x- 약속나가기, 취소) */}
      {option===3?
      <Option3 head={head}/>
      :null}
      
      {/* 친구목록 제목 검색 친구추가 메뉴(친구수정(별칭), 친구삭제)) */}
      {option===4?
      <Option4 head={head} setType={setType} type={type}/>
      :null}

       {/* 친구추가 뒤로가기(친구) 제목 완료 */}
       {option===5?
      <Option5 head={head} payload={payload} onChangeHandle={onChangeHandle}/>
      :null}
      
      {/* 로그아웃 */}
      {option===6?
      <Option6 head={head}/>
      :null}
      
      {/* 친구검색 */}
      {option===7?
      <Option7 setType={setType}/>
      :null}

      {/* 재능기부생성 뒤로가기(홈) 제목 완료 */}
      {option===8?
      <Option8 head={head} payload={payload}/>
      :null}

      {/* 재능기부생성 뒤로가기(홈) 제목 완료 */}
      {option===9?
      <Option9 head={head}/>
      :null}

    </div>
  )
}

export default Header;


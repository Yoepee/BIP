import ProEdit from "./ProEdit";

// 프로필 수정 사진 외 (닉네임, 휴대폰번호, 이메일) 수정 시 연결 컴포넌트
// set = 입력값 담는 변수
// onChangeHandler 입력값 수정하는 함수 (input용)
// setChk 중복여부 확인하여 결과값 저장 함수
const ProEditText = ({set, onChangeHandler, setChk}) => {
    return (
        <div>
            <ProEdit set={set} onChangeHandler={onChangeHandler} setChk={setChk}/>
        </div>
    )
}

export default ProEditText;
import CheckNickname from "../../components/signup/CheckNickname";

//  닉네임 설정이 안된 계정 닉네임 설정 페이지
const SignUpNickname = ({__isSSE}) => {
  return (
    <>
    <CheckNickname __isSSE={__isSSE}/>
    </>
  )
};

export default SignUpNickname;
import CheckPhone from "../../components/signup/CheckPhone";

// 회원가입 (휴대폰 번호 가입)
const SignUp = ({__isSSE}) => {
  return (
    <>
    <CheckPhone __isSSE={__isSSE}/>
    </>
  );
};

export default SignUp;
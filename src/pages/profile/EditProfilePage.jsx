import { useState, useEffect } from "react";
import { useParams } from "react-router-dom"
import ProEditPicture from "../../components/editprofile/ProEditPicture"
import ProEditText from "../../components/editprofile/ProEditText"
import Header from "../../components/header/Header";
import axios from "axios";
import WebHeader from "../../components/header/WebHeader";


// 프로필 수정 페이지
const EditProfilePage = () => {
    const {type} = useParams();
    // 수정 받을 수 있는 값
    // 닉네임 : value
    // 휴대폰 번호 : phonenumber, authCode
    // 이메일 : email, authCode
    const initialState = {
        value:"",
        email:"",
        phonenumber:"",
        authCode:""
    }
    // 초기값 지정
    const [set, setSet] = useState(initialState);
    // 값이 제대로 들어갔는지 확인하는 용도 (중복 및 유효성검사 걸리는지 여부 체크)
    const [chk, setChk] = useState(false);
    // 이미지 변경 전용 변수
    const [img, setImg] = useState({imgUrl:""});
    
    const onChangeHandler = (e) => {
        const {name, value} = e.target;
        setSet({...set, [name]: value})
      }
    

    return (
        <div>
            <WebHeader />
            {/* 헤더 옵션 1 */}
            <Header head={"프로필 수정"} option={1} payload={set} chk={chk} image={img} />
            <div>
                {/* 이미지 변경이 아니면 editText 로 연결 */}
                {type==="picture"?
                <ProEditPicture setImg={setImg} img={img} />
                :<ProEditText set={set} onChangeHandler={onChangeHandler} setChk={setChk} />
                }
            </div>
        </div>
    )
}

export default EditProfilePage
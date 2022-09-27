import { useState, useEffect } from "react";
import { useParams } from "react-router-dom"
import ProEditPicture from "../../components/editprofile/ProEditPicture"
import ProEditText from "../../components/editprofile/ProEditText"
import Header from "../../components/header/Header";
import axios from "axios";

const EditProfilePage = () => {
    const {type} = useParams();
    const initialState = {
        value:"",
        email:"",
        phonenumber:"",
        authCode:""
    }
    const [set, setSet] = useState(initialState);
    const [chk, setChk] = useState(false);
    const [img, setImg] = useState({imgUrl:""});
    
    const onChangeHandler = (e) => {
        const {name, value} = e.target;
        setSet({...set, [name]: value})
      }
    

    return (
        <div>
            <Header head={"프로필 수정"} option={1} payload={set} chk={chk} image={img} />
            <div>
                {type==="picture"?
                <ProEditPicture setImg={setImg} img={img} />
                :<ProEditText set={set} onChangeHandler={onChangeHandler} setChk={setChk} />
                }
            </div>
        </div>
    )
}

export default EditProfilePage
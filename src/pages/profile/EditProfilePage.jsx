import { useState, useEffect } from "react";
import { useParams } from "react-router-dom"
import ProEditPicture from "../../components/editprofile/ProEditPicture"
import ProEditText from "../../components/editprofile/ProEditText"
import Header from "../../components/header/Header";
import axios from "axios";

const EditProfilePage = () => {
    const {type} = useParams();
    const [value, setValue] = useState({value:""});
    const [chk, setChk] = useState(false);
    const [img, setImg] = useState({imgUrl:""});

    console.log(value)
    console.log(img)
    
    const onChangeHandler = (e) => {
        const { value } = e.target;
        setValue({ value: e.target.value })
      }
    

    return (
        <div>
            <Header head={"프로필 수정"} option={1} payload={value} chk={chk} image={img} />
            <div>
                {type==="picture"?
                <ProEditPicture setImg={setImg} />
                :<ProEditText value={value} onChangeHandler={onChangeHandler} setChk={setChk} />
                }
            </div>
        </div>
    )
}

export default EditProfilePage
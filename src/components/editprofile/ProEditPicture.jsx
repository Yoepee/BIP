import base from "../../img/baseProfile.jpg"
import styled from "styled-components";
import { useRef, useState } from "react";
import axios from "axios"
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import { useNavigate } from "react-router-dom";

const ProEditPicture = () => {
    const navigate = useNavigate();
    const [post, setPost] = useState();
    const photo = useRef();

    let a;
    const onChange = async (e) => {
        // input file에서 선택된 file을 img로 지정
        const img = e.target.files;
        // 이미지 파일이 아니면 이후 동작을 생략하고 경고문구 출력
        // if (!img?.name.match(fileForm)) {
        //   alert("이미지파일(.jpg, .png, .bmp)만 올려주세요.");
        //   return;
        // }
        // 폼데이터 형식 선언
        const formData = new FormData();
        // api에서 요구하는 key값과 value값 지정 (key : "image", value: 이미지파일)
        // formData.append("image", img);
        // 이미지만 보내면되기때문에 더이상 append하지않고 이미지파일 전송

        for (let i = 0; i < img.length; i++) {
            formData.append("image", img[i]); // 반복문을 활용하여 파일들을 formData 객체에 추가한다
            a = await axios.post(process.env.REACT_APP_DANG_GEUN + "/api/post/image", formData, {
                headers: {
                    Authorization: localStorage.getItem("Authorization"),
                    RefreshToken: localStorage.getItem("RefreshToken"),
                    "Content-Type": "multipart/form-data",
                },
            });
        }

        // setPost({ ...post, imageUrl: a.data?.data });
        // 사진을 선택하고 사진선택기능 숨기기
        // 폼데이터 들어가는 형식을 보기위한 내용
        // for (var pair of formData.entries()) {
        //   console.log(pair[0] + ", " + pair[1]);
        // }

    }
    return (
        <div>
        <div style={{ backgroundColor: "gray", width:"100%" }}>
            <div style={{backgroundColor:"red", textAlign:"center"}}>
                <img src={base}/>
                <Camera
                onClick={()=>{photo.current.click()}}>
                    <CameraAltIcon/>
                </Camera>
            </div>
            <input  ref={photo}
                        hidden
                        multiple
                        accept="image/*" type="file" onChange={onChange} />
        </div>
        <div>
            <button onClick={()=>{
                navigate("/detailprofile");
            }}>프로필 업로드</button>
        </div>
        </div>
    )
}

export default ProEditPicture;

const Camera = styled.div`
background:white;
cursor:pointer;
border-radius:50%;
width:fit-content;
padding:5px;
justify-content:center;
position:fixed
`
import styled from "styled-components";
import axios from "axios"
import CameraAltIcon from '@mui/icons-material/CameraAlt';

// 프로필 사진 수정 컴포넌트
// setImg, img 이미지 url을 담는 값
const ProEditPicture = ({ setImg, img }) => {
  const __isToken = async () => {
    await axios.get(process.env.REACT_APP_SERVER_HOST + `/api/member/reissue`, {
      headers: {
        Authorization: localStorage.getItem('Authorization'),
        RefreshToken: localStorage.getItem('RefreshToken'),
      }
    }
    ).then((res) => {
      if (res.data.success) {
        localStorage.setItem("Authorization", res.headers.authorization);
        localStorage.setItem("RefreshToken", res.headers.refreshtoken);
      }
    })
  }
  const onChange = async (e) => {
    // input file에서 선택된 file을 img로 지정
    const image = e.target.files[0];
    // 이미지 파일이 아니면 이후 동작을 생략하고 경고문구 출력
    // if (!img?.name.match(fileForm)) {
    //   alert("이미지파일(.jpg, .png, .bmp)만 올려주세요.");
    //   return;
    // }
    // 폼데이터 형식 선언
    const formData = new FormData();

    //폼데이터 값 (key : file, value : img)  
    // api에서 요구하는 key값과 value값 지정 (key : "image", value: 이미지파일)
    formData.append("file", image); // 반복문을 활용하여 파일들을 formData 객체에 추가한다
    // 이미지만 보내면되기때문에 더이상 append하지않고 이미지파일 전송

    __isToken().then(async () => {
      // form데이터를 보내주면 이미지가 저장되는 url경로를 불러주는 api
      await axios.post(process.env.REACT_APP_SERVER_HOST + "/api/image", formData, {
        headers: {
          Authorization: localStorage.getItem("Authorization"),
          RefreshToken: localStorage.getItem("RefreshToken"),
          "Content-Type": "multipart/form-data",
        },
      }).then(
        // url호출 성공시 img값에 url값 저장
        (res) => { setImg({ imgUrl: res.data.data }) }
      )

      // // 폼데이터 들어가는 형식을 보기위한 내용
      // for (var pair of formData.entries()) {
      //   console.log(pair[0] + ", " + pair[1]);
      // }
    })
  }
  return (
    <div>
      <div style={{ width: "100%" }}>
        <ImgArea>
          {/* 사진 미리보기 (수정 필요) */}
          {img.imgUrl === "" ?
            <img src={process.env.PUBLIC_URL + `/assets/user_svg.svg`} />
            : <img src={img.imgUrl} />
          }
          <label className="input_file_button" htmlFor="input_file"><CameraAltIcon fontSize="large" /></label>
          <input type="file" id="input_file" onChange={onChange} accept="image/jpg,/impge/png,image/jpeg" style={{ display: "none" }} />
        </ImgArea>
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

const ImgArea = styled.div`
  margin: 0 auto;
  margin-top: 5%;
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background-color: #26a69a;
  img{
    margin: 45px 30px;
    width: 70%;
    height: 50%;
    
  }
  .input_file_button{
  display: flex;
  justify-content: center;
  width: 1%;
  margin: -40px 0 0 135px;
  box-shadow: rgb(0 0 0 / 10%) 0 1px 20px 0px;
  padding: 6px 25px;
  border-radius: 50%;
  background-color: #fff;
  color:black;
  
  cursor: pointer;
  
  
}
  
 
`;
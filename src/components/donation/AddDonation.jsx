import { useState } from "react";
import KaKaoMap from "../map/KakaoMap";
import DaumPostcode from 'react-daum-postcode';
import axios from "axios";

const AddDonation = ({ donate, setDonate, onChangeHandler }) => {
  const { naver } = window;
  let a;
  // 게시판 종류
  const [post, setPost] = useState("재능기부");
  const [chkPost, setChkPost] = useState(false);
  // 카테고리 종류
  const [category, setCategory] = useState("봉사");
  const [chkCategory, setChkCategory] = useState(false);
  // 주소 검색 후 나온 결과 주소값 지정
  const [roadAddress, setRoadAddress] = useState(null);
  // 위도 경도 변경되는 값을 받을 수 있도록 상태 관리.
  const [lat, setLat] = useState(37.5656);
  const [lng, setLng] = useState(126.9769);
  // 주소검색 출력 여부 확인값
  const [openAddr, setOpenAddr] = useState(false)
  // 주소 값을 통해 좌표를 찾는 함수
  const searchAddressToCoordinate = (address) => {
    // 네이버 geocode 사용 (index.html에 자바스크립트 선언)
    naver.maps.Service.geocode(
      {
        query: address,
      },
      (status, response) => {
        if (status !== naver.maps.Service.Status.OK)
          return alert("Something wrong!");

        // 결과값 = response.v2.addresses에 나오는 걸 나눠서 작성된 내용
        let result = response.v2;
        let items = result.addresses;

        // 경도, 위도 값
        let x = parseFloat(items[0].x);
        let y = parseFloat(items[0].y);

        setLat(y);
        setLng(x);
        // 주소값 지정
        setRoadAddress(items[0].roadAddress);
        // 좌표값을 약속 생성 변수 값으로 입력
        setDonate({ ...donate, address: items[0].roadAddress, coordinate: (String(y) + "," + String(x)) }) 
      }
    )
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

    // form데이터를 보내주면 이미지가 저장되는 url경로를 불러주는 api
    a = await axios.post(process.env.REACT_APP_SERVER_HOST + "/api/image", formData, {
        headers: {
            Authorization: localStorage.getItem("Authorization"),
            RefreshToken: localStorage.getItem("RefreshToken"),
            "Content-Type": "multipart/form-data",
        },
    }).then(
      // url호출 성공시 img값에 url값 저장
      (res)=>{setDonate({ ...donate, imgUrl: res.data.data })}
      )
      
    // 폼데이터 들어가는 형식을 보기위한 내용
    for (var pair of formData.entries()) {
      console.log(pair[0] + ", " + pair[1]);
    }
}
  console.log(donate)
  return (
    <div>
      {openAddr ?
        <div style={{ position: "relative", background: "gray", justifyContent: "center" }}>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <div style={{ backgroundColor: "black", color: "white" }}
              onClick={() => { setOpenAddr(false) }}>닫기</div>
          </div>
          <div>
            <DaumPostcode
              autoClose={false}
              onComplete={(data) => { searchAddressToCoordinate(data.address); setOpenAddr(false) }} />
          </div>
        </div>
        : null}
      <div>
        {!chkPost ?
          <p onClick={() => { setChkPost(!chkPost) }}>{post}▼</p>
          : <p onClick={() => { setChkPost(!chkPost) }}>{post}▲</p>
        }
        {chkPost ?
          <>
            <div onClick={() => { setChkPost(!chkPost); setPost("재능기부"); setDonate({ ...donate, board: "request" }) }}>재능기부</div>
            <div onClick={() => { setChkPost(!chkPost); setPost("재능요청"); setDonate({ ...donate, board: "donation" }) }}>재능요청</div>
          </>
          : null}
      </div>
      <div>
      {!chkCategory ?
          <p onClick={() => { setChkCategory(!chkCategory) }}>{category}▼</p>
          : <p onClick={() => { setChkCategory(!chkCategory) }}>{category}▲</p>
        }
        {chkCategory ?
          <>
            <div onClick={() => { setChkCategory(!chkCategory); setCategory("봉사"); setDonate({ ...donate, category: "volunteer" }) }}>봉사</div>
            <div onClick={() => { setChkCategory(!chkCategory); setCategory("돌봄"); setDonate({ ...donate, category: "care" }) }}>돌봄</div>
            <div onClick={() => { setChkCategory(!chkCategory); setCategory("교육"); setDonate({ ...donate, category: "edu" }) }}>교육</div>
            <div onClick={() => { setChkCategory(!chkCategory); setCategory("나눔"); setDonate({ ...donate, category: "share" }) }}>나눔</div>
            <div onClick={() => { setChkCategory(!chkCategory); setCategory("문화/예술"); setDonate({ ...donate, category: "cultureart" }) }}>문화/예술</div>
            <div onClick={() => { setChkCategory(!chkCategory); setCategory("모임/구인"); setDonate({ ...donate, category: "people" }) }}>모임/구인</div>
            <div onClick={() => { setChkCategory(!chkCategory); setCategory("기타"); setDonate({ ...donate, category: "etc" }) }}>기타</div>
          </>
          : null}
      </div>
      <div>
        제목
        <input placeholder="제목" name="title" value={donate.title} onChange={(e) => { onChangeHandler(e) }} />
      </div>
      <div>내용
        <input placeholder="제목" name="content" value={donate.content} onChange={(e) => { onChangeHandler(e) }} />
      </div>
      <div>사진
      <input type="file" id="input_file" onChange={onChange} accept="image/jpg,/impge/png,image/jpeg"/>
      </div>
      <div>장소</div>
      {openAddr ? null :
        roadAddress === null ?
          <div style={{ color: "#D9D9D9" }}
            onClick={() => { setOpenAddr(!openAddr) }}>주소검색</div>
          : <div onClick={() => { setOpenAddr(!openAddr) }}>{roadAddress}</div>
      }
      <KaKaoMap lat={lat} lng={lng} width={"400px"} height={"400px"} />
    </div>
  )
}
export default AddDonation;
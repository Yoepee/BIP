import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import Header from "../../components/header/Header";
import AddPromise from "../../components/main/list/AddPromise";
import { __getDetailPromise } from "../../redux/modules/detailPromise";
import dayjs from "dayjs";
import axios from "axios";
import WebHeader from "../../components/header/WebHeader";

// 약속 추가
const AddPromisePage = () => {
  // 서버에 약속 추가하는 내용 initialState값 request api명세서 참조
  const initialState = {
    title: "",
    eventDateTime: "",
    place: "",
    content: "",
    point: "0",
    coordinate: ""
  }
  // 시간값 형식에 맞춰 넣기위한 초기값
  const initialState2 = {
    hour: "",
    min: ""
  }
  // 생성, 수정 구분하기 위한 인자
  const { id } = useParams();
  const dispatch = useDispatch();

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

  // 수정하기 일 때 상세보기 정보 받아와서 초기값으로 지정
  useEffect(() => {
    // id값이 존재하면 수정하기로 동작
    if (id !== undefined) {
      // 해당 게시글 번호에 맞는 데이터 값 불러오기
      __isToken().then(() => {
        dispatch(__getDetailPromise(id))
          .then((response) => {
            setPromise({
              ...initialState,
              title: response.payload.data.title,
              place: response.payload.data.place,
              content: response.payload.data.content,
              // 받아오는 시간 값 split으로 나누어서 연도, 달, 일 맞춰서 날짜 데이터값으로 변경)
              eventDateTime: dayjs(new Date(response.payload.data.eventDateTime.split("-")[0], Number(response.payload.data.eventDateTime.split("-")[1]) - 1, response.payload.data.eventDateTime.split("-")[2])).format(`YYYY-MM-DD-${response.payload.data.eventDateTime.split("-")[3]}-${response.payload.data.eventDateTime.split("-")[4]}-00`),
              point: response.payload.data.point
            });
            if(Number(response.payload.data.eventDateTime.split("-")[3])>12){
              setTime({ ...initialState2, hour: Number(response.payload.data.eventDateTime.split("-")[3])-12, min: response.payload.data.eventDateTime.split("-")[4] });
            }else{
              setTime({ ...initialState2, hour: Number(response.payload.data.eventDateTime.split("-")[3]), min: response.payload.data.eventDateTime.split("-")[4] });
            }
            // 시간값을 확인하여 오전 오후 식별
            if (Number(response.payload.data.eventDateTime.split("-")[3]) > 12) {
              setAm(false);
            }
          });
      });
      // id값이 없으면 생성하기로 동작 초기값 : 공백
    } else {
      setPromise(initialState);
    }
  }, [dispatch])

  // 약속 생성 초기값
  const [promise, setPromise] = useState(initialState);
  // 시간 지정 초기값
  const [time, setTime] = useState(initialState2);
  // 오전 오후 초기값
  const [am, setAm] = useState(true);

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setPromise({ ...promise, [name]: value })
  }

  // 시간 수정 별도 작성
  const onChange = (e) => {
    const { name, value } = e.target;
    // 숫자 외 동작 x
    setTime({ ...time, [name]: value.replace(/[^0-9]/g, "") })
  }
  // 60분 이상의 시간 입력 제한(강제 할당)
  if (Number(time.min) > 59) {
    setTime({ ...time, min: 59 })
  }
  // 12시 이후의 시간 입력 제한(강제 할당)
  if (Number(time.hour) > 12) {
    setTime({ ...time, hour: 12 })
    // 시간 최소 값 1로 제한, 입력 강제 할당 
  } else if (Number(time.hour) < 1 && time.hour !== "") {
    setTime({ ...time, hour: 1 })
  }

  return (
    <>
      <WebHeader />
      {/* 헤더 옵션 2 */}
      <Header head={"약속하기"} option={2} payload={promise} />
      {/* 약속 생성 수정할 수 있는 값 전달 */}
      <AddPromise promise={promise} setPromise={setPromise} onChangeHandler={onChangeHandler} onChange={onChange} time={time} am={am} setAm={setAm} />
    </>
  )
}

export default AddPromisePage;
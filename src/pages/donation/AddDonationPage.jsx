import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import AddDonation from "../../components/donation/AddDonation";
import Header from "../../components/header/Header";
import { __getDetailDonation } from "../../redux/modules/detailDonation";

// 재능기부 수정 삭제 페이지
const AddDonationPage = () =>{
  const {id} = useParams();
  const dispatch = useDispatch();
  const initialState = {
    board : "request",
    category:"volunteer",
    content : "",
    imgUrlList:[],
    address:"",
    coordinate:"",
    point:0
  }
  const [donate,setDonate] = useState(initialState);

  const onChangeHandler = (e) => {
    const {name, value} = e.target;
    if(name==="point"){
      setDonate({...donate, [name]: value.replace(/[^0-9]/g, "")})
    }else{
      setDonate({...donate, [name]: value})
    }
  }

  // 수정하기 일 때 상세보기 정보 받아와서 초기값으로 지정
  useEffect(()=>{
    // id값이 존재하면 수정하기로 동작
    if(id!==undefined){
      // 해당 게시글 번호에 맞는 데이터 값 불러오기
      dispatch(__getDetailDonation(id))
      .then((response)=>{
        console.log(response)
        setDonate({...initialState, 
          board : response.payload.data.board,
          category : response.payload.data.category,
          content : response.payload.data.content,
          imgUrlList: response.payload.data.imgUrlList,
          address : response.payload.data.address,
          coordinate : response.payload.data.coordinate,
          point : response.payload.data.point,
          imgUrlList : response.payload.data.imgUrlList
        })
    });
    // id값이 없으면 생성하기로 동작 초기값 : 공백
    }else{
      setDonate(initialState);
    }
  },[dispatch]);

  console.log(donate)
  return (
    <>
      <Header head={"기부 추가"} option={8} payload={donate}/>
      
      <AddDonation donate={donate} setDonate={setDonate} onChangeHandler={onChangeHandler} />
    </>
  )
}

export default AddDonationPage;
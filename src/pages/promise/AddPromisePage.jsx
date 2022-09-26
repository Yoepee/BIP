import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Header from "../../components/header/Header";
import AddPromise from "../../components/main/list/AddPromise";
import { __getDetailPromise } from "../../redux/modules/detailPromise";
import dayjs from "dayjs";

const AddPromisePage = () =>{
  const initialState = {
    title: "",
    eventDateTime: "",
    place: "",
    content: "",
    point: "0"
  }
  const initialState2 = {
    hour:"",
    min:""
  }
  const {id} = useParams();
  const dispatch = useDispatch();
  const detailPromise = useSelector((state)=>state.detailPromise);


  useEffect(()=>{
    if(id!==undefined){
      dispatch(__getDetailPromise(id))
      .then((response)=>{
        setPromise({...initialState,
        title:response.payload.data.title,
        place:response.payload.data.place,
        content:response.payload.data.content,
        eventDateTime:dayjs(new Date(response.payload.data.eventDateTime.split("-")[0], Number(response.payload.data.eventDateTime.split("-")[1])-1, response.payload.data.eventDateTime.split("-")[2])).format(`YYYY-MM-DD-${response.payload.data.eventDateTime.split("-")[3]}-${response.payload.data.eventDateTime.split("-")[4]}-00`),
        point:response.payload.data.point});
        setTime({...initialState2, hour:response.payload.data.eventDateTime.split("-")[3], min:response.payload.data.eventDateTime.split("-")[4]});
        if(Number(response.payload.data.eventDateTime.split("-")[3])>12){
          setAm(false);
        }
    });
    }else{
      setPromise(initialState);
    }
  },[dispatch])

  const [promise, setPromise] = useState(initialState);
  const [time,setTime] = useState(initialState2);
  const [am, setAm] = useState(true);

  const onChangeHandler = (e) => {
    const {name, value} = e.target;
    setPromise({...promise, [name]: value})
  }

  const onChange = (e) => {
    const {name, value} = e.target;
    setTime({...time, [name]: value.replace(/[^0-9]/g, "")})
  }
  if(Number(time.min)>59){
    setTime({...time, min: 59})
  }
  if(Number(time.hour)>12){
    setTime({...time, hour: 12})
  }else if(Number(time.hour)<1 && time.hour!==""){
    setTime({...time, hour: 1})
  }

  return (
    <>
      <Header head={"약속하기"} option={2} payload={promise}/>
      <AddPromise promise={promise} setPromise={setPromise} onChangeHandler={onChangeHandler} onChange={onChange} time={time} am={am} setAm={setAm}/>
    </>
  )
}

export default AddPromisePage;
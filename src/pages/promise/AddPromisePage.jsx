import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Header from "../../components/header/Header";
import AddPromise from "../../components/main/list/AddPromise";
import { __getDetailPromise } from "../../redux/modules/detailPromise";

const AddPromisePage = () =>{
  const initialState = {
    title: "",
    eventDateTime: "",
    place: "",
    content: "",
    point: "0"
  }
  const {id} = useParams();
  const dispatch = useDispatch();
  const detailPromise = useSelector((state)=>state.detailPromise);


  useEffect(()=>{
    if(id!==undefined){
      dispatch(__getDetailPromise(id))
      .then((response)=>{
        console.log(response)
        setPromise({...initialState,
        title:response.payload.data.title,
        place:response.payload.data.place,
        content:response.payload.data.content});
    });
    }else{
      setPromise(initialState);
    }
  },[dispatch])

  const [promise, setPromise] = useState(initialState);

  const onChangeHandler = (e) => {
    const {name, value} = e.target;
    setPromise({...promise, [name]: value})
  }

  return (
    <>
      <Header head={"약속하기"} option={2} payload={promise}/>
      <AddPromise promise={promise} setPromise={setPromise} onChangeHandler={onChangeHandler} />
    </>
  )
}

export default AddPromisePage;
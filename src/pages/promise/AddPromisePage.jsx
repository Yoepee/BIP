import { useState } from "react";
import Header from "../../components/header/Header";
import AddPromise from "../../components/main/list/AddPromise";

const AddPromisePage = () =>{
  const initialState = {
    title: "",
    eventDateTime: "",
    place: "",
    content: "",
    point: "0"
  }

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
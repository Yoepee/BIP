import Header from "../../components/header/Header";
import AddPromise from "../../components/main/list/AddPromise";

const AddPromisePage = () =>{
  return (
    <>
      <Header head={"약속하기"} option={2}/>
      <AddPromise/>
    </>
  )
}

export default AddPromisePage;